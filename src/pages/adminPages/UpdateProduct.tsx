import { useParams } from "react-router-dom";
import {
  useGetSpecificProductQuery,
  useUpdateAProductMutation,
} from "../../redux/endpoints/products.endpoints";
import NotFound from "../../routeProtection/NotFound";
import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, InputNumber, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";
import { ThreeDot } from "react-loading-indicators";

interface DataType {
  _id: string;
  name: string;
  brand: string;
  price: number;
  productModel: string;
  stock: number;
  imageUrl: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
type FieldType = {
  image?: RcFile;
  name: string;
  brand: string;
  price: number;
  productModel: string;
  stock: number;
};
const UpdateProduct = () => {
  const { productId } = useParams();
  const [form] = Form.useForm();
  const [updateProduct, { isLoading: isProductUpdating }] =
    useUpdateAProductMutation();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const { data, isLoading, isFetching, isError } =
    useGetSpecificProductQuery(productId);

  const product: DataType = data?.data;
  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        brand: product.brand,
        price: product.price,
        productModel: product.productModel,
        stock: product.stock,
      });
    }
  }, [product, form]);

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { image, ...rest } = values;
    if (image && image.fileList[0]) {
      const file = image.fileList[0].originFileObj;
      const isImage = file.type.startsWith("image/");
      const isLt7M = file.size / 1024 / 1024 <= 7;

      if (!isImage) {
        message.error("You can only upload image files!");
        return;
      }

      if (!isLt7M) {
        message.error("Image must be smaller than 7MB!");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "assignment-4");
      formData.append("api_key", "459171858769688");

      setIsUploadingImage(true);

      fetch(`https://api.cloudinary.com/v1_1/dq7jdy5xy/image/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(async (data) => {
          setIsUploadingImage(false);
          if (data.secure_url) {
            const productWithImage = { ...rest, imageUrl: data.secure_url };
            try {
              await updateProduct({
                product: productWithImage,
                _id: productId,
              });
              message.success("Product updated successfully!");
            } catch (error) {
              console.error("Error creating product:", error);
              message.error("Failed to update product!");
            }
          } else {
            message.error("Failed to upload image to Cloudinary!");
          }
        })
        .catch((error) => {
          setIsUploadingImage(false); // Stop loader
          console.error("Error uploading image:", error);
          message.error("Failed to upload image to Cloudinary!");
        });
    } else {
      const dataToUpdate = { ...rest, imageUrl: product.imageUrl };
      try {
        await updateProduct({ product: dataToUpdate, _id: productId });
        message.success("Product updated successfully!");
      } catch (error) {
        console.error("Error creating product:", error);
        message.error("Failed to update product!");
      }
    }
  };

  if (isLoading || isUploadingImage || isProductUpdating) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="my-4 flex justify-center items-center">
      <Form
        form={form}
        name="product-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        className="w-1/2"
      >
        <Form.Item label="Image" name="image" valuePropName="file">
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
            showUploadList={{ showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please input the brand!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please input the product price!" },
            { type: "number", message: "Price must be a number!" },
          ]}
        >
          <InputNumber
            min={0}
            step={0.01}
            style={{ width: "100%" }}
            precision={2}
          />
        </Form.Item>

        <Form.Item
          label="Product Model"
          name="productModel"
          rules={[
            { required: true, message: "Please input the product model!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          rules={[
            { required: true, message: "Please input the stock quantity!" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="w-1/2 lg:w-full bg-[#001529]"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProduct;
