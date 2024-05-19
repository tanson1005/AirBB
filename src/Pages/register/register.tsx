import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Col, Row } from "antd";
import * as S from "./style";
import Logo from "../../assets/icons/logo";
import { useState } from "react";
import { useFormik } from "formik";

const validate = (values) => {
  type A = typeof values;
  type B = keyof A;

  const errors: Record<B,string> = {};
  if (values.email.trim().length === 0) {
    errors.email = "Email Không Được Bỏ Trống";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (values.phone.trim().length === 0) {
    errors.phone = "Phone Không Được Bỏ Trống";
  } else if (!(values.phone.length <= 10 && values.phone.length >= 5)) {
    errors.phone = "Phone Không đúng định dạng";
  }

  if (!(values.name.length <= 50 && values.name.length >= 10)) {
    errors.name = "Tên Không Được Bỏ Trống";
  }

  return errors;

}

import * as Y from "yup";
import { useNavigate } from "react-router-dom";
const validationSchema = Y.object({
  email: Y.string().email("Email không hợp lệ.").required(),
  name: Y.string()
    .min(10, "Không được phép nhỏ hơn 10")
    .max(30, "Không được phép lớn hơn 30")
    .required(),
  passWord: Y.string().min(6).max(50).required(),
  confirmPassWord: Y.string().oneOf([Y.ref("passWord"), null]),
});


type RegisterProps = {
  setModal1Open: any,
  setModal2Open: any,
}

function Register(props: RegisterProps) {
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

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      email:"",
      passWord:"",
      confirmPassword:"",
      name:"",
      phone:"",
    },
    validationSchema,

    onSubmit:(values) =>{
      const payload ={
        email: values.email,
        password: values.passWord,
        
      }
    }
  })

  return (
    <S.Div>
      <Row>
        <S.ColLeft span={12}>
          <S.DivContent>
          <p style={{
            fontSize: '3rem',
            fontWeight:'700'
          }}>
            Glad to see you!
            </p>


          <S.Logo>
          <Logo/>
          </S.Logo>

          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, minima!</p>
          </S.DivContent>
         </S.ColLeft>

         
          

        <S.ColRight span={12}>
          <div style={{textAlign:'center', marginBottom:'1rem'}}>
          <p style={{
            fontSize: '3rem',
            fontWeight:'700'
          }}>Hello, friend!</p>

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
                { required: true, message: "Please input your email!" },
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
              // label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Nhập lại password" />
            </Form.Item>

            
            <Form.Item<FieldType>
              // label="Password"
              name="name"
              rules={[
                { required: true, message: "Please input your name" },
              ]}
            >
              <Input placeholder="Họ tên" />
            </Form.Item>

            
            <Form.Item<FieldType>
              // label="Password"
              name="sđt"
              rules={[
                { required: true, message: "Please input your phone number" },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 4, span: 16 }} style={{textAlign:'center', marginBottom:'1rem'}}>
              <S.ButtonIn htmlType="submit">
                CREATE ACCOUNT
              </S.ButtonIn>            
            </Form.Item>
            <div
              style={{
                display:'flex',
                justifyContent:'center'}}>
              <p>Already have an account?</p>
              <a onClick={() => {
                props.setModal1Open(true)
                props.setModal2Open(false)}}
              >Sign In</a>

              </div>
          </S.FormIn>
        </S.ColRight>
      </Row>
    </S.Div>
  );
}

export default Register;
