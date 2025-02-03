const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-10 rounded-lg my-5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 grid-cols-1 gap-8">
        <div className="space-y-3">
          <h5 className="font-bold text-lg">Customer Support</h5>
          <ul className="text-sm">
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Return Policy</li>
            <li>Shipping Information</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-bold text-lg">Company Information</h5>
          <ul className="text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-bold text-lg">Explore</h5>
          <ul className="text-sm">
            <li>Motor Bikes</li>
            <li>Accessories</li>
            <li>New Arrivals</li>
            <li>Best sellers</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-bold text-lg">Stay Connected</h5>
          <ul className="text-sm">
            <li>Newsletter signup</li>
            <li>Blog</li>
            <li>Community Event</li>
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
