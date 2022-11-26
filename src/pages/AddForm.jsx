import React, { useState } from 'react'

import { Button, Form, Input, message } from 'antd'
import { FileAddOutlined } from '@ant-design/icons';
import axios from 'axios'

import formStyle from '../styles/addForm.module.scss'

function AddForm() {
  const [input, setInput] = useState({
    url: '',
    title: '',
    category: '',
  })
  const [messageApi, contextHolder] = message.useMessage()
  const registeredDate = () => {
    const registeredDate = new Date()
    const registerMonth = registeredDate.getMonth() + 1
    const registerDate = registeredDate.getDate()
    const registerYear = registeredDate.getFullYear()
    const formattedDate = `${registerMonth}/${registerDate}/${registerYear}`
    return formattedDate
  }

  const addBookmark = () => {
    const getDate = registeredDate()
    try {
      axios.post('http://localhost:3100/bookmarks', {
        bookmark: {
          url: input.url,
          title: input.title,
          category: input.category,
          cover: 'rgb(252, 161, 100)',
          date: getDate,
        },
      })
      setInput({
        url: '',
        title: '',
        category: '',
      })  
      //Success alart
      messageApi.open({
        type: 'success',
        content: 'Successfully added.',
      })     
    } catch (error) {
      //Error alart
      messageApi.open({
        type: 'error',
        content: 'Something wrong.',
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })

  }

  return (
    <>
      {contextHolder}
      <div className={formStyle['AddForm-body']}>
        <h2 className={formStyle['AddForm-h2']}>New Bookmark</h2>
        <Form>
          <Form.Item label="Url" labelCol={{ span: 5 }} labelAlign="left">
            <Input
              placeholder="Url"
              name="url"
              value={input.url}
              onChange={handleChange}
              className={formStyle['AddForm-input']}
            />
          </Form.Item>
          <Form.Item label="Title" labelCol={{ span: 5 }} labelAlign="left">
            <Input
              placeholder="Title"
              name="title"
              value={input.title}
              onChange={handleChange}
              className={formStyle['AddForm-input']}
            />
          </Form.Item>
          <Form.Item label="Category" labelCol={{ span: 5 }} labelAlign="left">
            <Input
              placeholder="Category"
              name="category"
              value={input.category}
              onChange={handleChange}
              className={formStyle['AddForm-input']}
            />
          </Form.Item>
          <Form.Item className={formStyle['AddForm-addBtn']}>
            <Button
              type="primary"
              onClick={addBookmark}
              shape="round"
              size="large"
              icon={<FileAddOutlined />}
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default AddForm
