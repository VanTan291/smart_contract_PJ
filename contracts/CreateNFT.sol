// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721URIStorage, Ownable {
 string domain="https://gateway.pinata.cloud/ipfs/QmdtKNxKjJyPQveSB2uM3yLsjZvrxfq5tZ19ftEVG7S2Gi";
 constructor(string memory name, string memory symbol) ERC721(name, symbol) {}
 function CreateToken(address to, uint256 tokenId) public onlyOwner {
   _mint(to, tokenId);
   _setTokenURI(tokenId, domain);
 }
}
