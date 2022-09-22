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

export { authUser }
