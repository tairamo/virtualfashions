// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import './Ownable.sol';
import './NiftyToken.sol';

contract AuctionManager is Ownable {
    
    using Counters for Counters.Counter;
    using SafeMath for uint;

    // events
    event BidPlaced(address _by, uint _amount, uint _itemId, uint _tokenId, uint _totalBidAmount);
    event ItemListed(uint indexed _listId, uint indexed _itemId, uint indexed _tokenId, uint _biddingEndTimestamp,  address _by);
    event Withdrawal(address indexed _by, address indexed _to, uint _amount, uint indexed _listId, uint _itemId, uint _tokenId, uint _totalBidAmountNow);
    event TokenTransfered(address indexed _from, address indexed _to, uint indexed _listId, uint _itemId, uint _tokenId);
    event MoneyTransfered(address indexed _to, uint indexed _amount, uint _commission, uint indexed _listId, uint _itemId, uint _tokenId);
    event CommissionTransfered(address indexed _to, uint indexed _amount, address indexed _by);
    event RemainingAmountTransfered(address indexed _to, uint indexed _amount, uint indexed _listId, uint _itemId, uint _tokenId);

    // Commission
    uint commission;
    uint commissionRate;

    // NiftyToken
    address niftyTokenContractAddress;

    // Item
    Counters.Counter private itemCounter;
    struct Item {
        uint id;
        uint tokenId;
        uint biddingEndTimestamp;
        address owner;
        uint highestBid;
        address highestBidder;
        bool settled;
    }    
    struct Bid {
        uint amount;
        address by;
    }
    mapping(uint => mapping(address => Bid[])) itemBidList;
    mapping(uint => mapping(address => uint)) itemTotalBidAmountList;

    // Item List
    Counters.Counter private listCounter;
    mapping(uint => Item) public itemList;
    
    // Pausable
    bool private paused;

    constructor(address _niftyTokenContractAddress, uint _commissionRate) {
        // Checks
        validateCommissionRate(_commissionRate);
    
        niftyTokenContractAddress = _niftyTokenContractAddress;
        commissionRate = _commissionRate;
        paused = false;
    }

    // Modifiers
    modifier notPaused {
        require(paused == false, 'Contract is paused');
        _;
    }

    // Public
    function listItem(uint _tokenId, uint _biddingEndTimestamp) public notPaused {
        // Checks
        address owner = NiftyToken(niftyTokenContractAddress).ownerOf(_tokenId);
        require(msg.sender == owner, 'You are not token owner');

        // Get ids
        listCounter.increment();
        itemCounter.increment();
        uint listId = listCounter.current();
        uint itemId = itemCounter.current();

        // Store item
        uint _highestBid;
        address _highestBidder;
        Item memory item = Item(itemId, _tokenId, _biddingEndTimestamp, msg.sender, _highestBid, _highestBidder, false);
        itemList[listId] = item;
        
        emit ItemListed(listId, itemId, _tokenId, _biddingEndTimestamp, msg.sender);
    }
    
    function bidItem(uint _listId) public payable notPaused {
        Item storage item = itemList[_listId];
        
        uint _amount = msg.value;

        // Checks
        require(item.id > 0, 'Item not found in auction list');
        require(msg.sender != item.owner, 'Item owner can not make a bid');
        require(block.timestamp <= item.biddingEndTimestamp, 'Bidding period is over');
        require(_amount > item.highestBid, 'Bid amount must be higher than last bid');

        // Store bid
        Bid memory bid = Bid(_amount, msg.sender);
        itemBidList[item.id][msg.sender].push(bid);
        itemTotalBidAmountList[item.id][msg.sender] += _amount;
        
        // Record highest bid
        item.highestBid = _amount;
        item.highestBidder = msg.sender;
        
        emit BidPlaced(msg.sender, _amount, item.id, item.tokenId, itemTotalBidAmountList[item.id][msg.sender]);
    }
    
    function lastBidAmount(uint _listId, address _by) public view returns(uint) {
        Item memory item = itemList[_listId];

        // Checks
        require(item.id > 0, 'Item not found in auction list');
        
        uint totalBids = itemBidList[item.id][_by].length;
        if (totalBids <= 0) return 0;

        uint lastBidIndex = totalBids - 1;
        return itemBidList[item.id][_by][lastBidIndex].amount;
    }

    function totalBidAmount(uint _listId, address _by) public view returns(uint) {
        Item memory item = itemList[_listId];

        // Checks
        require(item.id > 0, 'Item not found in auction list');
        
        return itemTotalBidAmountList[item.id][_by];
    }
    
    function highestBid(uint _listId) public view returns(uint) {
        Item memory item = itemList[_listId];

        // Checks
        require(item.id > 0, 'Item not found in auction list');
        
        return item.highestBid;
    }
    
    function highestBidder(uint _listId) public view returns(address) {
        Item memory item = itemList[_listId];

        // Checks
        require(item.id > 0, 'Item not found in auction list');
        
        return item.highestBidder;
    }

    function withdraw(uint _listId) public notPaused {
        Item memory item = itemList[_listId];

        address payable to = payable(msg.sender);

        // Checks
        require(item.id > 0, 'Item not found in auction list');
        require(block.timestamp > item.biddingEndTimestamp, 'Bidding period is not over yet');
        require(to != item.highestBidder, 'Auction winner can not withdraw money');
        
        // Check user valid for withdrawal
        uint totalAmount = itemTotalBidAmountList[item.id][to];
        require(totalAmount > 0, 'You have nothing to withdraw.');
        require(address(this).balance >= totalAmount, 'Contract does not have enough balance');
        
        // Effects
        itemTotalBidAmountList[item.id][to] = 0;

        emit Withdrawal(msg.sender, to, totalAmount, _listId, item.id, item.tokenId, itemTotalBidAmountList[item.id][to]);

        to.transfer(totalAmount);
    }

    function settleAuction(uint _listId) public notPaused {
        Item storage item = itemList[_listId];

        // Checks
        require(item.id > 0, 'Item not found in auction list');
        require(block.timestamp > item.biddingEndTimestamp, 'Bidding period is not over yet');
        require(item.highestBid > 0, 'Highest bid can not be zero');
        require(msg.sender == item.highestBidder || msg.sender == item.owner, 'Caller must be highest bidder or token owner.');
        require(item.settled == false, 'Auction is already settled');
        
        // Checks
        uint totalAmount = itemTotalBidAmountList[item.id][item.highestBidder];
        require(totalAmount > 0, 'Total bid amount is zero');
        
        // Checks
        uint amount = item.highestBid;
        uint totalCommission = calculateCommission(amount, commissionRate);
        amount = amount.sub(totalCommission);
        require(address(this).balance >= totalAmount, 'Contract does not have enough balance');

        // Effects
        commission += totalCommission;
        item.settled = true;
        itemTotalBidAmountList[item.id][item.highestBidder] = 0;

        // Transfer
        address payable itemOwner = payable(item.owner);
        address payable winner = payable(item.highestBidder);

        emit TokenTransfered(item.owner, item.highestBidder, _listId, item.id, item.tokenId);
        emit MoneyTransfered(itemOwner, amount, totalCommission, _listId, item.id, item.tokenId);
        
        uint remainingAmount = totalAmount.sub(item.highestBid);
        if (remainingAmount > 0) {
            emit RemainingAmountTransfered(item.highestBidder, remainingAmount, _listId, item.id, item.tokenId);
            winner.transfer(remainingAmount);
        }
        
        NiftyToken(niftyTokenContractAddress).safeTransferFrom(item.owner, item.highestBidder, item.tokenId);
        itemOwner.transfer(amount);
    }

    function calculateCommission(uint _amount, uint _commissionRate) internal pure returns(uint) {
        // Checks
        require(_commissionRate > 0, 'Commission rate can not be zero');
        
        return _amount.mul(_commissionRate).div(100);
    }

    // Admin
    function getBalance() public view onlyOwner returns(uint) {
        return address(this).balance;
    }

    function getCommission() public view onlyOwner returns(uint) {
        return commission;
    }

    function getCommissionRate() public view onlyOwner returns(uint) {
        return commissionRate;
    }

    function setCommissionRate(uint _commissionRate) public onlyOwner {
        validateCommissionRate(_commissionRate);
        
        commissionRate = _commissionRate;
    }

    function getNiftyTokenContractAddress() public view onlyOwner returns(address) {
        return niftyTokenContractAddress;
    }

    function setNiftyTokenContractAddress(address _niftyTokenContractAddress) public onlyOwner {       
        niftyTokenContractAddress = _niftyTokenContractAddress;
    }
    
    function withdrawCommission() public onlyOwner {
        uint totalCommission = commission;
        address owner = getOwner();
        address payable to = payable(owner);

        // Checks
        require(totalCommission > 0, 'No commission to withdraw');
        require(to != address(0), 'Need a valid payee address');
        require(to != address(this), 'Can not withdraw to contract address');
        require(address(this).balance >= totalCommission, 'Contract does not have enough balance');

        // Effects
        commission = 0;

        emit CommissionTransfered(owner, totalCommission, msg.sender);

        // Transfer
        to.transfer(totalCommission);
    }
    

    // Validators
    function validateCommissionRate(uint _commissionRate) internal pure {
        require(_commissionRate >= 0, 'Invalid commission rate');
        require(_commissionRate <= 100, 'Invalid commission rate');
    }

    function getPaused() public view onlyOwner returns(bool) {
        return paused;
    }
    
    function pause() public onlyOwner {
        paused = true;
    }
    
    function unpause() public onlyOwner {
        paused = false;
    }
}