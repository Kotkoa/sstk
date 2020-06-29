/* eslint-disable no-console */
import express from 'express'
import path from 'path'
import cors from 'cors'
import sstk from 'shutterstock-api'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const Root = () => ''

const SHUTTERSTOCK_API_TOKEN =
  'v2/MTI4ZTAtNzM2OGMtMTUyM2ItYWE4ZDUtMDkwMjMtM2U4OWIvMTA5NzQ5MjkyL2N1c3RvbWVyLzMvSTVoUWtJcV9KWXcyWlgzNnY3UkFEQjhhakhfSFNtQ041RWVvYWdraWRiRUJiU3pJcTRVNnAyd05ESjRsdENzT1V2X0FlSkY5WDF2aE93NlNXT0NDTnNjTjdsMWJ2czZJYnlOYjhFMnl4eHgzbWd4WFdPLVBFcU1sWmZBbDhZYkkySm8wczVUV1pzRE9Ua3JYcUZyNDNWVE85R3lsZXlQdW9CY19FX2tEbi1PT0F1ZU5mOHpGdjQxS1hMUklWcGJiRkFMR2xaeTBpWnBTbTZtV2ozOUxnZw'
const computerVisionApi = new sstk.ComputerVisionApi()

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

// here is my code

server.post('/api/v1/keyword/', (req, res) => {
  try {
    const { url } = req.body
    console.log('catch', url)
    sstk.setAccessToken(SHUTTERSTOCK_API_TOKEN)

    const body = new sstk.ImageCreateRequest(url)
    computerVisionApi
      .uploadImage(body)
      .then((data) => {
        console.log('c-vision.upload:', data.upload_id)
        return computerVisionApi.getKeywords(data.upload_id)
      })
      .then((data) => {
        console.log('c-vision.key:', data)
        res.json(data)
      })
  } catch (_err) {
    res.send(_err)
  }
})

// end of my code

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
