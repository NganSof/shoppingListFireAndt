import { FC, useEffect, useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import { firestore } from "../firebase";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space } from "antd";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = useState(false);
  const values: any = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

export const NewProd: FC = () => {
  const [form] = Form.useForm();
  const productNew = collection(firestore, "product");
  const onFinish = (values: any) => {
    let { images } = values;
    if (images === undefined || images === null) {
      images =
        "https://img.freepik.com/free-photo/still-life-sunflower-bouquet_23-2150490854.jpg?t=st=1691055363~exp=1691058963~hmac=bc8ca0160123712e0efe7ec1c50412060150ef4b7bc21f46518dce8043cff13b&w=1060";
    }
    let clIm = images;
    try {
      addDoc(productNew, { ...values, images: clIm });
    } catch (error) {
      // console.log("error", error);
    }
  };

  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, min: 5, max: 20 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="type"
        label="Type"
        rules={[{ required: true, min: 5, max: 20 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, min: 15, max: 100 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="images" label="Image">
        <Input />
      </Form.Item>
      <Form.Item>
        <Space>
          <SubmitButton form={form} />
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
