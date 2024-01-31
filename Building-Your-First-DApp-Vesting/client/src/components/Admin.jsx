import { useState } from "react";
import Navbar from "./Navbar";
import { addNewOrganization, addNewStakeholder, addToWhitelist } from "./Commands";

function Admin() {
  const [address, setAddress] = useState('');
  const [token, setToken] = useState('');
  const [period, setPeriod] = useState('');
  const [name, setName] = useState('');
  const [stakeholderaddress, setStakeholderaddress] = useState('');
  const [stakeholdertoken, setStakeholdertoken] = useState('');
  const [whiteListAddress, setWhiteListAddress] = useState('');
  const [stakeholderPost, setStakeholderPost] = useState('');

  const orgSubmit = async (e) => {
    e.preventDefault();
    console.log(name)
    if (!address || !token || !name) return;
    // Perform form submission logic here

    console.log(name, address, token)
    try {
      // console.log(add)
      const result = await addNewOrganization(name, address, token);
      console.log("result ", result);
      if (result === true) {
        alert("success");
      } else {
        alert("Failed to add");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stakeholderaddress || !stakeholderPost || !period || !stakeholdertoken) return;
    try {
      const result = await addNewStakeholder(stakeholderaddress, stakeholderPost, period, stakeholdertoken);
      console.log("result ", result);
      if (result === true) {
        alert("success");
      } else {
        alert("Failed to add");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const whiteListSubmit = async (e) => {
    e.preventDefault();
    if (!whiteListAddress) return;
    try {
      const result = await addToWhitelist(whiteListAddress);
      if (result === true) {
        alert("success");
      } else {
        alert("Failed to add");
      }
      console.log("result ", result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="mt-32 flex justify-between">
        <div className="container mx-auto mt-8">
          <div className="max-w-md mx-auto flex font-semibold text-2xl items-center bg-green-400 uppercase justify-center shadow-md rounded px-8 py-6 text-white">
            Add Organization
          </div>
          <form className="max-w-md mx-auto bg-green-200 shadow-md rounded px-8 py-6" onSubmit={orgSubmit}>
            <div className="mb-4">
              <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="name">
                Organization Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Enter Organization address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="name">
                Organization Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter Organization name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="number">
                Token
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="vesting Period"
                type="number"
                placeholder="Enter organization Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="container mx-auto mt-8">
          <div className="max-w-md mx-auto flex font-semibold text-2xl items-center bg-green-300 uppercase justify-center shadow-md rounded px-8 py-6 text-white">
            Add Stakeholder
          </div>
          <form className="max-w-md mx-auto bg-green-200 shadow-md rounded px-8 py-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="name">
                Stakeholder Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="stakeholderaddress"
                type="text"
                placeholder="Enter stakeholder address"
                value={stakeholderaddress}
                onChange={(e) => setStakeholderaddress(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="name">
                Stakeholder Position
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="stakeholderPost"
                type="text"
                placeholder="Enter stakeholder Post"
                value={stakeholderPost}
                onChange={(e) => setStakeholderPost(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="number">
                Stakeholder Token
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="stakeholdertoken"
                type="number"
                placeholder="Enter stakeholder token"
                value={stakeholdertoken}
                onChange={(e) => setStakeholdertoken(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="number">
                Vesting Period
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="vesting Period"
                type="number"
                placeholder="Enter stakeholder vesting Period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center items-center mt-10 mb-10">
        <div className="container mx-auto mt-8">
          <div className="max-w-md mx-auto flex font-semibold text-2xl items-center bg-green-300 uppercase justify-center shadow-md rounded px-8 py-6 text-white">
            Whitelist Stakeholder
          </div>
          <form className="max-w-md mx-auto bg-green-200 shadow-md rounded px-8 py-6" onSubmit={whiteListSubmit}>
            <div className="mb-4">
              <label className="flex text-green-700 text-sm font-bold mb-2 items-center justify-center" htmlFor="name">
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                id="stakeholderaddress"
                type="text"
                placeholder="Enter address"
                value={whiteListAddress}
                onChange={(e) => setWhiteListAddress(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
