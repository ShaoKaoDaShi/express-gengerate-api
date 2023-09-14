import mongoose from 'mongoose'

// main()
//   .then(() => {
//     console.log('mongodb connected')
//   })
//   .catch((err) => console.log(err))

async function dbConnect() {
    await mongoose.connect('mongodb://127.0.0.1:27017/qiankunWebApp')
    console.log('mongodb connected')
}
export default dbConnect
