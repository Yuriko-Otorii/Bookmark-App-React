import React, { useState, useEffect } from 'react'

import { Card, message } from 'antd'
import axios from 'axios'

import EditModal from '../components/EditModal'
import CardButton from '../components/CardButton'
import listStyle from '../styles/list.module.scss'

function List() {
  //Get data
  const [bookmarks, setBookmarks] = useState([])

  //Show modalwindow
  const [messageApi, contextHolder] = message.useMessage()
  const [modalEditLoading, setModalEditLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState({
    bookmark: {
      url: null,
      title: null,
      category: null,
      date: null,
    },
    id: null,
  })

  useEffect(() => {
    fetchData()
  }, [bookmarks])

  const fetchData = () => {
    axios.get('http://localhost:3100/bookmarks').then((data) => {
      setBookmarks(data.data)
    })
  }

  const showModal = (data) => {
    setOpen(true)
    setModalData(data)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const putBookmark = async (targetId, newData) => {
    const newBookmark = {
      bookmark : {
        url: modalData.url,
        title: newData.title,
        category: newData.category,
        date: modalData.date,
      },
      id: targetId
    }
    
    setModalEditLoading(true)
    setTimeout(() => {
      setModalEditLoading(false)
      setOpen(false)
      messageApi.open({
        type: 'success',
        content: 'Successfully editted.',
      })
    }, 1500)

    await axios.put('http://localhost:3100/bookmarks/' + targetId, newBookmark)
  }

  const deleteBookmark = async (targeId) => {  
    await axios.delete('http://localhost:3100/bookmarks/' + targeId)
    await messageApi.open({
      type: 'success',
      content: 'Successfully deleted.',
    })

  } 

  return (
    <>
      {contextHolder}
      <div className={listStyle['List-body']}>
        <h2>Bookmark list</h2>
        {bookmarks.map((item) => {
          return (
            <Card
              key={item.id}
              title={item.bookmark.title}
              extra={
                <CardButton
                  eachItem={item}
                  showModalFn={showModal}
                  deleteFn={deleteBookmark}
                />
              }
              className={listStyle['List-card']}
              eachbookmark={item}
            >
              <p>Category: {item.bookmark.category}</p>
              <p>Added date: {item.bookmark.date}</p>
            </Card>
          )
        })}
        <EditModal
          openState={open}
          modalEditLoadingState={modalEditLoading}
          handleCancel={handleCancel}
          modalData={modalData}
          dataSetFn={setModalData}
          putFn={putBookmark}
        />
      </div>
    </>
  )
}

export default List