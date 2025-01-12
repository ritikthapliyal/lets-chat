import CryptoJS from 'crypto-js'

const secret = "lets-chat"

export function splitAndEncryptToken(token) {
   
    const [header, payload, signature] = token.split('.')

    // Encrypting each part
    const encryptedHeader = CryptoJS.AES.encrypt(header, secret).toString()
    const encryptedPayload = CryptoJS.AES.encrypt(payload, secret).toString()
    const encryptedSignature = CryptoJS.AES.encrypt(signature, secret).toString()

    // Store encrypted parts in different locations
    localStorage.setItem('token-1', encryptedHeader)
    localStorage.setItem('token-2', encryptedPayload)
    localStorage.setItem('token-3', encryptedSignature)

}

export function decryptAndReconstructToken() {
    
    try{
        const encryptedHeader = localStorage.getItem('token-1')
        const encryptedPayload = localStorage.getItem('token-2')
        const encryptedSignature = localStorage.getItem('token-3')
    
        if (!encryptedHeader || !encryptedPayload || !encryptedSignature) {
            throw new Error('Token parts are missing or invalid')
        }
    
        const header = CryptoJS.AES.decrypt(encryptedHeader, secret).toString(CryptoJS.enc.Utf8)
        const payload = CryptoJS.AES.decrypt(encryptedPayload, secret).toString(CryptoJS.enc.Utf8)
        const signature = CryptoJS.AES.decrypt(encryptedSignature, secret).toString(CryptoJS.enc.Utf8)
    
        return `${header}.${payload}.${signature}`
    }
    catch(err){
        return null
    }
}


export function clearToken() {
    localStorage.removeItem('token-1')
    localStorage.removeItem('token-2')
    localStorage.removeItem('token-3')
}