// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title Vesting Contract for Token Distribution
/// @dev This contract allows for the vesting of tokens to stakeholders within an organization.
/// The owner can create organizations, add stakeholders, whitelist addresses, and distribute tokens.
contract Vesting {
    address public owner;
    uint256 public totalSupply;

    /// @notice Structure to store organization details
    /// @param name The name of the organization
    /// @param tokenAmount The amount of tokens allocated to the organization
    struct Organization {
        string name;
        uint256 tokenAmount;
    }

    /// @notice Structure to store stakeholder details
    /// @param position The position or role of the stakeholder within the organization
    /// @param vestingPeriod The period over which the tokens will vest
    /// @param startTime The start time of the vesting period
    /// @param tokenAmount The total amount of tokens allocated to the stakeholder
    /// @param claimedToken The amount of tokens already claimed by the stakeholder
    struct Stakeholder {
        string position;
        uint256 vestingPeriod;
        uint256 startTime;
        uint256 tokenAmount;
        uint256 claimedToken;
    }

    mapping(address => Stakeholder) public stakeholders;
    mapping(address => bool) public whitelistedAddresses;
    mapping(address => Organization) public organizations;
    mapping(address => uint256) public balances;

    event NewStakeholder(address indexed stakeholder, uint256 startTime, uint256 vestingPeriod);
    event Whitelisted(address indexed stakeholder, uint256 time);
    event TokensClaimed(address indexed stakeholder, uint256 amount);

    /// @notice Modifier to restrict access to only the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    /// @dev Sets the deploying address as the owner of the contract.
    constructor() {
        owner = msg.sender;
    }

    /// @notice Creates a new organization and allocates tokens to it
    /// @param _name The name of the organization
    /// @param _organizationAddress The address associated with the organization
    /// @param _token The amount of tokens allocated to the organization
    function createOrganization(string memory _name, address _organizationAddress, uint256 _token) external onlyOwner {
        organizations[_organizationAddress] = Organization(_name, _token);
        totalSupply += _token;
    }

    /// @notice Adds a new stakeholder to the system with their vesting details
    /// @param _stakeholderAddress The address of the stakeholder
    /// @param _position The position of the stakeholder within the organization
    /// @param _vestingPeriod The vesting period for the stakeholder's tokens
    /// @param _token The amount of tokens allocated to the stakeholder
    function newStakeholder(address _stakeholderAddress, string memory _position, uint256 _vestingPeriod, uint256 _token) external onlyOwner {
        require(_token <= organizations[msg.sender].tokenAmount, "Token amount exceeds organization balance.");
        stakeholders[_stakeholderAddress] = Stakeholder(_position, _vestingPeriod, block.timestamp, _token, 0);
        emit NewStakeholder(_stakeholderAddress, block.timestamp, _vestingPeriod);
    }

    /// @notice Whitelists an address, enabling it to claim vested tokens
    /// @param _stakeholder The address to be whitelisted
    function whitelistAddress(address _stakeholder) external onlyOwner {
        whitelistedAddresses[_stakeholder] = true;
        emit Whitelisted(_stakeholder, block.timestamp);
    }

    /// @notice Allows whitelisted stakeholders to claim their vested tokens after the vesting period
    function claimToken() external {
        require(whitelistedAddresses[msg.sender], "Address not whitelisted.");
        Stakeholder storage stakeholder = stakeholders[msg.sender];
        require(block.timestamp >= stakeholder.startTime + stakeholder.vestingPeriod, "Vesting period not yet over.");
        uint256 claimableTokens = stakeholder.tokenAmount - stakeholder.claimedToken;
        require(claimableTokens > 0, "No tokens available to claim.");
        stakeholder.claimedToken += claimableTokens;
        balances[msg.sender] += claimableTokens;
        emit TokensClaimed(msg.sender, claimableTokens);
    }

    /// @notice Returns the amount of tokens claimed by the caller
    /// @return The amount of claimed tokens
    function getClaimedToken() external view returns (uint256) {
        return balances[msg.sender];
    }

    /// @notice Retrieves the position of a stakeholder
    /// @param _address The address of the stakeholder
    /// @return The position of the stakeholder
    function getStakeholderPosition(address _address) external view returns (string memory) {
        return stakeholders[_address].position;
    }
}
