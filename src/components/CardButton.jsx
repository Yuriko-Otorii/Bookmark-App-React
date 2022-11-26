import React from 'react'

import { Button, Popconfirm } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'


function CardButton({showModalFn, deleteFn, modalDeleteLoadingState, eachItem}) {
  return (
    <>
        <div>
            <Button type="link" onClick={() => showModalFn(eachItem)} >Edit</Button>
            <Popconfirm
                key="popConfirm"
                title="Are you sure to delete?"
                placement="topRight"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={() => deleteFn(eachItem.id)}    
            >
                <Button type="text" loading={modalDeleteLoadingState} danger>Delete</Button>
            </Popconfirm>
        </div>
    </>
  )
}

export default CardButton