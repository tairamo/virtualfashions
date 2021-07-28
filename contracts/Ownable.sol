// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

abstract contract Ownable {
    address private owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    // modifiers
    modifier onlyOwner {
        require(msg.sender == owner, 'You are not contract owner');
        _;
    }
    
    function getOwner() public view virtual returns (address) {
        return owner;
    }
}