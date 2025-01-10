import { json, urlencoded } from 'body-parser'
import express, { type Express } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'

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

  app.get('/status', (_, res) => {
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
    console.log(process.env.TRACKING_API_KEY)
    const data = await sourceRes.json()
    return res.json({ data })
  })

  return app
}
