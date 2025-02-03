import { Collapse, CollapseProps } from "antd";
import Footer from "../components/Footer/Footer";
import TestimonialComponent from "../components/Testimonial/TestimonialComponent";

const AboutUs = () => {
  const introduction =
    "Welcome to SpeedRide Bikes, your one-stop online shop for high-quality bicycles and accessories. Founded in 2020, our mission is to make cycling more accessible and enjoyable for everyone. Whether you're a professional rider or just love casual biking, we are here to provide top-quality bikes, expert advice, and outstanding customer service.";
  const story =
    "Our story began in 2020 when our founder, John Doe, decided to turn his passion for cycling into a business. With years of experience in the industry, John saw an opportunity to create a platform that offers a wide range of bicycles and accessories at competitive prices. Today, SpeedRide Bikes is a trusted name in the cycling community, known for its commitment to quality, innovation, and customer satisfaction.";
  const services = [
    {
      title: "Bike Sales",
      description:
        "We offer a wide selection of bicycles, including road bikes, mountain bikes, hybrid bikes, and more. Our bikes are sourced from top brands and are built to last.",
    },
    {
      title: "Accessories",
      description:
        "In addition to bikes, we also carry a range of accessories such as helmets, locks, lights, and more. Our accessories are designed to enhance your cycling experience and keep you safe on the road.",
    },
    {
      title: "Repairs & Maintenance",
      description:
        "Our team of expert technicians is here to help you with all your repair and maintenance needs. Whether you need a tune-up, a flat tire fixed, or a complete overhaul, we've got you covered.",
    },
  ];

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <p className="text-white font-bold">Introduction & Mission Statement</p>
      ),
      children: (
        <p className="bg-[#001529e3] p-2 rounded-lg text-white">
          {introduction}
        </p>
      ),
    },
    {
      key: "2",
      label: <p className="text-white font-bold">Our Story</p>,
      children: (
        <p className="bg-[#001529e3] p-2 rounded-lg text-white">{story}</p>
      ),
    },
    {
      key: "3",
      label: <p className="text-white font-bold">Products & Services</p>,
      children: (
        <p className="bg-[#001529e3] p-2 rounded-lg text-white">
          {services.map((service) => {
            return (
              <ul>
                <li className="my-1">
                  <span className="font-bold text-xl">{service.title}</span> -{" "}
                  {service.description}
                </li>
              </ul>
            );
          })}
        </p>
      ),
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 items-center">
        <div>
          <Collapse
            className="bg-[#001529] text-white"
            accordion
            items={items}
          />
        </div>
        <div>
          <h3 className="font-bold text-3xl">Our Products and Services</h3>
          <div>
            <p>
              <span className="font-bold text-xl">Mountain Bikes: </span>
              <span>Built for rugged terrains and adventure trails.</span>
            </p>
            <p>
              <span className="font-bold text-xl">Road Bikes: </span>
              <span>Lightweight and fast for smooth pavement rides.</span>
            </p>
            <p>
              <span className="font-bold text-xl"> Electric Bikes: </span>
              <span>Eco-friendly and effortless commuting solutions.</span>
            </p>
            <p>
              <span className="font-bold text-xl">Accessories & Gear: </span>
              <span>
                {" "}
                Helmets, gloves, lights, and more to enhance your riding
                experience.
              </span>
            </p>
          </div>
        </div>
      </div>
      <TestimonialComponent />
      <Footer />
    </>
  );
};

export default AboutUs;
