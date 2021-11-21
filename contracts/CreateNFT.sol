// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721URIStorage, Ownable {
 string domain="http://nguyenbacthang.com";
 constructor(string memory name, string memory symbol) ERC721(name, symbol) {}
 function CreateToken(address to, uint256 tokenId) public onlyOwner returns (address) {
   _mint(to, tokenId);
   _setTokenURI(tokenId, domain);

   return ownerOf(tokenId);
 }
}
