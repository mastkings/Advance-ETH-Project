// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CollateralProtection {
    // Contract owner's address
    address public owner;

    // Constants for loan plans
    uint256 private constant BASIC_PLAN_AMOUNT = 1 ether;
    uint256 private constant BASIC_PLAN_DURATION = 90 days;
    uint256 private constant PREMIUM_PLAN_AMOUNT = 2 ether;
    uint256 private constant PREMIUM_PLAN_DURATION = 180 days;

    struct LoanPolicy {
        uint256 amount;
        uint256 collateralThreshold;
        uint256 duration;
        uint256 owed;
        uint256 walletBalance;
        bool isPaid;
    }

    // Mapping of borrower's collateral amounts
    mapping(address => uint256) public collaterals;
    // Mapping of borrower's loan policies
    mapping(address => LoanPolicy) public loans;

    // Events
    event LoanCreated(address indexed borrower, uint256 amount, uint256 collateral);
    event CollateralReturned(address indexed borrower, uint256 amount);

    constructor() {
        owner = msg.sender; // Setting the contract owner
    }

    // Modifier to restrict access to the owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    // Function to create a loan
    function createLoan(uint256 amount, uint256 collateral) external onlyOwner {
        require(amount > 0, "Loan amount must be greater than zero.");
        require(collateral > 0, "Collateral must be greater than zero.");
        require(loans[msg.sender].amount == 0, "Loan already exists for this borrower.");

        LoanPolicy memory newLoan;
        newLoan.amount = amount;
        newLoan.collateralThreshold = collateral;
        newLoan.isPaid = false;
        newLoan.walletBalance = 0;

        if (amount > BASIC_PLAN_AMOUNT) {
            newLoan.duration = block.timestamp + PREMIUM_PLAN_DURATION;
            newLoan.owed = amount + (amount * 20) / 100; // 20% interest for premium plan
        } else {
            newLoan.duration = block.timestamp + BASIC_PLAN_DURATION;
            newLoan.owed = amount + (amount * 10) / 100; // 10% interest for basic plan
        }

        loans[msg.sender] = newLoan;
        collaterals[msg.sender] = collateral;

        emit LoanCreated(msg.sender, amount, collateral);
    }

    // Function to collect the loan
    function collectLoan() external payable {
        LoanPolicy storage loan = loans[owner];
        require(collaterals[owner] > 0, "No collateral associated with the owner.");
        require(loan.walletBalance == 0, "Wallet balance must be zero.");
        require(loan.collateralThreshold >= loan.amount, "Insufficient collateral.");
        require(!loan.isPaid, "Loan is already paid.");

        (bool sent,) = owner.call{value: loan.amount}("");
        require(sent, "Failed to send Ether.");

        loan.walletBalance += loan.amount;
    }

    // Function to pay the loan
    function payLoan() external payable {
        LoanPolicy storage loan = loans[owner];
        require(loan.owed > 0, "No loan available to pay.");
        require(msg.value >= loan.owed, "Insufficient payment amount.");
        require(!loan.isPaid, "Loan is already paid.");

        payable(address(this)).transfer(msg.value);

        loan.owed -= msg.value;
        collaterals[msg.sender] = 0;

        emit CollateralReturned(owner, msg.value);
    }

    // Fallback function for receiving Ether
    receive() external payable {}
}
