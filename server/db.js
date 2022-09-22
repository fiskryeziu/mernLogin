import mongoose from 'mongoose'

const connect = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/loginsystem')

    console.log(`MongoDb server started: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error ${error.message}`)
  }
}

export default connect
