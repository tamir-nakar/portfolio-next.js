import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  images: string[]; // Define the type of the `images` prop
}

const Carousel: React.FC<CarouselProps> = ({ images = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%' }} />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
