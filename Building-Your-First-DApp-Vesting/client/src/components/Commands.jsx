import { ethers } from 'ethers';


import { getGlobalState, setGlobalState  } from './store'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants';

const {ethereum } = window
const contractAbi = CONTRACT_ABI


const contractAddress =  CONTRACT_ADDRESS
const connectWallet = async () => {
    try {
        if (!ethereum) return alert('Wallet not found')
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    }catch(error){
        reportError(error)
    }
}
const isWalletConnected = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
  
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload()
      })
  
      window.ethereum.on('accountsChanged', async () => {
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
        await isWalletConnected()
      })
  
      if (accounts.length) {
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
      } else {
        alert('Please connect wallet.')
        console.log('No accounts found.')
      }
    } catch (error) {
      reportError(error)
    }
  }

  const getContract = async () => {
    const connectedAccount = getGlobalState('connectedAccount')
  
    if (connectedAccount) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractAbi, signer)
      return contract
    } else {
      return getGlobalState('contract')
    }
  
  }
 
  const addNewOrganization = async (name ,address, token) => {
    try {
  
      if (!ethereum) return alert("Please install Metamask")
      // const connectedAccount = getGlobalState("connectedAccount")
      const contract = await getContract()
      console.log("name ,address, token   ",name ,address, token)
      const organization = await contract.createOrganization(name ,address, token)
      console.log("organization ",organization)
      return true
    } catch (error) {
      reportError(error)
    } 
    
  }

  const getOrganizations = async ( ) => {
    try {
  
      if (!ethereum) return alert("Please install Metamask")
      const connectedAccount = getGlobalState("connectedAccount")
      const contract = await getContract()
      const organization = await contract.organizations(connectedAccount)
      // setGlobalState("organization", organization )
      console.log(organization) ;
    } catch (error) {
      console.log(error)
      // reportError(error)
    }
  }

  const getStakeholders = async ( ) => {
    try {
  
      if (!ethereum) return alert("Please install Metamask")
      const connectedAccount = getGlobalState("connectedAccount")
      const contract = await getContract()
      const organization = await contract.getStakeholderPosition(connectedAccount)
      setGlobalState("organization", organization )
      console.log(organization) ;
    } catch (error) {
      reportError(error)
    }
  }


  const addNewStakeholder = async ( _stakeholderAddress,_post, _vestingPeriod, _token) => {
    try {
  
      if (!ethereum) return alert("Please install Metamask")
      // const connectedAccount = getGlobalState("connectedAccount")
      const contract = await getContract()
      const organization = await contract.newStakeholder(_stakeholderAddress,_post, _vestingPeriod, _token)
      console.log("organization ",organization)
      
      return true;
    } catch (error) {
      reportError(error)
    }
  }

  const addToWhitelist = async (_address) => {
    try {
  
      if (!ethereum) return alert("Please install Metamask")
      // const connectedAccount = getGlobalState("connectedAccount")
      const contract = await getContract()
      const organization = await contract.whitelistAddress(_address)
      console.log("organization ",organization)
      return true;
    } catch (error) {
      reportError(error)
    }
  }
  
  const claimVesting = async () => {
    try {
  
      if (!ethereum) return alert("Please install Metamask")
      // const connectedAccount = getGlobalState("connectedAccount")
      const contract = await getContract()
      const organization = await contract.claimToken()
      console.log("organization ",organization)
      return true;
    } catch (error) {
      reportError(error)
    }
  }

  const getBalance = async () => {
    try {
  
      if (!ethereum) return alert("Please install Metamask")
      const connectedAccount = getGlobalState("connectedAccount")
      const contract = await getContract()
      const bal = await contract.balances(connectedAccount)
      console.log("bal ",bal.toString())
      setGlobalState('bal', bal.toString())
      return bal;
    } catch (error) {
      reportError(error)
    }
  }

const reportError = (error) => { 
    console.log(error.message)
    throw new Error( "Error", error)
}

export {
    connectWallet,
    isWalletConnected,
    getContract,
    addNewOrganization,
    addNewStakeholder,
    getOrganizations,
    addToWhitelist,
    claimVesting,
    getStakeholders,
    getBalance,
}