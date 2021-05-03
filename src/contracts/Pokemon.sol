pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Pokemon is ERC721 {
    uint256 public tokenCounter;

    constructor () public ERC721 ("Pokemon","POK") {
        tokenCounter = 0;
    }
    
    function mint(string memory tokenURI) public returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        tokenCounter++;
        return newItemId;
    }
}


