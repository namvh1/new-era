import { Button } from "@nextui-org/button";
import { Avatar, Image, Link, Progress } from "@nextui-org/react";
import courses from "../../courses.json";
import CourseCard from "../../shares/CourseCard";
import { useEffect, useState } from "react";

const CardsWrap = (props) => {
  return (
    <div className={"grid grid-cols-3 gap-2"}>
      <div className={"col-span-1"}>
        <CardsWrap />
      </div>
      <div className={"col-span-1"}>
        <CardsWrap />
      </div>
      <div className={"col-span-1"}>
        <CardsWrap />
      </div>
    </div>
  );
};
export default function Course() {
  const [account, setAccount] = useState("");
  const [stCourses, setStCourses] = useState([]);

  const fetchAccount = async () => {
    const account = await window.ethereum.request({ method: "eth_accounts" });
    const coursesItem = JSON.parse(
      localStorage.getItem("courses") || JSON.stringify({})
    );
    let list = [];
    coursesItem[account[0]].forEach((itemm) => {
      if (courses.find((item) => item.slug === itemm.courseId)) {
        list.push(courses.find((item) => item.slug === itemm.courseId));
      }
    });
    setStCourses(list);
    setAccount(account[0]);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div className={"grid grid-cols-12 gap-4 p-16"}>
      <div className={"col-span-10"}>
        <b>Courses</b>
        <div className={"grid grid-cols-4 gap-4"}>
          {courses.map((item, key) => (
            <div className={"col-span-1"}>
              <CourseCard key={key} item={item} />
            </div>
          ))}
        </div>
      </div>
      <div className={"col-span-2 flex flex-col gap-2"}>
        <div className={"flex items-center justify-between"}>
          <Link href="/profile">
            <Avatar
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e2b28077-02b5-4e0f-8303-37e2672ea874/d5a1hdb-d15d5151-5a7b-4407-9eaa-99aa77863802.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UyYjI4MDc3LTAyYjUtNGUwZi04MzAzLTM3ZTI2NzJlYTg3NFwvZDVhMWhkYi1kMTVkNTE1MS01YTdiLTQ0MDctOWVhYS05OWFhNzc4NjM4MDIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ITLY1myWdL4iAy1wu4qYRLCGPOEbVs4rxrlXt5uR3zg"
              className="w-20 h-20 text-large"
            />
          </Link>
        </div>

        <Progress aria-label="Loading..." value={60} className="max-w-md" />
        <b>Student</b>
      </div>
    </div>
  );
}
