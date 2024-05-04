import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";

const rpc = "https://rpc.sepolia.org";

function User() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");

  const handleConnectWallet = () => {
    if (isConnected) {
      window.coin98.provider.disconnect();
      setIsConnected(false);
    } else {
      window.coin98.provider
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts[0]) {
            setAccount(accounts[0]);
            setIsConnected(true);
          } else {
            console.log("Wallet not found");
          }
        });
    }
  };

  // Get balance
  // const getBalance = async () => {
  //   const web3 = new Web3(new Web3.providers.HttpProvider(rpc));
  //   const NEContractInstance = await new web3.eth.Contract(
  //     NEAbi,
  //     "0xa01AfFF94B800267368db6710311559eF0d70248"
  //   );

  //   const balance = await NEContractInstance.methods.balanceOf(account).call();
  // };

  useEffect(() => {
    if (window.coin98 || window.ethereum) {
      if (!window.coin98.provider.isConnected()) {
        window.coin98.provider
          .request({ method: "eth_accounts" })
          .then((accounts) => {
            if (accounts[0]) {
              setAccount(accounts[0]);
              setIsConnected(true);
            } else {
              console.log("Wallet not found");
            }
          });
      }
    }
  }, [window.coin98, window.coin98.provider]);

  return (
    <div>
      <Button onClick={handleConnectWallet} color="primary">
        {isConnected ? "Disconnect" : "Connect"}
      </Button>

      {/* <Button onClick={getBalance} color="primary">
        get
      </Button> */}
    </div>
  );
}

export default User;
