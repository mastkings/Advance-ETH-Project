// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WalletInsurance {
    address public owner;
    uint256 public insuredAmount;
    uint256 public tokensIssued;
    bool public isInsured;
    uint256 public insuranceExpiry;

    uint256 private constant BASIC_INSURANCE_DURATION = 90 days;
    uint256 private constant BASIC_POLICY_RATE = 4;
    uint256 private constant BASIC_POLICY = 1e9; // 1,000,000,000

    uint256 private constant STANDARD_INSURANCE_DURATION = 180 days;
    uint256 private constant STANDARD_POLICY_RATE = 9;
    uint256 private constant STANDARD_POLICY = 1e8; // 100,000,000

    mapping(address => uint256) public balances;
    mapping(address => uint256) public tokenBalances;

    event PaymentReceived(address indexed payer, uint256 amount);
    event Claimed(address indexed claimant, uint256 amount);

    constructor(uint256 _insuredAmount) {
        owner = msg.sender;
        insuredAmount = _insuredAmount;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    function payInsurance() external payable {
        require(!isInsured, "Already insured.");
        require(msg.value >= insuredAmount, "Insufficient payment amount.");
        require(block.timestamp > insuranceExpiry, "Insurance payment window closed.");

        balances[owner] += msg.value;
        setInsuranceTerms(msg.value);

        emit PaymentReceived(msg.sender, msg.value);
    }

    function claimInsurance() external onlyOwner {
        require(isInsured, "Not insured.");
        require(block.timestamp > insuranceExpiry, "Insurance still valid.");
        require(balances[owner] > 0, "No payment made.");

        isInsured = false;
        tokenBalances[owner] += tokensIssued;
        sendEther(owner, address(this).balance);

        emit Claimed(owner, address(this).balance);
    }

    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    function getTokenBalance() external view returns (uint256) {
        return tokenBalances[msg.sender];
    }

    function setInsuranceTerms(uint256 payment) private {
        uint256 rate;
        uint256 policyValue;
        uint256 duration;

        if (payment < 1 ether) {
            rate = BASIC_POLICY_RATE;
            policyValue = BASIC_POLICY;
            duration = BASIC_INSURANCE_DURATION;
        } else {
            rate = STANDARD_POLICY_RATE;
            policyValue = STANDARD_POLICY;
            duration = STANDARD_INSURANCE_DURATION;
        }

        insuranceExpiry = block.timestamp + duration;
        tokensIssued = calculateTokens(payment, rate, policyValue, duration);
        isInsured = true;
    }

    function calculateTokens(uint256 amount, uint256 rate, uint256 policy, uint256 duration) private pure returns (uint256) {
        return (amount * rate * duration) / policy;
    }

    function sendEther(address to, uint256 amount) private {
        (bool sent, ) = to.call{value: amount}("");
        require(sent, "Ether transfer failed.");
    }
}
