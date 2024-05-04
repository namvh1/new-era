import {
  Card,
  CardFooter,
  CardHeader,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Redirect, useHistory } from "react-router-dom";
import Web3 from "web3";
import { RPC, TOKEN_CONTRACT } from "../../common/constans";
import { NEAbi } from "../../blockchain/abi/NewEraERC20";
import { useEffect, useState } from "react";

export default function CourseCard(props) {
  const { item } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  let history = useHistory();
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    getBalance();
  }, []);
  const getBalance = async () => {
    const account = await window.coin98?.provider?.request({
      method: "eth_accounts",
    });
    if (!account) {
      return
    }
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC));
    const NEContractInstance = new web3.eth.Contract(NEAbi, TOKEN_CONTRACT);

    const balance = await NEContractInstance.methods
      .balanceOf(account[0])
      .call();
    const result = Number(web3.utils.fromWei(balance, "ether"));

    setBalance(result);
  };
  return (
    <Card isFooterBlurred className="w-full h-[200px] col-span-1">
      <CardHeader className="absolute z-10 top-1 flex-col items-start"></CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={item.image}
      />
      <CardFooter className="absolute bg-cyan-50/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <h4 className="">{item.name}</h4>
          <p className="text-tiny">{item.desc}</p>
        </div>

        <Button
          className="text-tiny"
          color="primary"
          radius="full"
          size="sm"
          onClick={onOpen}
        >
          Buy
        </Button>
        {/*<Link href={`/courses/${item.slug}`} >*/}
        {/*    <Button className="text-tiny" color="primary" radius="full" size="sm" >*/}
        {/*        Buy*/}
        {/*    </Button>*/}
        {/*</Link>*/}
      </CardFooter>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {item.name}
              </ModalHeader>
              <ModalBody>
                <Image src={item.image} width={300} />
                <div className={"flex items-center gap-2"}>
                  <div>Price: </div>
                  <div>{item.price} NERA</div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Buy
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}
