import { Button } from "@nextui-org/button";
import {Avatar, Progress, Image, Tabs, Tab, Card, CardHeader, CardFooter} from "@nextui-org/react";
import {useEffect, useState} from "react";
import courses from "../../courses.json";
import CourseCard from "../../shares/CourseCard";
const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger"
];
const total=[
  {
    name: 'Courses',
    value: 0,
    icon: <Image src={'https://cdn-icons-png.flaticon.com/512/4762/4762311.png'} width={50}/>
  },
  {
    name: 'Points',
    value: 0,
    icon: <Image src={'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-cartoon-gold-coin-vector-download-image_2286360.jpg'} width={50}/>

  }
]
function Profile() {
  const [account,setAccount]=useState('')
  useEffect(()=>{
    fetchAccount()
  },[])
  const fetchAccount=async()=>{
    const account=await window.ethereum
        .request({ method: "eth_accounts" })
    setAccount(account[0])
  }
  return <div className={'grid grid-cols-3 gap-4 text-black'}>
    <div className={'col-span-1 flex flex-col gap-2'}>
      <div className={'flex items-center justify-between'}>
        <Avatar src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e2b28077-02b5-4e0f-8303-37e2672ea874/d5a1hdb-d15d5151-5a7b-4407-9eaa-99aa77863802.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UyYjI4MDc3LTAyYjUtNGUwZi04MzAzLTM3ZTI2NzJlYTg3NFwvZDVhMWhkYi1kMTVkNTE1MS01YTdiLTQ0MDctOWVhYS05OWFhNzc4NjM4MDIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ITLY1myWdL4iAy1wu4qYRLCGPOEbVs4rxrlXt5uR3zg" className="w-20 h-20 text-large" />

      </div>

      <Progress aria-label="Loading..." value={60} className="max-w-md"/>
      <b>
        {account}
      </b>
      <div >
          Joined May 2024
        </div>
      <div className={'grid grid-cols-2 gap-4 '}>
        {
          total.map((item,key)=><div key={key} className={'col-span-1 flex items-center gap-2 bg-cyan-50 p-4 py-2 rounded'}>
            {item.icon}
            <div>
              <div>
                {item.name}
              </div>
              <div>
                <b>{item.value}</b>
              </div>
            </div>
          </div>)
        }
        
        
      </div>
      <a href={`https://etherscan.io/address/${account}`} target={'_blank'}>
        <Button color="primary" >
          {account}
        </Button>
      </a>

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
        {courses
            .map((item, key) => (
                <div className={"col-span-1"}>
                  <CourseCard key={key} item={item} isBuyed={true}/>
                </div>
            ))}

      </div>
    </div>

  </div>;
}

export default Profile;
