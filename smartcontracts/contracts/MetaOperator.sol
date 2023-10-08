// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./MetaCert.sol";
import "./MetaTokens.sol";
import "./MetaTree.sol";

contract MetaOperator {
    MetaToken private token;
    TreeNFT private treeNFT;
    CertificateNFT private certNFT;
    address constant public NGOAccount = 0x40d5568Fe100dbC06A5eD91862b85250F54881E2;//MyAccount
    address constant public DAPPAccount = 0xc888636228a82f0F59ABAe53B9850500d0ba1d41;//Tejas Account
    address constant public Carboncredits = 0x3299bb0cE7bed82cd4Dd4098E13268b18C569eB4;//AB Account
    //address public owner;
    
    function canSponsorTransactionFor(address _origin, address _to, bytes calldata _data) public view returns (bool) {
    return true;
    }

    constructor(address tokenAddr, address treeNFTAddr, address certNFTAddr) {
       token = MetaToken(tokenAddr);
       treeNFT = TreeNFT(treeNFTAddr);
       certNFT = CertificateNFT(certNFTAddr);
    }

   /* modifier onlyOwner(){
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }*/

    // Token Functions
    function rewardTokens(address account, uint256 amount) external {
        token.reward_tokens(account, amount);
    }

    function transferTokens(address recipient, uint256 amount) external {
        token.transfer(recipient, amount);
    }

    function disburseTokens(uint256 amount) external {
    require(token.balanceOf(msg.sender) >= amount, "Insufficient balance");

    uint256 ngoAmount = (amount * 40) / 100;  // 40% to NGOAccount
    uint256 senderAmount = (amount * 30) / 100; // 30% to msg.sender
    uint256 dappAmount = (amount * 30) / 100; // 30% to DAPPAccount

    token.transfer(NGOAccount, ngoAmount);
    token.transfer(msg.sender, senderAmount);
    token.transfer(DAPPAccount, dappAmount);
}

    function buyCarbonCredits(uint256 amount) external {
        token.transferFrom(msg.sender, Carboncredits, amount);
    }


    function balanceOfTokens(address account) external view returns (uint256) {
        return token.balanceOf(account);
    }

    function approveTokens(address spender, uint256 amount) external {
        token.approve(spender, amount);
    }

    function transferTokensFrom(address sender, address recipient, uint256 amount) external {
        token.transferFrom(sender, recipient, amount);
    }

    // TreeNFT Functions
    function mintTree(address to) external {
        treeNFT.mint(to);
    }

    function getTreeLevel(uint256 tokenId) external view returns (uint256) {
        return treeNFT.getTreeLevel(tokenId);
    }

    function levelUpTree(uint256 tokenId) external {
        treeNFT.levelUp(tokenId);
    }

    function tokensAndLevelsOfTreeOwner(address treeOwner) external view returns (uint256[] memory, uint256[] memory) {
        return treeNFT.tokensOfOwner(treeOwner);
    }

    // CertificateNFT Functions
    function mintCertificate(address to, uint256 score) external {
        certNFT.mint(to, score);
    }

    function getCertificateScore(uint256 tokenId) external view returns (uint256) {
        return certNFT.getCertificateScore(tokenId);
    }

    function certificatesAndScoresOfCertificateOwner(address certOwner) external view returns (uint256[] memory, uint256[] memory) {
        return certNFT.certificatesOfOwner(certOwner);
    }

    function balanceOfCertificateNFT(address certOwner) external view returns (uint256) {
        return certNFT.balanceOf(certOwner);
    }
}