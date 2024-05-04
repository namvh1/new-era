import { Button } from "@nextui-org/button";
import {Avatar, Progress, Image, Tabs, Tab, Card, CardHeader, CardFooter} from "@nextui-org/react";
const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger"
];
function Profile() {
  return <div className={'grid grid-cols-3 gap-4 text-black'}>
    <div className={'col-span-1 flex flex-col gap-2'}>
      <div className={'flex items-center justify-between'}>
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-large" />
        <Button color="primary">
          Button
        </Button>

      </div>

      <Progress aria-label="Loading..." value={60} className="max-w-md"/>
      <b>
        0x7FF8...f9fd
      </b>
      <div >
          Joined May 2024
        </div>
      <div className={'grid grid-cols-2 gap-4 '}>
        {
          [1,2,3,4].map((item,key)=><div key={key} className={'col-span-1 flex items-center gap-2 bg-cyan-50 p-4 py-2 rounded'}>
            <Image
                width={50}
                alt="NextUI hero Image"
                src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            />
            <div>
              <div>
                Quests
              </div>
              <div>
                <b>0</b>
              </div>
            </div>
          </div>)
        }
        
        
      </div>
      <Button color="primary">
        0x7FF8...f9fd
      </Button>
      <b>
        Achievements
      </b>
      <div className={'grid grid-cols-4 gap-2'}>
        {
          [0,1,2,3,4,5,5,6,7,8,9].map((item,key)=><div key={key} className={'bg-cyan-50 rounded col-span-1 flex items-center justify-center p-4'}>
            <Image
                isBlurred
                // width={50}
                // height={50}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToTpVIRcQZU6KyGz04JH4JSncjkn4jRN5CXeRbNRzJhmf4X26eGqs0xtuxQ0OjsH3J9_c&usqp=CAU"
                alt="NextUI Album Cover"
                className="rounded-full w-[50px] h-[50px]"
            />
          </div>)
        }

      </div>
    </div>
    <div className={'col-span-2'}>
      <Tabs  color={'primary'} aria-label="Tabs colors" radius="full">
        <Tab key="photos" title="Quests Completed"/>
        <Tab key="music" title="Favorites"/>
        <Tab key="videos" title="NFTs"/>
        <Tab key="videos" title="CUBEs"/>

      </Tabs>
      <div className={'grid grid-cols-3 gap-4 mt-4 text-white'}>
        {
          [0,1,2,3,4,5,6,7].map((item,key)=>(<Card key={key} isFooterBlurred className="w-full h-[300px] col-span-1">
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
          </Card>))
        }

      </div>
    </div>

  </div>;
}

export default Profile;
