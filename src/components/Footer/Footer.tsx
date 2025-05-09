import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-10 rounded-lg my-5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 grid-cols-1 gap-8">
        <div className="space-y-3">
          <h5 className="font-bold text-lg">Customer Support</h5>
          <ul className="text-sm flex flex-col space-y-3">
            <Link to="/">Contact Us</Link>
            <Link to="/">FAQs</Link>
            <Link to="/">Return PoLink cy</Link>
            <Link to="/">Shipping Information</Link>
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-bold text-lg">Company Information</h5>
          <ul className="text-sm flex flex-col space-y-3">
            <Link to="/">About Us</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Privacy PoLink cy</Link>
            <Link to="/">Terms and Conditions</Link>
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-bold text-lg">Explore</h5>
          <ul className="text-sm flex flex-col space-y-3">
            <Link to="/">Motor Bikes</Link>
            <Link to="/">Accessories</Link>
            <Link to="/">New Arrivals</Link>
            <Link to="/">Best sellers</Link>
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-bold text-lg">Stay Connected</h5>
          <ul className="text-sm flex flex-col space-y-3">
            <Link to="/">Newsletter signup</Link>
            <Link to="/">Blog</Link>
            <Link to="/">Community Event</Link>
          </ul>
        </div>
      </div>
      <div className=" mt-8 py-6 text-center text-sm">
        <p>HAVE GOOD Bike TODAY</p>
        <p>Ride with passion, live with freedom.</p>

        <div className="flex justify-center space-x-4 mt-4"></div>
        <p className="text-gray-400 mt-4">&copy;{new Date().getFullYear()} </p>
      </div>
    </footer>
  );
};

export default Footer;
