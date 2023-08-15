import React, { useState } from 'react';
import {
  Button,
  Card,
  Form,
  Input
} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


const FormSubmission = () => {

  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { TextArea } = Input;
  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };

  const onFinish = (values) => {
    console.log(values);
    axios.post('https://o0yfh0sg1f.execute-api.us-east-1.amazonaws.com/production/sendRecipes', values)
    .then((response) => {
      console.log(response);
      navigate('/')
    })
    .catch((error) => {
      console.log(error);
    });
};

  return (
    <Form
      {...formItemLayout}
      name="recipe"
      className="Recipe-form"
      initialValues={{
        remember: true,
      }}
      style={{ maxWidth: 600, margin: "20px auto" }}
      onFinish={onFinish}
    >
      <Card
        bordered={false} 
        style={{ width: 600 }}
        title="Recipe Submission"
      >
          <Form.Item 
                  name="firstName" 
                  label="First Name"
                  rules={[
                      {
                          required: true,
                          message: 'Please input your First Name!',
                      },
                  ]}>
            <Input />
          </Form.Item>
          <Form.Item 
                    name="lastName" 
                    label="Last Name"
                    rules={[
                      {
                          required: true,
                          message: 'Please input your First Name!',
                      },
                  ]}>
            <Input />
          </Form.Item>
          <Form.Item 
                  name="email" 
                  label="Email"
                  rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}>
            <Input />
          </Form.Item>

          <Form.Item
                    name="recipeName" 
                    label="Recipe Name"
                    rules={[
                      {
                          required: true,
                          message: 'Please input your First Name!',
                      },
                  ]}>
            <Input />
          </Form.Item>

          <Form.Item
                    name="recipeDescription" 
                    label="Recipe Description"
                    rules={[
                      {
                          required: true,
                          message: 'Please input your First Name!',
                      },
                  ]}>
            <TextArea
                showCount
                maxLength={2000}
                style={{
                  height: 120,
                  marginBottom: 24,
                }}
                onChange={onChange}
                placeholder="can resize"
              />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
      </Card>
    </Form>
  );
};
export default FormSubmission;