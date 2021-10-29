import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

type IPayload = {
  sub: string
}

const ensureAuthenticated = (request: Request, response: Response, next: NextFunction) => {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({ errorCode: 'token.invalid' })
  }

  const accessToken = authToken.split(' ')[1]

  try {
    const { sub } = verify(accessToken, process.env.JWT_SECRET) as IPayload

    request.user_id = sub

    return next()
  } catch {
    return response.status(401).json({ errorCode: 'token.expired' })
  }
}

export { ensureAuthenticated }
