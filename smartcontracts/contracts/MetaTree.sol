// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract TreeNFT {

    string private _name = "TreeNFT";
    string private _symbol = "TREE";
    uint256 private _totalSupply;
    mapping(uint256 => address) private _owners;
    mapping(address => uint256[]) private _ownedTokens;
    mapping(uint256 => uint256) private _ownedTokensIndex;
    mapping(address => uint256) private _balances;
    mapping(uint256 => uint256) private _treeLevels;
    //address public owner;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event LevelUp(address indexed owner, uint256 indexed tokenId, uint256 newLevel);

    modifier onlyOwnerOf(uint256 tokenId) {
        require(_owners[tokenId] == msg.sender, "Not token owner");
        _;
    }

    /*constructor(address operator) {
        owner = operator;
    }*/


    /*modifier onlyOwner(){
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }*/

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address treeOwner) external view returns (uint256) {
        return _balances[treeOwner];
    }

    function ownerOf(uint256 tokenId) external view returns (address) {
        return _owners[tokenId];
    }

    function mint(address to) external {
        _totalSupply++;
        _balances[to]++;
        _owners[_totalSupply] = to;
        _treeLevels[_totalSupply] = 0;
        _ownedTokens[to].push(_totalSupply);
        _ownedTokensIndex[_totalSupply] = _ownedTokens[to].length - 1;
        emit Transfer(address(0), to, _totalSupply);
    }

    function getTreeLevel(uint256 tokenId) external view returns (uint256) {
        return _treeLevels[tokenId];
    }

    function levelUp(uint256 tokenId) external onlyOwnerOf(tokenId) {
        require(_treeLevels[tokenId] < 15, "Tree is already at max level");
        _treeLevels[tokenId]++;
        emit LevelUp(msg.sender, tokenId, _treeLevels[tokenId]);
    }

    function tokensOfOwner(address treeOwner) external view returns (uint256[] memory tokens, uint256[] memory levels) {
    uint256 tokenCount = _balances[treeOwner];
    tokens = new uint256[](tokenCount);
    levels = new uint256[](tokenCount);

    for (uint256 i = 0; i < tokenCount; i++) {
        tokens[i] = _ownedTokens[treeOwner][i];
        levels[i] = _treeLevels[tokens[i]];
    }
    return (tokens, levels);
}

}
