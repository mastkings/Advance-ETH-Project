import { useGlobalState } from "./store";
import Navbar from "./Navbar";
import { claimVesting } from "./Commands";

function User() {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [bal] = useGlobalState("bal");
  const [organization] = useGlobalState("organization");

  return (
    <div>
      <Navbar />
      <div className="p-24 mt-44">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full sm:w-1/2 bg-green-300 p-6 rounded-lg shadow-lg">
            <div className="flex justify-center items-center mb-6">
              <p className="text-center text-lg text-white">
                Account: {connectedAccount.slice(0, 4) + "..." + connectedAccount.slice(-5)}
              </p>
            </div>
            <div className="flex justify-center items-center mb-6">
              <div className="bg-green-200 text-white py-3 px-6 rounded-l-lg">
                Claimed Vested Token:
              </div>
              <div className="bg-green-300 text-white py-3 px-6 rounded-r-lg">
                {bal}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-center text-lg text-white">Stakeholder Position: {organization.stakeholderPosition}</p>
              <p className="text-center text-lg text-white">Vested Token: {organization ? `${organization.tokenAmount}` : ""}</p>
            </div>
            <div className="flex justify-center">
            <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full"
                onClick={() => claimVesting()}
              >
                Claim your vested Token
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
