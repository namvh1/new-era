import { Button } from "@nextui-org/button";
import {
  Card,
  CardFooter,
  CardHeader,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Web3 from "web3-old";
import NEAbi from "../../blockchain/abi/NewEraERC20.json";
import { RPC, TOKEN_CONTRACT, WALLET_ADDRESS } from "../../common/constans";

export default function CourseCard(props) {
  const { item } = props;
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [courseBought, setCourseBought] = useState([]);

  const courses = localStorage.getItem("courses") || {};
  const coursesParse = JSON.parse(
    typeof courses === "string" ? courses : JSON.stringify(courses)
  );

  const buy = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const web3 = await new Web3(RPC);
    const NEContractInstance = new web3.eth.Contract(NEAbi, TOKEN_CONTRACT);

    const data = await NEContractInstance.methods
      .transfer(WALLET_ADDRESS, web3.utils.toWei(String(item.price || 0)))
      .encodeABI();

    window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            to: TOKEN_CONTRACT,
            from: accounts[0],
            data: data,
          },
        ],
      })
      .then((res) => {
        window.open(`https://sepolia.etherscan.io/tx/${res}`);

        const walletItem = localStorage.getItem("wallet") || {};
        const parse = JSON.parse(
          typeof walletItem === "string"
            ? walletItem
            : JSON.stringify(walletItem)
        );
        parse[accounts[0]] = {
          coin: parse[accounts[0]]
            ? parse[accounts[0]].coin - item.price
            : item.price,
          nfts: [],
        };
        localStorage.setItem("wallet", JSON.stringify(parse));

        const courses = localStorage.getItem("courses") || {};
        const coursesParse = JSON.parse(
          typeof courses === "string" ? courses : JSON.stringify(courses)
        );
        if (coursesParse[accounts[0]]) {
          const course = coursesParse[accounts[0]].find(
            (itemm) => itemm.courseId === item.slug
          );
          if (!course) {
            coursesParse[accounts[0]].push({
              courseId: item.slug,
            });

            setCourseBought([...courseBought, item.slug]);
          }
        } else {
          coursesParse[accounts[0]] = [
            {
              courseId: item.slug,
            },
          ];
        }

        localStorage.setItem("courses", JSON.stringify(coursesParse));
        onClose();
      });
  };

  const handleClickBuy = () => {
    if (courseBought?.includes(item?.slug)) {
      window.location.href = `${window.location.origin}/courses/${item?.slug}`;
    } else {
      onOpen();
    }
  };

  useEffect(() => {
    if (coursesParse[Object.keys(coursesParse)[0]]?.length) {
      setCourseBought(
        coursesParse[Object.keys(coursesParse)[0]]?.map((it) => it.courseId)
      );
    }
  }, [coursesParse[Object.keys(coursesParse)[0]]?.length]);

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

        {!props.isBuyed && (
          <Button
            className="text-tiny"
            color="primary"
            radius="full"
            size="sm"
            onClick={handleClickBuy}
          >
            {courseBought?.includes(item?.slug) ? "Learn" : "Buy"}
          </Button>
        )}
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
                <Button color="primary" onPress={buy}>
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
