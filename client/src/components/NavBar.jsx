import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogOut } from '../userLoginSlice'

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logOutHandler = () => {
    dispatch(userLogOut())
    navigate('/')
  }
  return (
    <div className="navContainer">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!userInfo && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {userInfo && (
          <>
            <li>
              <Link to="/page">Page</Link>
            </li>
            <li style={{ cursor: 'pointer' }} onClick={logOutHandler}>
              Log Out
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default NavBar
