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
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
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