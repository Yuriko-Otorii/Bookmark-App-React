import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Form, Input } from 'antd'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore";

import { auth, db } from '../firebase';
import signUpStyle from '../styles/signUp.module.scss'

function SignUp() {
  const navigate = useNavigate()

  const [input, setInput] = useState({
    username: null,
    email: null,
    password: null,
    confirm: null,
  })

  const [isdisabled, setIsDisabled] = useState(false)

  useEffect(() => {
  }, [])

  const handleOnChange = ((e) => {
    const {name, value} = e.target
    setInput(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  })

  const handleSubmit = () => {
    // e.preventDefault()
    signup(input.username, input.email, input.password)
    navigate('/login')
    setInput({
      username: null,
      email: null,
      password: null,
      confirm: null,
    })
  }

  function signup(username, email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        if(user) {
          const uid = user.uid
          const userInitialData = {
            email: email,
            uid: uid,
            username: username
          }

        const collectionPass = collection(db, 'users')
        addDoc(collectionPass, userInitialData)
        }
      })
  }

  return (
    <>
      <div className={signUpStyle['Signup-body']}>
        <h2 className={signUpStyle['Signup-title']}>Sign up</h2>
        <Form onFinish={handleSubmit} className={signUpStyle['Signup-form']}>
          <Form.Item
            name="username"
            label="User name"
            labelCol={{ span: 9 }}
            labelAlign="left"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              placeholder="Username"
              name="username"
              value={input.username}
              onChange={handleOnChange}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            labelCol={{ span: 9 }}
            labelAlign="left"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input
              placeholder="E-mail"
              name="email"
              value={input.email}
              onChange={handleOnChange}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            labelCol={{ span: 9 }}
            labelAlign="left"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleOnChange}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            labelCol={{ span: 9 }}
            labelAlign="left"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  )
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Password"
              name="confirm"
              value={input.confirm}
              onChange={handleOnChange}
            />
          </Form.Item>
          <Form.Item className={signUpStyle['Signup-btn']}>
            <Button type="primary" htmlType="submit" size="large" disabled={isdisabled && setIsDisabled(true)}>
              Register
            </Button>
          </Form.Item>
          <Form.Item className={signUpStyle['Signup-login-link']}>
            <Link to={"/login"}>Login from here!</Link>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default SignUp


