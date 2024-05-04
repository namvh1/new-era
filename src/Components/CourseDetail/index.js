import {
    Avatar,
    Chip,
    Listbox,
    ListboxItem,
    Image,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader, ModalBody, ModalFooter
} from "@nextui-org/react";
import {icon} from "../../icon";
import {Button} from "@nextui-org/button";
import {useState} from "react";


const steps=[
    {step:1,
    desc: 'courses'},
    {
        step: 2,
        desc: 'practices'
    },
    {
        step:3,
        desc: 'Mint NFT'
    }
]

export default function CourseDetail(){
    const [step,setStep]=useState(1)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const handleStep=()=>{
        if(step===3){
            onOpen()
            return
        }
        setStep(step+1)
    }
    return <div>
        <div className={'p-16 grid grid-cols-3 gap-4'}>
        <div className={'col-span-1 flex flex-col gap-2'}>
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTQVePSPrR4w4viZVw9iebL4WSIoIQ2PNK9-s7kJ9BpvLbZ7SS7iVy0kELog5if-tri6o&usqp=CAU" className="w-20 h-20 text-large" />
            <Chip>Scroll sprint</Chip>
            <b>Scroll Sprint: Compound</b>
            <p>Borrow and lend tokens via Compound on the Scroll network.</p>
            <div className={'flex items-center gap-2'}>
                <Chip>Scroll</Chip>
                <Chip>Intermediate</Chip>
            </div>
            <b>Finish all steps</b>
            <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 ">
                <Listbox
                    aria-label="Actions"
                >
                    {
                        steps.map((item,key)=><ListboxItem
                            className={item.step===step && 'bg-zinc-400'}
                            key={key}><div className={'flex items-center gap-2'}>
                            <Chip>{item.step}</Chip>
                            <b className={'text-xl'}>{item.desc}</b>
                        </div></ListboxItem>)
                    }


                </Listbox>
            </div>
            <div className={'p-4 py-0 flex items-center bg-zinc-100 rounded justify-between'}>
                <div className={''}>
                    <b>Rewards</b>
                    <div className={'flex items-center gap-2'}>
                        {icon.fire}
                        <b>75</b>
                    </div>
                </div>
                <div >
                    <Image src={'https://app.layer3.xyz/images/trophy-3d.png'} width={200}/>
                </div>
            </div>
        </div>
        <div className={'col-span-2'}>
            <iframe className={'w-full h-[560px]'} src="https://www.youtube.com/embed/Yl95vDqU5PE?si=grr160PZTmZmOLT-"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <Button color={'primary'} onClick={handleStep}>Next</Button>
        </div>

    </div>
        <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Collection</ModalHeader>
                        <ModalBody>
                            <Image src={'https://www.ledgerinsights.com/wp-content/uploads/2021/11/robotos-810x524.jpg'} width={400}/>
                        </ModalBody>
                        <ModalFooter>

                            <Button color="primary" onPress={onClose}>
                                Mint
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>

    </div>
}