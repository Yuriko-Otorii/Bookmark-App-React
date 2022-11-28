import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';

import loginStyle from '../styles/login.module.scss'
import { auth } from '../firebase';
import { useAuthContext } from '../AuthContext';


function LogIn() {
  const navigate = useNavigate()
  const { user } = useAuthContext();
  const [isLogin, setIsLogin] = useState(null);
  const [input, setInput] = useState({
    email: null,
    password: null
  })

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setInput(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleOnSubmit = () => {
    signInWithEmailAndPassword(auth, input.email, input.password)
    navigate('/')
  };

  // if(!isLogin){
  //   return <Spin size="large" className={loginStyle["Login-spin"]} />
  // }else{}
    return (
      <>
        <div className={loginStyle["Login-body"]}>
          <h2 className={loginStyle['Login-title']}>Login</h2>
          <Form
            name="normal_login"
            className={loginStyle['Login-form']}
            initialValues={{ remember: true }}
            onFinish={handleOnSubmit}
          >
            <Form.Item
              name="email"
              label="E-mail"
              labelCol={{ span: 7 }}
              labelAlign="left"
              rules={[{ required: true, message: 'Please input your E-mail!' }]}
            >
              <Input name="email" value={input.email} onChange={handleOnChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              labelCol={{ span: 7 }}
              labelAlign="left"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                name="password"
                value={input.password}
                onChange={handleOnChange}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
  
            <Form.Item className={loginStyle['Login-btn']}>
              <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                Log in
              </Button>
              <br />
            </Form.Item>
            <Form.Item className={loginStyle['Login-register-link']}>
              <Link to={"/signup"}>Register now from here!</Link>
            </Form.Item>
          </Form>
        </div>
      </>
    );

}

export default LogIn