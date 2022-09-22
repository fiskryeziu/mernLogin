import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Page = () => {
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [navigate, userInfo])
  return <h1>Page</h1>
}

export default Page
