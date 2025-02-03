import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetSpecificProductQuery } from "../redux/endpoints/products.endpoints";
import { ThreeDot } from "react-loading-indicators";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import Footer from "../components/Footer/Footer";

const Product = () => {
  const location = useLocation();
  const { productId } = useParams<{ productId: string }>();
  const { data, isLoading, isFetching, isError } =
    useGetSpecificProductQuery(productId);
  const navigate = useNavigate();

  const product = data?.data;

  if (isLoading || isFetching)
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  if (isError) return <div>Error loading product</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center md:items-start my-5 ">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <img
            style={{ height: "400px", width: "100%", objectFit: "cover" }}
            src={product.imageUrl}
            alt={`${product.name}-${product.brand}`}
            className="max-w-full h-auto rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-2xl">
            <span className="font-bold text-lg">Brand:</span> {product.brand}
          </p>
          <p className="text-2xl">
            <span className="font-bold text-lg">Price:</span> ${product.price}
          </p>
          <p className="text-2xl">
            <span className="font-bold text-lg">Stock:</span> {product.stock}{" "}
            {product.stock <= 0 && " (Not Available)"}
          </p>
          <button
            className="px-5 py-2 border rounded-lg bg-[#001529] text-white mt-4"
            onClick={() => {
              const token = localStorage.getItem("bikes_token");
              if (!token) {
                navigate("/login", {
                  state: { from: location },
                  replace: true,
                });
                return;
              }
              const decodedToken: { role: string } = jwtDecode(token);
              if (!decodedToken) {
                navigate("/login", {
                  state: { from: location },
                  replace: true,
                });
              }
              const role = decodedToken.role;
              if (role === "admin") {
                Swal.fire({
                  title: "Opps!! Admin Cannot Buy Products",
                  confirmButtonColor: "#001529",
                  confirmButtonText: "OK",
                });
              }
              if (role === "customer") {
                navigate(`/checkout/${productId}`);
              }
            }}
          >
            Buy Now
          </button>
          {/* <button
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Buy Product
        </button> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
