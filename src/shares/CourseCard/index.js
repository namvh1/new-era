import {Card, CardFooter, CardHeader, Image} from "@nextui-org/react";
import {Button} from "@nextui-org/button";

export default function CourseCard(){
    return <Card  isFooterBlurred className="w-full h-[200px] col-span-1">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <Image
                src="https://i.pinimg.com/originals/dd/aa/45/ddaa452e0a3acaf6c79f6aa2fd69cebe.png"
                alt="NextUI Album Cover"
                className="rounded-full w-[50px] h-[50px]"
            />
            <h4 className=" font-medium text-2xl">Starship</h4>
        </CardHeader>
        <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
            src="https://i.ytimg.com/vi/zkVWqHUh0C4/maxresdefault.jpg"
        />
        <CardFooter className="absolute bg-cyan-50/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
                <p className=" text-tiny">Available soon.</p>
                <p className="text-tiny">Get notified.</p>
            </div>
            <Button className="text-tiny" color="primary" radius="full" size="sm">
                Notify Me
            </Button>
        </CardFooter>
    </Card>
}