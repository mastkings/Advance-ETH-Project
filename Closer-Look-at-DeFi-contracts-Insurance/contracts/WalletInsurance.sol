// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// This contract provides a simplistic model for wallet insurance, allowing users to insure their wallets for a specified amount and duration.
contract WalletInsurance {
    // Public state variables
    address public owner;             // Owner of the insurance contract, typically the entity offering the insurance.
    uint256 public insuredAmount;     // The amount for which the wallet is insured.
    uint256 public tokensIssued;      // The number of tokens issued as part of the insurance policy.
    bool public isInsured;            // Flag indicating whether the wallet is currently insured.
    uint256 public insuranceExpiry;   // Timestamp indicating when the current insurance policy expires.

    // Constants for insurance policy terms
    uint256 private constant BASIC_INSURANCE_DURATION = 90 days;
    uint256 private constant BASIC_POLICY_RATE = 4;
    uint256 private constant BASIC_POLICY = 1e9; // Represents the token amount for basic insurance.

    uint256 private constant STANDARD_INSURANCE_DURATION = 180 days;
    uint256 private constant STANDARD_POLICY_RATE = 9;
    uint256 private constant STANDARD_POLICY = 1e8; // Represents the token amount for standard insurance.

    // Mapping to track Ether balances and token balances of insured parties.
    mapping(address => uint256) public balances;
    mapping(address => uint256) public tokenBalances;

    // Events to log significant contract activities.
    event PaymentReceived(address indexed payer, uint256 amount);
    event Claimed(address indexed claimant, uint256 amount);

    // Initializes the contract with the insured amount and sets the contract owner.
    constructor(uint256 _insuredAmount) {
        owner = msg.sender;
        insuredAmount = _insuredAmount;
    }

    // Modifier to restrict function access to the contract owner.
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    // Allows a user to pay for insurance, setting the terms based on the payment amount.
    function payInsurance() external payable {
        require(!isInsured, "Already insured.");
        require(msg.value >= insuredAmount, "Insufficient payment amount.");
        require(block.timestamp > insuranceExpiry, "Insurance payment window closed.");

        balances[owner] += msg.value;
        setInsuranceTerms(msg.value);

        emit PaymentReceived(msg.sender, msg.value);
    }

    // Allows the contract owner to claim the insurance payout after the policy has expired.
    function claimInsurance() external onlyOwner {
        require(isInsured, "Not insured.");
        require(block.timestamp > insuranceExpiry, "Insurance still valid.");
        require(balances[owner] > 0, "No payment made.");

        isInsured = false;
        tokenBalances[owner] += tokensIssued;
        sendEther(owner, address(this).balance);

        emit Claimed(owner, address(this).balance);
    }

    // Retrieves the Ether balance associated with the caller's address.
    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    // Retrieves the token balance associated with the caller's address.
    function getTokenBalance() external view returns (uint256) {
        return tokenBalances[msg.sender];
    }

    // Private function to set the insurance terms based on the payment amount.
    function setInsuranceTerms(uint256 payment) private {
        uint256 rate;
        uint256 policyValue;
        uint256 duration;

        // Determines the insurance terms based on the payment amount, applying either basic or standard policy terms.
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

    // Calculates the number of tokens to be issued based on the insurance payment and policy terms.
    function calculateTokens(uint256 amount, uint256 rate, uint256 policy, uint256 duration) private pure returns (uint256) {
        return (amount * rate * duration) / policy;
    }

    // Transfers Ether from the contract to a specified address.
    function sendEther(address to, uint256 amount) private {
        (bool sent, ) = to.call{value: amount}("");
        require(sent, "Ether transfer failed.");
    }
}
