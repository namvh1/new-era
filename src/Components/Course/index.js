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

  return (<div>
    <b>Courses</b>
        <div className={"grid grid-cols-4 gap-4 p-16"}>
          {courses.map((item, key) => (
              <div className={"col-span-1"}>
                <CourseCard key={key} item={item} />
              </div>
          ))}
        </div>
  </div>

  );
}
