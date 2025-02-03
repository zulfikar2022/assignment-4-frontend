import { Divider } from "antd";
import { Testimonial } from "../../types";

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Doe",
    position: "CEO at DreamCo",
    testimonial:
      "This service has helped our company to achieve incredible results. The professionalism and attention to detail are unmatched.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Marketing Director at InnovateStart",
    testimonial:
      "Our partnership has been invaluable. Their expertise and innovative approach have made a significant difference.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 3,
    name: "John Davis",
    position: "Product Manager at TechSolutions",
    testimonial:
      "Absolutely transformative! The solutions provided have taken our products to the next level.",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
  },
];

const TestimonialComponent = () => {
  return (
    <div className="bg-opacity-1 bg-white p-8">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">
          <Divider> Discover Stories from Satisfied Customers</Divider>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="bg-gray-100 p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  className="w-16 h-16 rounded-full border-2 border-gray-300"
                  src={testi.avatar}
                  alt={testi.name}
                />
                <div>
                  <p className="text-lg font-semibold">{testi.name}</p>
                  <p className="text-sm text-gray-600">{testi.position}</p>
                </div>
              </div>
              <p className="text-gray-600">{testi.testimonial}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-[#001529]  duration-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialComponent;
