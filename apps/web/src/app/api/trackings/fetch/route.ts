import mongoose, { MongooseError, CallbackError } from 'mongoose'
import { TrackingModel } from './../../../../db'

export async function POST(req: Request) {
  const sourceRes = await fetch(
    'https://ust-testing.beautitag.com/tch/api/v1/trackings',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'tracking-api-key': process.env.TRACKING_API_KEY,
      } as HeadersInit,
    },
  ).then(res => res.json())

  const trackings = sourceRes.data.trackings
  TrackingModel.updateMany({}, trackings)

  return Response.json({ message: 'Trackings Synced' })
}
