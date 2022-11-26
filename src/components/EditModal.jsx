import React, { useEffect, useState } from 'react'

import { Modal, Button, Form, Input } from 'antd'

import mordalStyle from '../styles/modal.module.scss'

function EditModal({
  openState,
  modalEditLoadingState,
  handleOk,
  handleCancel,
  modalData,
  putFn,
}) {
  const [input, setInput] = useState({
    title: null,
    category: null
  })

  useEffect(() => {
  }, [])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setInput(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  } 

  return (
    <>
      <Modal
        open={openState}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={modalEditLoadingState}
            onClick={() => putFn(modalData.id, input)}
          >
            Confirm
          </Button>,
        ]}
      >
        <Form className={mordalStyle['Modal-form']}>
          <Form.Item label="Title" labelCol={{ span: 6 }} labelAlign="left">
            <Input name="title" value={input.title} onChange={handleOnChange} placeholder={modalData.bookmark.title}/>
          </Form.Item>
          <Form.Item label="Category" labelCol={{ span: 6 }} labelAlign="left">
            <Input name="category" value={input.category} onChange={handleOnChange} placeholder={modalData.bookmark.category} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditModal
