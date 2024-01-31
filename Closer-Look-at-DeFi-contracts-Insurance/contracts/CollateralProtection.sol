// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Implements a contract for managing collateral-protected loans with basic and premium plans.
contract CollateralProtection {
    // The Ethereum address of the contract owner, initialized at deployment.
    address public owner;

    // Constants defining loan plan parameters for easy reference and maintenance.
    uint256 private constant BASIC_PLAN_AMOUNT = 1 ether;
    uint256 private constant BASIC_PLAN_DURATION = 90 days;
    uint256 private constant PREMIUM_PLAN_AMOUNT = 2 ether;
    uint256 private constant PREMIUM_PLAN_DURATION = 180 days;

    // Defines a loan policy structure to encapsulate loan terms and state.
    struct LoanPolicy {
        uint256 amount;               // The principal amount of the loan.
        uint256 collateralThreshold;  // Minimum required collateral for the loan.
        uint256 duration;             // Loan duration from the time of issuance.
        uint256 owed;                 // Total amount owed, including interest.
        uint256 walletBalance;        // Current balance held in the wallet for this loan.
        bool isPaid;                  // Flag indicating whether the loan has been fully repaid.
    }

    // Maps borrower addresses to their collateral amounts to track collateralized assets.
    mapping(address => uint256) public collaterals;
    // Maps borrower addresses to their respective loan policies for loan management.
    mapping(address => LoanPolicy) public loans;

    // Event declarations for significant actions within the contract.
    event LoanCreated(address indexed borrower, uint256 amount, uint256 collateral);
    event CollateralReturned(address indexed borrower, uint256 amount);

    // Initializes the contract by setting the deployer as the owner.
    constructor() {
        owner = msg.sender;
    }

    // Access control modifier to limit certain functions to the contract owner.
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    // Initiates a new loan with specified amount and collateral, enforcing constraints and setting terms based on plan.
    function createLoan(uint256 amount, uint256 collateral) external onlyOwner {
        require(amount > 0, "Loan amount must be greater than zero.");
        require(collateral > 0, "Collateral must be greater than zero.");
        require(loans[msg.sender].amount == 0, "Loan already exists for this borrower.");

        LoanPolicy memory newLoan;
        newLoan.amount = amount;
        newLoan.collateralThreshold = collateral;
        newLoan.isPaid = false;
        newLoan.walletBalance = 0;

        // Determines loan duration and interest based on the amount relative to plan thresholds.
        if (amount > BASIC_PLAN_AMOUNT) {
            newLoan.duration = block.timestamp + PREMIUM_PLAN_DURATION;
            newLoan.owed = amount + (amount * 20) / 100; // 20% interest for premium plans.
        } else {
            newLoan.duration = block.timestamp + BASIC_PLAN_DURATION;
            newLoan.owed = amount + (amount * 10) / 100; // 10% interest for basic plans.
        }

        loans[msg.sender] = newLoan;
        collaterals[msg.sender] = collateral;

        emit LoanCreated(msg.sender, amount, collateral);
    }

    // Enables the contract owner to collect funds from a specified loan, ensuring all conditions are met.
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

    // Allows borrowers to repay their loans, updating the loan status and returning collateral upon full repayment.
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

    // Fallback function to accept Ether directly sent to the contract without a function call.
    receive() external payable {}
}
