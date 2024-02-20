import React, { useEffect, useRef, useState } from "react";
import "./slider.css";

const Slider = ({ children, isVertical }) => {
  const overFlow = isVertical ? { overflowY: "auto" } : { overflowX: "auto" };
  const sliderRef = useRef(null);
  const [slideDimension, setSlideDimension] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        const slide = sliderRef.current.querySelector(".slide");
        if (slide) {
          setSlideDimension(isVertical ? slide.offsetHeight : slide.offsetWidth);
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isVertical]);

  const scrollToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        top: isVertical ? slideDimension : 0,
        left: isVertical ? 0 : slideDimension,
        behavior: "smooth",
      });
    }
  };

  const scrollToPrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        top: isVertical ? -slideDimension : 0,
        left: isVertical ? 0 : -slideDimension,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="slider"
      style={{
        flexDirection: isVertical ? "column" : "row",
      }}
    >
      <button className="prev-btn" onClick={scrollToPrevious}>
        Previous
      </button>
      <div
        className="slider-container"
        ref={sliderRef}
        style={{
          flexDirection: isVertical ? "column" : "row",
          width: isVertical ? "auto" : "90%",
          height: isVertical ? "600px" : "auto",
          ...overFlow,
        }}
      >
        {React.Children.map(children, (child) => (
          <div className="slide">{child}</div>
        ))}
      </div>
      <button className="next-btn" onClick={scrollToNext}>
        Next
      </button>
    </div>
  );
};

export default Slider;
