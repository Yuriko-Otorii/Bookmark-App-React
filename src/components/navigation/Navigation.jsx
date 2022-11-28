import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Menu, Button } from 'antd'
import {
  HomeOutlined,
  FileAddOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { signOut } from 'firebase/auth'

import navStyle from '../../styles/navigation.module.scss'
import { auth } from '../../firebase'

function Navigation() {
  const navigate = useNavigate()

  const items = [
    { label: 'Home', key: '/', icon: <HomeOutlined /> },
    { label: 'Add', key: '/addform', icon: <FileAddOutlined /> },
    { label: 'List', key: '/list', icon: <UnorderedListOutlined /> },
  ]

  const handleLogout = () => {
    signOut(auth)
    navigate('/')
  }

  return (
    <>
      <div className={navStyle['Navigation-wrapper']}>
        <Menu
          items={items}
          onClick={({ key }) => navigate(key)}
          mode="horizontal"
          defaultSelectedKeys={['/']}
          className={navStyle['Navigation-body']}
        />
        <Button
          onClick={handleLogout}
          className={navStyle['Navigation-logout']}
        >
          Log out
        </Button>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation
