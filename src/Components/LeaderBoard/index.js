import {Tab, Tabs, Chip, Avatar, Badge} from "@nextui-org/react";
import {icon} from "../../icon";

const RowRanking=()=>{
    return <div className={'flex items-center justify-between py-4'}>
        <div className={'flex items-center gap-4'}>
            <Chip>312412</Chip>
            <Badge content="5" color="warning" variant="shadow">
                <Avatar
                    radius="md"
                    src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                />
            </Badge>
            <div>0x7FF85593935195D35FcDE09ac1F272E2CaCaf9fd</div>
        </div>
        <div className={'flex items-center gap-2'}>
            <div className={'flex items-center gap-2'}>
                {icon.fire}
                <b>123</b>
            </div>
        </div>

    </div>
}
export default function LeaderBoard(){
    return <div className={'text-black flex flex-col gap-2 p-16'}>
        <b>
            Leader Board
        </b>
        <p>Compete with friends to top the charts</p>
        <Tabs  color={'primary'} aria-label="Tabs colors" radius="full">
            <Tab key="photos" title="All time"/>
            <Tab key="music" title="Last 30 days"/>
            <Tab key="videos" title="Last 7 days"/>
            <Tab key="videos" title="Last 24 hour"/>

        </Tabs>
        <div>
            <b>Your Ranking</b>
            <RowRanking/>
        </div>
        <div>
            <b>Top users in the last 24 hours</b>
            <RowRanking/>
            <RowRanking/>
            <RowRanking/>
            <RowRanking/>
            <RowRanking/>

        </div>

    </div>
}