import EmblaCarousel from "../../shares/CarouselCustom/CarouselCustom";
import CourseCard from "../../shares/CourseCard";
import {Avatar, Image, Progress} from "@nextui-org/react";
import {Button} from "@nextui-org/button";

const CardsWrap=(props)=>{
  return <div className={'grid grid-cols-3 gap-2'}>
    <div className={'col-span-1'}>
      <CardsWrap/>
    </div>
    <div className={'col-span-1'}>
      <CardsWrap/>
    </div>
    <div className={'col-span-1'}>
      <CardsWrap/>
    </div>
  </div>

}
function Course() {
  return <div className={'grid grid-cols-12 gap-4 p-16'}>
    <div className={'col-span-10'}>
      <b>Courses</b>
      <div className={'grid grid-cols-3 gap-8'}>
        {
          [0,1,2,3,4,5,67,8,9,10].map((item,key)=><div className={'col-span-1'}><CourseCard key={key}/></div>)
        }
      </div>

    </div>
    <div className={'col-span-2 flex flex-col gap-2'}>
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
    </div>

  </div>
}

export default Course;
