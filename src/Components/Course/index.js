import EmblaCarousel from "../../shares/CarouselCustom/CarouselCustom";

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
  return <div className={'grid grid-cols-12 gap-4'}>
    <div className={'col-span-10'}>
      <b>Featured</b>
    {/*<EmblaCarousel slides={[<CardsWrap/>,<CardsWrap/>]} options={{}}/>*/}
    </div>
    <div className={'col-span-2'}></div>

  </div>
}

export default Course;
