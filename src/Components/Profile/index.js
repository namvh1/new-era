import { Button } from "@nextui-org/button";
import {
  Avatar,
  Progress,
  Image,
  Tabs,
  Tab,
  Card,
  CardHeader,
  CardFooter,
  Link,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import courses from "../../courses.json";
import CourseCard from "../../shares/CourseCard";
const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];
const total = [
  {
    name: "Courses",
    icon: (
      <Image
        src={"https://cdn-icons-png.flaticon.com/512/4762/4762311.png"}
        width={50}
      />
    ),
  },
  {
    name: "Points",
    icon: (
      <Image
        src={
          "https://png.pngtree.com/element_our/20200702/ourmid/pngtree-cartoon-gold-coin-vector-download-image_2286360.jpg"
        }
        width={50}
      />
    ),
  },
];
function Profile() {
  const [account, setAccount] = useState("");
  const [stCourses, setStCourses] = useState([]);
  const [stTotal, setTotal] = useState([]);
  const [nfts, setNfts] = useState([]);

  const fetchAccount = async () => {
    const account = await window.ethereum.request({ method: "eth_accounts" });
    const coursesItem = JSON.parse(
      localStorage.getItem("courses") || JSON.stringify({})
    );
    const walletItem = localStorage.getItem("wallet") || {};
    const parse = JSON.parse(
      typeof walletItem === "string" ? walletItem : JSON.stringify(walletItem)
    );
    const nfts = (parse[account[0]]?.nfts || []).map((item) => {
      const listMetadata = JSON.parse(
        localStorage.getItem("listMetadata") || JSON.stringify({})
      );
      return listMetadata[`https://abc.xyz/collection/${item}`];
    });
    let list = [];
    let total = [];
    let point = 0;
    coursesItem[account[0]].forEach((itemm) => {
      const courseFinded = courses.find((item) => item.slug === itemm.courseId);
      courseFinded.isDone = !!nfts.find(
        (item) => item.name === courseFinded.slug
      );
      if (courseFinded) {
        point += courseFinded.point;
        list.push(courseFinded);
      }
    });
    total.push(coursesItem[account[0]] ? coursesItem[account[0]].length : 0);
    total.push(point);

    setNfts(nfts);
    setTotal(total);
    setStCourses(list);
    setAccount(account[0]);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div className={"grid grid-cols-3 gap-4 text-black mt-8"}>
      <div className={"col-span-1 flex flex-col gap-2"}>
        <div className={"flex items-center justify-between"}>
          <Avatar
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e2b28077-02b5-4e0f-8303-37e2672ea874/d5a1hdb-d15d5151-5a7b-4407-9eaa-99aa77863802.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UyYjI4MDc3LTAyYjUtNGUwZi04MzAzLTM3ZTI2NzJlYTg3NFwvZDVhMWhkYi1kMTVkNTE1MS01YTdiLTQ0MDctOWVhYS05OWFhNzc4NjM4MDIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ITLY1myWdL4iAy1wu4qYRLCGPOEbVs4rxrlXt5uR3zg"
            className="w-20 h-20 text-large"
          />
        </div>

        <Progress aria-label="Loading..." value={60} className="max-w-md" />
        <b>{account}</b>
        <div>Joined May 2024</div>
        <div className={"grid grid-cols-2 gap-4 "}>
          {(total || []).map((item, key) => (
            <div
              key={key}
              className={
                "col-span-1 flex items-center gap-2 bg-cyan-50 p-4 py-2 rounded"
              }
            >
              {item.icon}
              <div>
                <div>{item.name}</div>
                <div>
                  <b>{stTotal[key]}</b>
                </div>
              </div>
            </div>
          ))}
        </div>
        <a href={`https://etherscan.io/address/${account}`} target={"_blank"}>
          <Button color="primary">{account}</Button>
        </a>

        <b>Achievements</b>
        <div className={"grid grid-cols-4 gap-2"}>
          {(nfts || []).map((item, key) => (
            <div
              key={key}
              className={
                "bg-cyan-50 rounded col-span-1 flex items-center justify-center p-4"
              }
            >
              <Image
                isBlurred
                // width={50}
                // height={50}
                src={item.image}
                alt="NextUI Album Cover"
                className="rounded-full w-[50px] h-[50px]"
              />
            </div>
          ))}
        </div>
      </div>
      <div className={"col-span-2"}>
        {/*<Tabs  color={'primary'} aria-label="Tabs colors" radius="full">*/}
        {/*  <Tab key="photos" title="My Courses" />*/}
        {/*  <Tab key="music" title="Completed"/>*/}
        {/*</Tabs>*/}
        <div className={"grid grid-cols-3 gap-4 mt-4 text-white"}>
          {(stCourses || []).map((item, key) => (
            <div className={"col-span-1"}>
              <Link href={`/courses/${item.slug}`}>
                <CourseCard
                  key={key}
                  item={item}
                  isBuyed={true}
                  isDone={item.isDone}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
