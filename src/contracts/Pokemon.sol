pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Pokemon is ERC721 {
    
    struct Attribute {
        string tokenURI;
        string name;
        uint256 health;
        uint256 retreat;
    }

    uint256 public tokenCounter;

    Attribute[] public attributes;  
    // Ideally store metadata on IPFS
    
    constructor() ERC721 ("Pokemon","POK") public {
        tokenCounter = 0;
    }

    function mint(string memory _tokenURI, string memory _name, uint256 _health, uint256 _retreat) public returns (uint256) {
        uint256 newItemId = tokenCounter;
        //comment
        _safeMint(msg.sender, newItemId);
        Attribute memory attribute = Attribute(_tokenURI, _name, _health, _retreat);
        attributes.push(attribute);
        tokenCounter++;
        return newItemId;
    }
}