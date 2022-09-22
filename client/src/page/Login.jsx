import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginAction } from '../userLoginSlice'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, error, errorToast } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate('/page')
    }
  }, [navigate, userInfo])

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    // call dispatch
    dispatch(userLoginAction({ email, password }))
  }

  return (
    <>
      {error && <p className="error">Invalid password</p>}
      <form onSubmit={submitHandler}>
        <h1>Login</h1>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
        <div>
          <button>login</button>
        </div>
      </form>
    </>
  )
}

export default Login
