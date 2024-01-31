import { Route, Routes } from 'react-router-dom'
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import User from './components/User'
import Admin from './components/Admin'
import { getBalance, getContract, isWalletConnected, getOrganizations, getStakeholders } from './components/Commands'
import { useEffect, useState } from 'react'

function App() {

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      console.log('Blockchain loaded');
      await isWalletConnected();
      setLoaded(true);
      await getOrganizations();
      await getContract();
      await getBalance();
      await getStakeholders()
    };
    loadData();
  }, []);
  
  return (
    <>
      <div className='min-h-screen bg-green-200'>
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Hero/>} />
          <Route path="/User" exact element={<User/>} />
          <Route path="/Admin" exact element={<Admin/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
