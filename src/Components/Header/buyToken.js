import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Web3 from "web3";
import { NEAbi } from "../../blockchain/abi/NewEraERC20";
import {
  PK_WALLET,
  RPC,
  TOKEN_CONTRACT,
  WALLET_ADDRESS,
} from "../../common/constans";

function BuyToken({ wallet, setBalance, onClose, isOpen, onOpenChange }) {
  console.log(wallet)
  const buyToken = async () => {
    const amount = 1000;
    const web3 = await new Web3(new Web3.providers.HttpProvider(RPC));

    const NEContractInstance = new web3.eth.Contract(NEAbi, TOKEN_CONTRACT);

    const data = await NEContractInstance.methods
      .transfer(wallet?.address, web3.utils.toWei(amount, "ether"))
      .encodeABI();

    const gasAmount = await web3.eth.estimateGas({
      to: wallet?.address,
      from: WALLET_ADDRESS,
      data,
    });

    const gasPrice = await web3.eth.getGasPrice();
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        type: "0",
        to: wallet?.address,
        from: WALLET_ADDRESS,
        data,
        gasLimit: web3.utils.toHex(Number(gasAmount.toString()) * 2),
        gasPrice,
      },
      PK_WALLET
    );

    web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .once("transactionHash", (hash) => {
        console.log(hash);
        onClose();
      })
      .catch((e) => {
        console.log(e);
      });

    // setBalance(result);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Buy NEra Token
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center">
                <Image src="assets/swapToken.png" width={300} />
                <p className="mt-4">You will recive 1000 NEra</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex w-full justify-center">
                <Button color="primary" onPress={buyToken}>
                  Pay with $200
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default BuyToken;
