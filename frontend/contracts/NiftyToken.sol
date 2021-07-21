// contracts/Nifty.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NiftyToken is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Nifty", "ITM") {}

    function mint(string memory tokenURI) public {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}
