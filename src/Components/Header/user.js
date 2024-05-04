import {Avatar, Button, Link, useDisclosure} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import NEAbi from "../../blockchain/abi/NewEraERC20.json";
import { LOCAL_WALLET_KEY, RPC, TOKEN_CONTRACT } from "../../common/constans";
import { formatNumberBro } from "../../common/function";
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

    const walletItem = localStorage.getItem("wallet") || {};
    const parse = JSON.parse(
      typeof walletItem === "string" ? walletItem : JSON.stringify(walletItem)
    );
    const localeBalance = parse[address]?.coin;

    setBalance(localeBalance > 0 ? localeBalance : result || 0);
  };

  const handleConnectWallet = () => {
    if (wallet?.isConnected) {
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
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
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
  }, [walletConnect?.isConnected, localStorage.getItem("courses")]);

  return (
    <div className={'flex items-center'}>
        {wallet?.isConnected && (<Link href="/profile" className="mr-4">
            <Avatar
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e2b28077-02b5-4e0f-8303-37e2672ea874/d5a1hdb-d15d5151-5a7b-4407-9eaa-99aa77863802.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UyYjI4MDc3LTAyYjUtNGUwZi04MzAzLTM3ZTI2NzJlYTg3NFwvZDVhMWhkYi1kMTVkNTE1MS01YTdiLTQ0MDctOWVhYS05OWFhNzc4NjM4MDIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ITLY1myWdL4iAy1wu4qYRLCGPOEbVs4rxrlXt5uR3zg"
                className="w-8 h-8 text-large"
            />
        </Link>)}
      {wallet?.isConnected && (
        <span className="mr-4">Balance: {formatNumberBro(balance, 4)} NE</span>
      )}
      <Button onClick={handleConnectWallet} color="primary">
        {wallet?.isConnected ? "Disconnect" : "Connect"}
      </Button>

      <Button onClick={onOpen} color="success" className="ml-4">
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
