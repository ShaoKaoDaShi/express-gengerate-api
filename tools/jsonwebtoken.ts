const CryptoJS = require('crypto-js')

const secretKey = 'your-secret-key'

function generateToken(payload: Record<string, any>, expiresInMinutes: number) {
    const header = {
        alg: 'HS256',
        typ: 'JWT',
    }

    const encodedHeader = btoa(JSON.stringify(header))

    const currentTimestamp = Math.floor(Date.now() / 1000)
    const expirationTimestamp = currentTimestamp + expiresInMinutes * 60
    payload.exp = expirationTimestamp

    const encodedPayload = btoa(JSON.stringify(payload))

    const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}`, secretKey).toString(CryptoJS.enc.Base64)

    const token = `${encodedHeader}.${encodedPayload}.${signature}`

    return token
}

function verifyToken(token: string) {
    const [header, payload, signature] = token.split('.')
    const calculatedSignature = CryptoJS.HmacSHA256(`${header}.${payload}`, secretKey).toString(CryptoJS.enc.Base64)

    // 解码 payload
    const decodedPayload = JSON.parse(atob(payload))
    console.log(decodedPayload)

    // 验证签名
    if (signature !== calculatedSignature) {
        return false
    }

    // // 解码 payload
    // const decodedPayload = JSON.parse(atob(payload))

    // 验证过期时间
    const currentTimestamp = Math.floor(Date.now() / 1000)
    if (decodedPayload.exp && decodedPayload.exp < currentTimestamp) {
        return false
    }

    return true
}

// // 示例用法
// const payload = {
//     sub: '1234567890',
//     name: 'John Doe',
//     iat: Math.floor(Date.now() / 1000),
// }

// const expiresInMinutes = 60

// const token = generateToken(payload, expiresInMinutes)
// console.log(token)

// const isValid = verifyToken(token)
// console.log(isValid)

class JsonWebToken {
    private secretKey: string

    constructor(secretKey: string) {
        this.secretKey = secretKey
    }

    generateToken(payload: Record<string, any>, expiresIn = Number.MAX_SAFE_INTEGER) {
        const header = {
            alg: 'HS256',
            typ: 'JWT',
        }
        const encodedHeader = btoa(JSON.stringify(header))

        const currentTimestamp = Date.now()
        const expirationTimestamp = currentTimestamp + expiresIn

        const encodedPayload = btoa(JSON.stringify(payload))

        const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}.${expirationTimestamp}`, this.secretKey).toString(
            CryptoJS.enc.Base64,
        )

        const token = `${encodedHeader}.${encodedPayload}.${expirationTimestamp}.${signature}`

        return token
    }

    verifyToken(token: string) {
        const [header, payload, expirationTimestamp, signature] = token.split('.')
        const calculatedSignature = CryptoJS.HmacSHA256(`${header}.${payload}.${expirationTimestamp}`, this.secretKey).toString(CryptoJS.enc.Base64)

        // 解码 payload
        // const decodedPayload = JSON.parse(atob(payload))
        // console.log(decodedPayload)

        // 验证签名
        if (signature !== calculatedSignature) {
            return false
        }

        // 解码 payload
        const decodedPayload = JSON.parse(atob(payload))

        // 验证过期时间
        const currentTimestamp = Date.now()
        if (expirationTimestamp && Number(expirationTimestamp) < currentTimestamp) {
            return false
        }
        if (decodedPayload === false) return true
        return decodedPayload
    }
}
export default JsonWebToken

// // 示例用法
// const jwt = new JsonWebToken('ok')
// const payload = {
//     sub: '1234567890',
//     name: 'John Doe',
//     iat: Math.floor(Date.now() / 1000),
// }

// const token = jwt.generateToken(payload, 100)
// console.log(token)

// const isValid = jwt.verifyToken(token)
// console.log(isValid)
