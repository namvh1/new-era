import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Web3 from "web3-old";
import NEAbi from "../../blockchain/abi/NewEraERC20.json";
import {
  PK_WALLET,
  RPC,
  TOKEN_CONTRACT,
  WALLET_ADDRESS,
} from "../../common/constans";

function BuyToken({ wallet, setBalance, onClose, isOpen, onOpenChange }) {
  const buyToken = async () => {
    const amount = 1000;
    const web3 = new Web3(RPC);

    const NEContractInstance = new web3.eth.Contract(NEAbi, TOKEN_CONTRACT);
    const account = web3.eth.accounts.privateKeyToAccount(PK_WALLET);
    const data = NEContractInstance.methods
      .transfer(wallet?.address, web3.utils.toWei(String(amount || 0)))
      .encodeABI();
    const rawTx = {
      to: TOKEN_CONTRACT,
      from: wallet?.address,
      data,
    };

    const gas = await web3.eth.estimateGas(rawTx)
    const [nonce, gasPrice, networkId] = await Promise.all([
      web3.eth.getTransactionCount(account.address),
      web3.eth.getGasPrice(),
      web3.eth.net.getId(),
    ]);

    rawTx.gasPrice = gasPrice;
    rawTx.nonce = nonce;
    rawTx.chainId = networkId;
    rawTx.gas = gas;

    // const signedTx = await web3.eth.signTransaction(rawTx);
    const signedTransaction = await account.signTransaction(rawTx)
    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction) ;
    console.log('🚀 ~ buyToken ~ receipt:', receipt);
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
