import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.methods.validatePassword = async function validatePassword(data) {
  console.log(bcrypt.compare(data, this.password))
  return await bcrypt.compare(data, this.password)
}

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (err) {
    return next(err)
  }
})
const User = mongoose.model('User', userSchema)

export default User
