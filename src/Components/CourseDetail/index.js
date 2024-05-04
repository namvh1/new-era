import {
  Avatar,
  Chip,
  Listbox,
  ListboxItem,
  Image,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { icon } from "../../icon";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import ABIJson from "../../blockchain/abi/NewEraCertificate";
import { Web3 } from "web3";
import { useParams } from "react-router-dom";
import courses from "../../courses.json";

const steps = [
  { step: 1, desc: "Courses" },
  {
    step: 2,
    desc: "Practices",
  },
  {
    step: 3,
    desc: "Mint NFT",
  },
];
const rpc = "https://rpc.sepolia.org";
const web3 = new Web3(new Web3.providers.HttpProvider(rpc));
const NEContractInstance = new web3.eth.Contract(
  ABIJson,
  "0x6A70840B01299062C3fa2886eCD11aCBB42dccab"
);
const Step1 = (props) => {
  return (
    <iframe
      className={"w-full h-[560px]"}
      src={props.video}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};
export default function CourseDetail() {
  const [step, setStep] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  let params = useParams();
  const [stCourse, setStCourse] = useState({});
  useEffect(() => {
    const courseFinded = courses.find((item) => item.slug === params.slug);
    setStCourse(courseFinded);
  }, []);
  const mint = async () => {
    const account = await window.coin98.provider?.request({
      method: "eth_accounts",
    });

    const balance = await NEContractInstance.methods
      .safeMint(account[0])
      .call();
    console.log(balance);
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
          {step === 2 && <div>1+1=2</div>}
          {step === 3 && (
            <div className={"flex items-center justify-center"}>
              <Image
                width={400}
                alt="NextUI hero Image"
                src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL2ZyZWVpbWFnZXNjb21wYW55X3Bob3RvX29mX2FfZ29sZF9jb2luc19pbnNpZGVfYV90cmVhc3VyZV9jaGVzdF9iMzNmYmMzYS0zZWZkLTRjZmEtOGEyMi0yOWFjZDkyMDFlMmFfMS5wbmc.png"
              />
            </div>
          )}
          <div className={"flex items-center justify-center mt-4"}>
            <Button color={"primary"} onClick={handleStep}>
              {step !== 3 ? "Next" : "Mint"}
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
                <Button color="primary" onPress={mint}>
                  Mint
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
