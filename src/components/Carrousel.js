import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../css/styles-component-carouse.css";
import Slider from "./slider1.jpg";
export default function Carrousel() {
  return (
    <Carousel autoPlay showThumbs={false}>
      <div>
        <img alt="" src={Slider} />
      </div>
    </Carousel>
  );
}
