import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginAction, userRegisterAction } from '../userSlice'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const { username, email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, error } = userLogin

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
    dispatch(userRegisterAction({ username, email, password }))
  }

  return (
    <>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submitHandler}>
        <h1>Register</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={onChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          onChange={onChange}
        />
        <div>
          <button>register</button>
        </div>
      </form>
    </>
  )
}

export default Register
