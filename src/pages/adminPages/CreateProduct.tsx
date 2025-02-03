import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, InputNumber, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";
import { useCreateProductMutation } from "../../redux/endpoints/products.endpoints";
import { ThreeDot } from "react-loading-indicators";

type FieldType = {
  image?: RcFile;
  name: string;
  brand: string;
  price: number;
  productModel: string;
  stock: number;
};

const CreateProduct: React.FC = () => {
  const [form] = Form.useForm();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
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

      setIsUploadingImage(true); // Start loader

      fetch(`https://api.cloudinary.com/v1_1/dq7jdy5xy/image/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(async (data) => {
          setIsUploadingImage(false); // Stop loader
          if (data.secure_url) {
            const productWithImage = { ...rest, imageUrl: data.secure_url };
            try {
              await createProduct(productWithImage);
              message.success("Product created successfully!");
              form.resetFields();
            } catch (error) {
              console.error("Error creating product:", error);
              message.error("Failed to create product!");
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
    }
  };

  if (isLoading || isUploadingImage) {
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
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className="w-1/2"
      >
        <Form.Item
          label="Image"
          name="image"
          valuePropName="file"
          rules={[
            { required: true, message: "Please upload the product image!" },
          ]}
        >
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
            showUploadList={{ showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />} disabled={isUploadingImage}>
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input disabled={isUploadingImage} />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please input the brand!" }]}
        >
          <Input disabled={isUploadingImage} />
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
            disabled={isUploadingImage}
          />
        </Form.Item>

        <Form.Item
          label="Product Model"
          name="productModel"
          rules={[
            { required: true, message: "Please input the product model!" },
          ]}
        >
          <Input disabled={isUploadingImage} />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          rules={[
            { required: true, message: "Please input the stock quantity!" },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            disabled={isUploadingImage}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="w-1/2 lg:w-full bg-[#001529]"
            disabled={isUploadingImage}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
