// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol"; 
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyToken is ERC721URIStorageUpgradeable, OwnableUpgradeable {
 string domain="http://nguyenbacthang.com";
 function initialize(string memory _name, string memory _symbol) initializer public {
   __ERC721_init(_name, _symbol);
 }

 function CreateToken(address to, uint256 tokenId) public onlyOwner returns (address) {
   _mint(to, tokenId);
   _setTokenURI(tokenId, domain);

   return ownerOf(tokenId);
 }
}
