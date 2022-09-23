import asyncHandler from 'express-async-handler'
import User from './userModel.js'
import generateToken from './generateToken.js'

const authUser = asyncHandler(async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({ email: email })

  if (user && (await user.validatePassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password!')
  }
})
const registerUser = asyncHandler(async (req, res) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  const userExist = await User.findOne({ email: email })

  if (userExist) {
    res.status(400)
    throw new Error('User already exists')
  } else {
    const user = await User.create({
      username,
      email,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }
})

export { authUser, registerUser }
