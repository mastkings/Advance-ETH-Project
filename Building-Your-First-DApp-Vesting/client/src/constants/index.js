export const CONTRACT_ADDRESS = "0x7db74D0B264EC9f1578bFa7c6E57F94463529A1c";
export const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "vestingPeriod",
        type: "uint256",
      },
    ],
    name: "NewStakeholder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "stakeholder",
        type: "address",
      },
    ],
    name: "Whitelisted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "address",
        name: "_organizationAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_token",
        type: "uint256",
      },
    ],
    name: "createOrganization",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getClaimedToken",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getStakeholderPosition",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "stakeholderAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "stakeholderPosition",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "vestingPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimedToken",
            type: "uint256",
          },
        ],
        internalType: "struct Vesting.Stakeholder",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakeholderAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_position",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_vestingPeriod",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_token",
        type: "uint256",
      },
    ],
    name: "newStakeholder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "organizations",
    outputs: [
      {
        internalType: "address",
        name: "organizationAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakeholders",
    outputs: [
      {
        internalType: "address",
        name: "stakeholderAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "stakeholderPosition",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "vestingPeriod",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimedToken",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakeholder",
        type: "address",
      },
    ],
    name: "whitelistAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "whitelistedAddresses",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
