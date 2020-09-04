import React from "react";
import { Carousel } from "antd";
function ImageSlider(props) {
  return (
    <Carousel autoplay>
      {props.images.map((image, index) => (
        <div key={index}>
          <img
            src={`http://localhost:5000/${image}`}
            style={{ width: "100%", maxHeight: "150px" }}
            alt="product"
          />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageSlider;
