import { json, urlencoded } from 'body-parser'
import express, { type Express } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import { TrackingModel } from './db'

// TODO: Check tsc 5.6.3 issue
type HeadersInit = Headers | string[][] | { [key: string]: string }

export const createServer = (): Express => {
  const app = express()
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get('/message/:name', (req, res) => {
      return res.json({ message: `hello ${req.params.name}` })
    })

  app.get('/status', async (_, res) => {
    return res.json({ ok: true })
  })

  app.get('/trackings/direct', async (_, res) => {
    const sourceRes = await fetch(
      'https://ust-testing.beautitag.com/tch/api/v1/trackings',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'tracking-api-key': process.env.TRACKING_API_KEY,
        } as HeadersInit,
      },
    )
    const data = await sourceRes.json()
    return res.json({ data })
  })

  app.get('/trackings', async (_, res) => {
    const trackings = await TrackingModel.find({})
    return res.json({ trackings })
  })

  app.post('/trackings/fetch', async (_, res) => {
    // TODO: Add zod typechecking for 3rd party API
    const sourceRes = await fetch(
      'https://ust-testing.beautitag.com/tch/api/v1/trackings',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'tracking-api-key': process.env.TRACKING_API_KEY,
        } as HeadersInit,
      },
    )
    // TODO: Use zod to assign proper types
    const data: any = await sourceRes.json()
    const trackings = data?.data.trackings || []

    const updateRes = await TrackingModel.bulkWrite(
      trackings.map(({ _id, ...data }: any) => ({
        updateOne: { upsert: true, filter: { _id }, update: { ...data } },
      })),
    )

    return res.json({ message: 'Trackings Synced', updated: updateRes })
  })

  return app
}
