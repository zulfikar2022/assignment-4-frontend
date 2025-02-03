import { Carousel } from "antd";
import React from "react";
import bike1 from "../../assets/reb-1.jpg";
import bike2 from "../../assets/reb-2.jpg";
import bike3 from "../../assets/reb-3.jpg";
import bike4 from "../../assets/reb-4.webp";

const Banner = () => {
  const contentStyle: React.CSSProperties = {
    height: "auto",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#001529",
  };

  return (
    <Carousel autoplay>
      <div className="rounded-lg">
        <div
          style={contentStyle}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-6"
        >
          <div>
            <h2 className="text-2xl sm:text-4xl mt-4 sm:mt-20 p-5 font-bold">
              Discover the New Adventure Bikes
            </h2>
            <p className="mt-4 text-base sm:text-lg p-3">
              Experience the thrill of the ride with our latest collection of
              royal enfield bikes. Built for performance and comfort, these
              bikes are perfect for any terrain.
            </p>
          </div>
          <div>
            <img
              src={bike1}
              alt="Bike 1"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg">
        <div
          style={contentStyle}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-6"
        >
          <div>
            <h2 className="text-2xl sm:text-4xl mt-4 sm:mt-20 p-5 font-bold">
              Unleash Your Spirit of Adventure
            </h2>
            <p className="mt-4 text-base sm:text-lg p-3">
              Experience the ultimate freedom with the latest Royal Enfield
              bike. Designed with cutting-edge technology and a timeless
              aesthetic, this bike offers unmatched performance and style.
              Whether you're cruising through city streets or exploring rugged
              trails, the Royal Enfield bike ensures a smooth and powerful ride.
              Its advanced features and robust build make it a reliable
              companion for all your adventures.
            </p>
          </div>
          <div>
            <img
              src={bike2}
              alt="Bike 2"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg">
        <div
          style={contentStyle}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-6"
        >
          <div>
            <h2 className="text-2xl sm:text-4xl mt-4 sm:mt-20 p-5 font-bold">
              Feel the Power of the Open Road
            </h2>
            <p className="mt-4 text-base sm:text-lg p-3">
              Feel the power and elegance of Royal Enfield bikes as you conquer
              the open road. With a legacy of excellence and a commitment to
              innovation, Royal Enfield bikes are designed to deliver an
              unparalleled riding experience. Whether you're a seasoned rider or
              a newcomer, our bikes offer the perfect blend of style,
              performance, and reliability.
            </p>
          </div>
          <div>
            <img
              src={bike3}
              alt="Bike 3"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg">
        <div
          style={contentStyle}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-6"
        >
          <div>
            <h2 className="text-2xl sm:text-4xl mt-4 sm:mt-20 p-5 font-bold">
              Embrace the Legacy of Royal Enfield
            </h2>
            <p className="mt-4 text-base sm:text-lg p-3">
              Royal Enfield has a rich heritage that dates back to 1901, making
              it one of the oldest motorcycle brands in the world. Known for its
              classic design and robust engineering, Royal Enfield bikes have a
              timeless appeal that transcends generations.
            </p>
          </div>
          <div>
            <img
              src={bike4}
              alt="Bike 4"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
