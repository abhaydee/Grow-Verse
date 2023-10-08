// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CertificateNFT {
    string private _name = "CertificateNFT";
    string private _symbol = "CERT";
    uint256 private _totalSupply;
    mapping(uint256 => address) private _owners;
    mapping(address => uint256[]) private _ownedCertificates;
    mapping(uint256 => uint256) private _ownedCertificatesIndex;
    mapping(address => uint256) private _balances;
    mapping(uint256 => uint256) private _certificateScores;
    //address public owner;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Certification(address indexed owner, uint256 indexed tokenId, uint256 score);

    modifier onlyOwnerOf(uint256 tokenId) {
        require(_owners[tokenId] == msg.sender, "Not certificate owner");
        _;
    }

    /*modifier onlyOwner(){
        require(msg.sender == owner, "Only owner can call this function");       
        _;
    }*/

    /*constructor(address operator) {
        owner = operator;
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

    function balanceOf(address certOwner) external view returns (uint256) {
        return _balances[certOwner];
    }

    function ownerOf(uint256 tokenId) external view returns (address) {
        return _owners[tokenId];
    }

    function mint(address to, uint256 score) external {
        _totalSupply++;
        _balances[to]++;
        _owners[_totalSupply] = to;
        _certificateScores[_totalSupply] = score;
        _ownedCertificates[to].push(_totalSupply);
        _ownedCertificatesIndex[_totalSupply] = _ownedCertificates[to].length - 1;
        emit Transfer(address(0), to, _totalSupply);
        emit Certification(to, _totalSupply, score);
    }

    function getCertificateScore(uint256 tokenId) external view returns (uint256) {
        return _certificateScores[tokenId];
    }

    function certificatesOfOwner(address certOwner) external view returns (uint256[] memory certificates, uint256[] memory scores) {
        uint256 certCount = _balances[certOwner];
        certificates = new uint256[](certCount);
        scores = new uint256[](certCount);

        for (uint256 i = 0; i < certCount; i++) {
            certificates[i] = _ownedCertificates[certOwner][i];
            scores[i] = _certificateScores[certificates[i]];
        }

        return (certificates, scores);
    }
}
