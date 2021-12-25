import express from 'express';
import amqp from 'amqplib';
import { isValid } from './utils/userValidator';
const app = express()
const PORT = 3000

async function amqpCreateConnection(): Promise<amqp.Channel> {
  const HOST = 'amqp://localhost'
  const queue = 'challenger'

  try {
    const connectcion = await amqp.connect(HOST)
    const channel = await connectcion.createChannel()
    channel.assertQueue(queue, { durable: false })
    console.log('[amqp] Created queue')
    return channel
  } catch (error) {
    throw error
  }
}

let channel: amqp.Channel;
amqpCreateConnection()
  .then((response) => {
    channel = response
  })

app.use(express.json())
{
// async function connectServices() {
//   await amqpCreateConnection()
//   app.listen(PORT, () => {
//     console.log(`Server at http://localhost:${PORT}`)
//   })
// } 
}

interface IMessage {
  name: string
  sex: 'F' | 'M'
}
app.route('/user')
  .post(async (req, res) => {
    const message: IMessage = req.body
    const queue = 'challenger'

    if(!isValid(message)) {
      return res.status(400).json({ message: "Invalid message params" })
    }

    try {
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
      res.status(200).send()
    } catch (error) {
      res.status(400).send()
    }
  })


app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`)
})