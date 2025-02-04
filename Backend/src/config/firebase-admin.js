import admin from 'firebase-admin'
// import { readFileSync } from 'fs'
// import path from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

export const initializeFirebase = () => {
  try {
    // const serviceAccount = JSON.parse(
    //   readFileSync(path.resolve(__dirname, '../../firebase-adminsdk.json'), 'utf8')
    // )
    
    const serviceAccount = {
      "type": "service_account",
      "project_id": "mayoorapp-d73d2",
      "private_key_id": "33cd3f7617469c51c75e78f747087dc3a659be70",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDFsaOAkb62cQSt\nAieaNEf90kavk8DfqvqTLv8ysYSP282VgQAUab4vMkkv5y7jynaLBTOnCEGRBBbM\n0OkmwSAlNBgXzZkwogKIWKqJhq9nG6qtOLHW2kWxlec+eCjqeayKGZrx6GTW7aUy\nM2ZpyVltVpWYj9DGkIgYjUCFs6SBUawHJXW4W1nAd1+fPPQO2/ni2IlEJ3yWbPpn\n+1wO1LVNZrs49hvSmMQOaEIgwDMrKEnzmitOpeF7O2ZA/kyZWSL2nV5zXZygHgCU\niCPTR/V8onSnWHlfiH5ZFFKbriB2b8IyPV3itvJidJcLTl3ivJM8hhwIule5JQzb\nVTcpD68vAgMBAAECggEAD3WtyI8dL900tWbWu/tcqd+4wWA3lAYl5D6nnEo/iJRy\nxj85R19hjQVMrd9RTmT10jdM68H8hp+gPNIVeX9eySoCvFHKqf/xXMI6S9jpfJGw\nTi2B0sBs9M85LyxsXrG3KXGJKWO4Bwq8gWl9l8Y0JRXBSxXsCKsiyXC6W/pJYgdi\nsfKF8G83YmJhSQWdPczAkND6EvvN34LjnW+soBewylHRmNWWfSCS5tEZSks9J81o\nO3t7XlXSPpfO/jbHx5UvJI+HGuZNQr9BwJqiwWuPzjMjQUkXsKk+zdGNkuiIUMAS\n/52mpXKngiT1s4Co2xSPwpnfzFUduTJdvDdBlV19+QKBgQD0zCCsrj8cnmq0gKs3\nP2WYqogQtZ3xRaCOQ4dD8UZrLQRmN+omwo5eCh5iAhnBAYZHsjoRU7kPsQOiEc7l\nRNnDybhmGnbRF/L25pCHCcKq0p0Xk6YDLJpmZnE2CtMn1eE5AjEfH7rmwtBIRo6M\nAUFrGZGpwn1GYrGyNWvtmy5umwKBgQDOva4gKBLB0snmcP5rEcxHESzpP6ueOztC\nBGuZc2f7mkjccG2+4Tuy7A/tPL6MyNlnKZAcr8n5ev4X5sRoj4qsqZbQKkbX3g7w\ntf1wU+tuPceNG98rVZlz9GrlmLFAMXIgTjxikl3ztP9gYNQumm36RfBhYWqSC95z\n8bzXPBsg/QKBgQC5UTLHJt32P2MOJH35RBAYY7i/1Y2s0gX6zNpAsA2cIyc6bsfe\n8dgvDr/zeB2hBBNwgVb+OQBXBa13ar3SyK2GT1Y+TXh3UAcJrH/rCpOJGAn+iDLc\nIk78iD7aJ5W0iXCH5MXlBvNJsF9W57sP9/9bIa8o8Wg++YYGH/UFmj2rUwKBgQCk\nJRHVUjviTDwljN1ToWPxoP9pijX2gczA08WipnCO4aar71ATV70QiED0+V/JY8bJ\nE8TqIeBZBoAr9ftHkYBnKpclXAu3ZQWztKsuvlKUytRfgxujymj2Gb+t35gMAbY9\nVCC5msChuLlyii6tecuMBG+gwbndjzLmF675rS1U+QKBgA4UKvCvD7kqsSRPh98w\nvzK2YkPty+QAGLEzDXPcOk1UEUCQcVfUAtG9UcvnIw7fcascgVw3ozmVUrGKmfGF\nkyw23RhOZJdrcQkKXnYYOkLvAzcJkFrwEW8flJ6cCtmfLMxnoeNj61FqwxkRC6VC\nzf/Ooy9W3a6f0AH5JG/UWw12\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-fbsvc@mayoorapp-d73d2.iam.gserviceaccount.com",
      "client_id": "113108254952003831277",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40mayoorapp-d73d2.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })

    console.log("Firebase Admin SDK initialized successfully")
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error)
    process.exit(1)
  }
}

export default admin