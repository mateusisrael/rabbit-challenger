import amqp from 'amqplib'

const CONNECT_CONFIG = {
  host: 'amqp://localhost',
  port: 5672
}

// amqp.connect(
//   CONNECT_CONFIG.host,
//   { port: CONNECT_CONFIG.port },
//   (connectionError, connection) => {
//     if (connectionError) throw connectionError
    
//     console.log()
//     connection.createChannel((createChannelError, channel) => {
//       if (createChannelError) throw createChannelError

//       const queue = "teste"
//       channel.consume(queue, (msg) => {
//         console.log(`[X] Received ${msg.content.toString()}`)
//       })
//     })
//   }
// )

async function main() {
  try {
    const connection = await amqp.connect(CONNECT_CONFIG.host)
    const channel = await connection.createChannel()

    const queue = "teste"
    await channel.consume(queue, (msg) => console.log(msg?.content.toString()))
  } catch (error) {
    throw error
  }
}

main()