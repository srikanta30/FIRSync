import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";


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

  const LoginForm = ({ onFinish }) => {
    return (
      <Form style={{
        width: "70%"
      }} name="signup_form" onFinish={onFinish}>
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
        <Button style={{
          width: "100%"
        }} type="primary" htmlType="submit">
          Log In
        </Button>
        <div
        onClick={toggleSignupForm}
        style={{
          marginTop: "10px",
          textAlign: "center",
          textDecoration: "underline",
          color: "#4096FF",
          cursor: "pointer"
        }}>Don't have account register now!</div>
      </Form>
    );
  };

  const SignupForm = ({ onFinish }) => {
    return (
      <Form
        style={{
          width: "70%"
        }}
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
          <Button style={{
            width: "100%"
          }}
          type="primary" htmlType="submit" className="login-form-button">
            Sign Up
          </Button>
          <div
          onClick={toggleLoginForm}
          style={{
            marginTop: "10px",
            textAlign: "center",
            textDecoration: "underline",
            color: "#4096FF",
            cursor: "pointer"
          }}>Already have account login now!</div>
        </Form.Item>
      </Form>
    );
  };

  return (
    <>
      {isLogin ? (
        <LoginForm onFinish={handleFinish} />
      ) : (
        <SignupForm onFinish={handleFinish} />
      )}
    </>
  );
}
