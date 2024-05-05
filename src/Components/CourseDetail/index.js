import { Button } from "@nextui-org/button";
import {
  Chip,
  Image,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Web3 } from "web3";
import ABIJson from "../../blockchain/abi/NewEraCertificate.json";
import courses from "../../courses.json";
import { icon } from "../../icon";

const steps = [
  { step: 1, desc: "Courses" },
  {
    step: 2,
    desc: "Practices",
  },
  {
    step: 3,
    desc: "Certificate",
  },
];
const rpc = "https://rpc.sepolia.org";
const web3 = new Web3(new Web3.providers.HttpProvider(rpc));
const NEContractInstance = await new web3.eth.Contract(
  ABIJson,
  "0x6A70840B01299062C3fa2886eCD11aCBB42dccab"
);
const Step1 = (props) => {
  return (
    <iframe
      className={"w-full h-[560px]"}
      src={props.video}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};
export default function CourseDetail() {
  const [step, setStep] = useState(1);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isDisabled, setDisabled] = useState(false);
  let params = useParams();
  const [stCourse, setStCourse] = useState({});
  useEffect(() => {
    const courseFinded = courses.find((item) => item.slug === params.slug);
    setStCourse(courseFinded);
  }, []);
  const mint = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let tokenId = JSON.parse(localStorage.getItem("tokenId") || 0);
    tokenId++;

    let uri = `https://abc.xyz/collection/${tokenId}`;

    const metadata = {
      image:
        "https://i.guim.co.uk/img/media/b8a75934f827bdaf02a3814d1669c8da19886881/0_727_3500_2100/master/3500.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=1ad9e12c908d182c891b03abc19988f4",
      tokenId: tokenId,
      name: stCourse.name,
    };
    const mint = await NEContractInstance.methods
      .safeMint(accounts[0], tokenId, uri)
      .encodeABI();
    await window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            type: 0,
            to: "0x6A70840B01299062C3fa2886eCD11aCBB42dccab",
            from: accounts[0],
            data: mint,
          },
        ],
      })
      .then((res) => {
        const listMetadata =
          JSON.parse(localStorage.getItem("listMetadata")) || {};
        listMetadata[uri] = metadata;

        const walletItem = JSON.parse(
          localStorage.getItem("wallet") || JSON.stringify({})
        );
        walletItem[accounts[0]] = {
          ...walletItem[accounts[0]],
          nfts: [...walletItem[accounts[0]].nfts, tokenId],
        };
        localStorage.setItem("listMetadata", JSON.stringify(listMetadata));
        localStorage.setItem("tokenId", JSON.stringify(tokenId));
        localStorage.setItem("wallet", JSON.stringify(walletItem));
        setDisabled(true);

        window.open(`https://sepolia.etherscan.io/tx/${res}`);
        onClose();
      });
  };
  const handleStep = () => {
    if (step === 3) {
      onOpen();
      return;
    }
    setStep(step + 1);
  };
  return (
    <div>
      <div className={"p-16 grid grid-cols-3 gap-4"}>
        <div className={"col-span-1 flex flex-col gap-2"}>
          <Image src={stCourse.image} width={300} />

          {/*<Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTQVePSPrR4w4viZVw9iebL4WSIoIQ2PNK9-s7kJ9BpvLbZ7SS7iVy0kELog5if-tri6o&usqp=CAU" className="w-20 h-20 text-large" />*/}
          {/*<Chip>Scroll sprint</Chip>*/}
          <b>{stCourse.name}</b>
          <p>{stCourse.desc}</p>

          <b>Finish all steps</b>
          <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 ">
            <Listbox aria-label="Actions">
              {steps.map((item, key) => (
                <ListboxItem
                  className={item.step === step && "bg-zinc-400"}
                  key={key}
                >
                  <div className={"flex items-center gap-2"}>
                    <Chip>{item.step}</Chip>
                    <b className={"text-xl"}>{item.desc}</b>
                  </div>
                </ListboxItem>
              ))}
            </Listbox>
          </div>
          <div
            className={
              "p-4 py-0 flex items-center bg-zinc-100 rounded justify-between"
            }
          >
            <div className={""}>
              <b>Rewards</b>
              <div className={"flex items-center gap-2"}>
                {icon.fire}
                <b>75</b>
              </div>
            </div>
            <div>
              <Image
                src={"https://app.layer3.xyz/images/trophy-3d.png"}
                width={200}
              />
            </div>
          </div>
        </div>
        <div className={"col-span-2"}>
          {step === 1 && (
            <Step1 video={stCourse.videos && stCourse.videos[0]} />
          )}
          {step === 2 && (
            <RadioGroup label="Select your favorite token">
              <Radio value="btc">BTC</Radio>
              <Radio value="eth">ETH</Radio>
              <Radio value="nera">NERA</Radio>
              <Radio value="all">All</Radio>
            </RadioGroup>
          )}
          {step === 3 && (
            <div>
              <h1 className={"text-2xl text-center"}>Congratulations</h1>
              <div className={"flex items-center justify-center mt-4"}>
                <Image
                  width={400}
                  alt="NextUI hero Image"
                  src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL2ZyZWVpbWFnZXNjb21wYW55X3Bob3RvX29mX2FfZ29sZF9jb2luc19pbnNpZGVfYV90cmVhc3VyZV9jaGVzdF9iMzNmYmMzYS0zZWZkLTRjZmEtOGEyMi0yOWFjZDkyMDFlMmFfMS5wbmc.png"
                />
              </div>
            </div>
          )}
          <div className={"flex items-center justify-center mt-4"}>
            <Button
              color={"primary"}
              onClick={handleStep}
              isDisabled={isDisabled}
            >
              {step !== 3 ? "Next" : "Claim"}
            </Button>
          </div>
        </div>
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Collection
              </ModalHeader>
              <ModalBody>
                <Image
                  src={
                    "https://www.ledgerinsights.com/wp-content/uploads/2021/11/robotos-810x524.jpg"
                  }
                  width={400}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={mint} isDisabled={isDisabled}>
                  Claim
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
