import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import MittenHero from "./heroImageOne";
import YarnHero from "./heroImageTwo";
import MiscHero from "./heroImageThree";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <YarnHero text="First slide" />
        <Carousel.Caption className="carousel-header carousel-yarn-text">
          <h3>Unique materials for a unique you</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <MittenHero text="Second slide" />
        <Carousel.Caption className="carousel-header carousel-mitten-text">
          <h3>Warm up with these styles</h3>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <MiscHero text="Third slide" />
        <Carousel.Caption className="carousel-header carousel-stocking-text">
          <h3>Begin new traditions</h3>
          {/* <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
