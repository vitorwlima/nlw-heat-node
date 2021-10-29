import { prismaClient } from '../prisma'

type ICreateMessageParams = {
  text: string
  user_id: string
}

class CreateMessageService {
  async execute({ text, user_id }: ICreateMessageParams) {
    const message = await prismaClient.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: true,
      },
    })

    return message
  }
}

export { CreateMessageService }
