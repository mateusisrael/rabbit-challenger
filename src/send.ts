import amqp from 'amqplib'

async function main() {
  const HOST = 'amqp://localhost'
  const queue = "teste"
  const msg = "I love you"

  try {
    const connection = await amqp.connect(HOST, { port: 5672 })
    const channel = await connection.createChannel()

    channel.assertQueue(queue, {
      durable: false
    })
    channel.sendToQueue(queue, Buffer.from(msg))
    console.log(`[X] Send message ${msg}`)
    process.exit(0)
  } catch (error) {
    throw error
  }
}

main()