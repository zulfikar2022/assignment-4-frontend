import { Divider } from "antd";
import Banner from "../components/banner/Banner";
import FeaturedProducts from "../components/featuredProducts/FeaturedProducts";
import { useNavigate } from "react-router-dom";
import TestimonialComponent from "../components/Testimonial/TestimonialComponent";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-5 mb-5">
      <Banner />
      <Divider style={{ borderColor: "#001529" }}>Our Top Products</Divider>
      <FeaturedProducts />
      <div className="flex justify-center">
        <button
          onClick={() => {
            navigate("/products");
          }}
          //bg-[#001529]  duration-300 hover:bg-blue-700 text-white font-bold
          className="bg-[#001529] mt-0 text-white font-bold  rounded-lg hover:bg-blue-700  py-2 px-4 duration-300"
        >
          Show All Products
        </button>
      </div>
      <Divider style={{ borderColor: "#001529" }}>What clients say?</Divider>
      <TestimonialComponent />
      <Footer />
    </div>
  );
};

export default Home;
