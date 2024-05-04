import { Button, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import NEAbi from "../../blockchain/abi/NewEraERC20.json";
import { LOCAL_WALLET_KEY, RPC, TOKEN_CONTRACT } from "../../common/constans";
import BuyToken from "./buyToken";

function User() {
  const [wallet, setWallet] = useState({
    address: "",
    isConnected: false,
  });
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [balance, setBalance] = useState(0);

  const walletConnect = localStorage.getItem(LOCAL_WALLET_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_WALLET_KEY))
    : {};

  // Get balance
  const getBalance = async (address) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC));
    const NEContractInstance = new web3.eth.Contract(NEAbi, TOKEN_CONTRACT);

    const balance = await NEContractInstance.methods.balanceOf(address).call();
    const result = Number(web3.utils.fromWei(balance, "ether"));

    setBalance(result);
  };

  const handleConnectWallet = () => {
    if (wallet?.isConnected) {
      window.ethereum.disconnect();
      localStorage?.setItem(
        LOCAL_WALLET_KEY,
        JSON.stringify({
          isConnected: false,
          address: "",
        })
      );
      setWallet({
        isConnected: false,
        address: "",
      });
      setBalance(0);
    } else {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
        console.log(accounts)
        if (accounts[0]) {
          localStorage?.setItem(
            LOCAL_WALLET_KEY,
            JSON.stringify({
              isConnected: true,
              address: accounts[0],
            })
          );
          setWallet({
            isConnected: true,
            address: accounts[0],
          });
          getBalance(accounts[0]);
        } else {
          console.log("Wallet not found");
        }
      });
    }
  };

  useEffect(() => {
    if (walletConnect?.isConnected) {
      setWallet(walletConnect);
      getBalance(walletConnect?.address);
    }
  }, [walletConnect?.isConnected]);

  return (
    <div>
      {wallet?.isConnected && (
        <span className="mr-4">Balance: {balance} NE</span>
      )}
      <Button onClick={handleConnectWallet} color="primary">
        {wallet?.isConnected ? "Disconnect" : "Connect"}
      </Button>

      <Button onClick={onOpen} color="primary" className="ml-4">
        Buy NEra
      </Button>

      <BuyToken
        wallet={wallet}
        setBalance={setBalance}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}

export default User;
