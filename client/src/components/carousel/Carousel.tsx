import { useState, useEffect } from "react";
import "./Carousel.css";

type CarouselProps = {
  items: JSX.Element[];
};

function Carousel(props: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === props.items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? props.items.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextSlide();
    }, 20000);

    return () => clearInterval(intervalId);
  }, [activeIndex]);

  return (
    <div className="carousel">
      <div
        className="inner"
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
      >
        {props.items.map((Component, index) => (
          <div key={index} className="carouselItem">
            {Component}
          </div>
        ))}
      </div>
      <div className="carouselButtons">
        <button className="buttonArrow" onClick={handlePrevSlide}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <div className="indicators">
          {props.items.map((_, index) => (
            <button
              key={index}
              className={`indicatorsButton ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <span className="material-symbols-outlined">
                radio_button_unchecked
              </span>
            </button>
          ))}
        </div>
        <button className="buttonArrow" onClick={handleNextSlide}>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
