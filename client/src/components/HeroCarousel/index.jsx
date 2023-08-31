import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import InfantSetHero from "./heroImageOne";
import MittenHero from "./heroImageTwo";
import StockingHero from "./heroImageThree";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <InfantSetHero text="First slide" />
        <Carousel.Caption className="carousel-header carousel-yarn-text">
          <h3>Unique materials for a unique you</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <MittenHero text="Second slide" />
        <Carousel.Caption className="carousel-header carousel-mitten-text">
          <h3>Warm up with these styles</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <StockingHero text="Third slide" />
        <Carousel.Caption className="carousel-header carousel-stocking-text">
          <h3>Begin new traditions</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
