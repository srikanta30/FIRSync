import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

const LoginForm = ({ onFinish }) => {
  return (
    <Form name="signup_form" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Log In
      </Button>
    </Form>
  );
};

const SignupForm = ({ onFinish }) => {
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Enter Password"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign Up
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(false);

  const toggleLoginForm = () => {
    setIsLogin(true);
  };

  const toggleSignupForm = () => {
    setIsLogin(false);
  };

  const handleFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <div>
        <Button
          className="btns"
          variant="dark"
          size="lg"
          onClick={toggleSignupForm}
        >
          "Sign Up"
        </Button>{" "}
        <Button
          className="btns"
          variant="outline-light"
          size="lg"
          onClick={toggleLoginForm}
        >
          "Log In" 
        </Button>{" "}
      </div>
      {isLogin ? (
        <LoginForm onFinish={handleFinish} />
      ) : (
        <SignupForm onFinish={handleFinish} />
      )}
    </>
  );
}
