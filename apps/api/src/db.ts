import mongoose, { MongooseError, CallbackError } from 'mongoose'

mongoose.connect(
  `${process.env.MONGODB_URI}/${process.env.MONGODB_DATABASE}`,
  {
    authSource: 'admin',
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
  },
  // (err: CallbackError) => {
  //   if (err) {
  //     console.log('Database not connected' + err)
  //   } else {
  //     console.log('Database connected')
  //   }
  // },
)

const TrackingSchema = new mongoose.Schema({
  picture: {
    type: String,
  },
  isDelivered: {
    type: Boolean,
  },
  balance: {
    type: String,
  },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  note: { type: String },
  latitude: { type: Number },
  longtitude: { type: Number },
})
export const TrackingModel =
  mongoose.models.trackings || mongoose.model('trackings', TrackingSchema)
