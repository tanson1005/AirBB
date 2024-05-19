import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { Col, Row } from "antd";
import * as S from "./style";
import Logo from "../../assets/icons/logo";
import type { MenuProps } from "antd";
import Register from "../register/register";
import { useFormik } from "formik";
import * as Y from "yup";

type LoginProps = {
  setModal1Open: any,
  setModal2Open: any,
}
function Login(props:LoginProps) {
  console.log(props)
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
 
  
  return (
    <S.Div >
      <Row>
        <S.ColLeft span={12}>
          <S.DivContent>
            <p
              style={{
                fontSize: "3rem",
                fontWeight: "700",
              }}
            >
              Welcome to
            </p>

            <S.Logo>
              <Logo />
            </S.Logo>

            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde,
              minima!
            </p>
          </S.DivContent>
        </S.ColLeft>

        <S.ColRight span={12}>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <p
              style={{
                fontSize: "3rem",
                fontWeight: "700",
              }}
            >
              Hello!
            </p>
            <p>Sign into your account</p>
          </div>

          <S.FormIn
            name="basic"
            // labelCol={{ span: 10 }}
            // wrapperCol={{ span: 10 }}
            // style={{ maxWidth: 500 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              // label="Email"
              name="Email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item<FieldType>
              // label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 0, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{ offset: 4, span: 16 }}
              style={{ textAlign: "center", marginBottom: "1rem" }}
            >
              <S.ButtonIn htmlType="submit">SIGN IN</S.ButtonIn>
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p>Don't have an account?</p>
              <a onClick={() => {
                props.setModal1Open(false)
                props.setModal2Open(true)
              }}>Create</a>
             
            </div>
          </S.FormIn>
        </S.ColRight>
      </Row>
    </S.Div>
  );
}

export default Login;
