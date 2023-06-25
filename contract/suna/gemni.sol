// SPDX-License-Identifier: a

pragma solidity ^0.8.19;

import "@openzeppelin/contracts@4.9.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.9.2/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.9.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.9.2/utils/Counters.sol";


contract Gemini is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(string => string[]) private _tokenURIsMap;

    uint256 public constant MINT_PRICE = 100000000000000000; // 0.1 Astar

    address payable public deployer;

    event Minted(address to, uint256 tokenId);

    constructor() ERC721("Gemini", "GMN") {
        deployer = payable(msg.sender);
    }

    function setTokenURIs(string memory yearMonthDate, string[] memory tokenURIs) external onlyOwner {
        _tokenURIsMap[yearMonthDate] = tokenURIs;
    }

    function _baseURI() internal pure override(ERC721) returns (string memory) {
        return "";
    }

    function safeMint(address to, string memory yearMonthDate, uint starSignIndex) external payable {
        require(msg.value >= MINT_PRICE, "Insufficient payment for minting");
        
        // Estimate gas required for minting
        uint256 gasStart = gasleft();
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURIsMap[yearMonthDate][starSignIndex]);
        
        // Calculate gas used and send to deployer
        uint256 gasUsed = gasStart - gasleft();
        uint256 gasCost = gasUsed * tx.gasprice;
        deployer.transfer(gasCost);

        // Refund excess payment
        uint256 refund = msg.value - MINT_PRICE;
        if(refund > 0) {
            payable(msg.sender).transfer(refund);
        }

        emit Minted(to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
