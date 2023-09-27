import JsonWebToken from './tools/jsonwebtoken'
const secretKey = '123456'
const jwt = new JsonWebToken(secretKey)
export default jwt
