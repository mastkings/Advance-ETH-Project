# Insurance Hardhat Project Documentation

This project aims to create a Solidity-based insurance provider protocol. The protocol empowers users to participate in two insurance types: Wallet Insurance and Collateral Protection for Cryptocurrency Loans. Users can make premium payments, initiate insurance claims, and leverage the protocol's coverage features.

## Contracts

This repository consists of three Solidity contracts: `CollateralProtection`, `WalletInsurance`, and `InsuranceFactory`. These contracts provide functionalities for collateral protection, wallet insurance, and an insurance factory to generate contracts for users.

### CollateralProtection Contract

The `CollateralProtection` contract enables users to establish loans and manage collateral. It incorporates the following capabilities:

- Creation of a loan with specified loan and collateral amounts.
- Contract owner's ability to collect the loan if sufficient collateral exists.
- Contract owner's option to repay the loan.
- Tracking of loan policies, collateral amounts, and loan statuses.

#### Functions

- `createLoan(uint256 loanAmount, uint256 collateralAmount)`: Creates a loan with the specified loan and collateral amounts.
- `collectLoan()`: Enables the contract owner to collect the loan if sufficient collateral is available.
- `payLoan()`: Allows the contract owner to pay off the loan.
- `getLoanCollateral(address borrower)`: Retrieves the associated collateral amount for a borrower.
- `getLoan(address borrower)`: Retrieves the loan policy for a borrower.

### WalletInsurance Contract

The `WalletInsurance` contract empowers users to insure their wallets. It encompasses the following functionalities:

- Payment of insurance premium to secure the wallet.
- Insurance claim submission after the coverage period expires.
- Monitoring of insured amount, insurance duration, and token balances.

#### Functions

- `payInsurance()`: Permits users to pay the insurance premium for wallet insurance.
- `claimInsurance()`: Allows the contract owner to submit an insurance claim after the coverage period ends.
- `getBalance()`: Retrieves the balance of the caller's wallet.
- `getTokenBalance()`: Retrieves the token balance of the caller's wallet.

### InsuranceFactory Contract

The `InsuranceFactory` contract serves as a factory for creating `WalletInsurance` and `CollateralProtection` contracts for users. It offers the following functionalities:

- Creation of a `WalletInsurance` contract for a user.
- Creation of a `CollateralProtection` contract for a user.
- Retrieval of the `WalletInsurance` contract associated with a user.
- Retrieval of the `CollateralProtection` contract associated with a user.

#### Functions

- `createWalletInsurance(uint256 insuredAmount)`: Generates a `WalletInsurance` contract for the caller with the specified insured amount.
- `getUserWalletContract()`: Retrieves the `WalletInsurance` contract linked to the caller.
- `createCollateralProtection()`: Creates a `CollateralProtection` contract for the caller.
- `getUserInsuranceContracts()`: Retrieves the `CollateralProtection` contract linked to the caller.

## Deployment

To access the repository's contents, download the entire repository. Navigate to the project directory and run the following commands:

```sh
npm install
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat compile
npx hardhat run scripts/deploy.js --network mumbai
```

Before deploying the contract, configure your `.env` file by renaming `.env.example` and providing your wallet private key.

## Author

[[Samuel Paul](https://github.com/samuepaul)]

## License

This project is licensed under the MIT License.
