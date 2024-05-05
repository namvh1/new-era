import { Avatar, Badge, Chip, Tab, Tabs } from "@nextui-org/react";
import { icon } from "../../icon";

const RowRanking = ({ rank, point }) => {
  return (
    <div className={"flex items-center justify-between py-4"}>
      <div className={"flex items-center gap-4"}>
        <Chip>{rank}</Chip>
        <Badge content={point / 100} color="warning" variant="shadow">
          <Avatar
            radius="md"
            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          />
        </Badge>
        <div>{rank === 1 ? "You" : "0xc5bA...3f92"}</div>
      </div>
      <div className={"flex items-center gap-2"}>
        <div className={"flex items-center gap-2"}>
          {icon.fire}
          <b>{point}</b>
        </div>
      </div>
    </div>
  );
};
export default function LeaderBoard() {
  return (
    <div className={"text-black flex flex-col gap-2 p-16"}>
      <b>Leaderboard</b>
      <p>Compete with friends to top the charts</p>
      <Tabs color={"primary"} aria-label="Tabs colors" radius="full">
        <Tab key="photos" title="All time" />
        <Tab key="music" title="Last 30 days" />
        <Tab key="videos" title="Last 7 days" />
        <Tab key="videos" title="Last 24 hour" />
      </Tabs>
      <div>
        <b>Your Ranking</b>
        <RowRanking rank={1} point={70000} />
      </div>
      <div>
        <b>Top users in the last 24 hours</b>
        {Array(50)
          .fill("")
          .map((it, index) => (
            <RowRanking
              key={index}
              rank={index + 2}
              point={50000 - index * 500}
            />
          ))}
      </div>
    </div>
  );
}
