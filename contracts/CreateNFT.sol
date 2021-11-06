// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyToken is ERC721 {
 constructor(string memory name, string memory symbol) ERC721(name, symbol) {}
 function CreateToken(address to, uint256 tokenId) public {
    _mint(to, tokenId);
 }
}
