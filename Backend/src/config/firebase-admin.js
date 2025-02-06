import admin from 'firebase-admin'

export const initializeFirebase = () => {
  try {
<<<<<<< HEAD
<<<<<<< HEAD
=======
    // const serviceAccount = JSON.parse(
    //   readFileSync(path.resolve(__dirname, '../../firebase-adminsdk.json'), 'utf8')
    // )
    
    const serviceAccount = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    }
>>>>>>> 4e336ae (adding notification feature)
=======
>>>>>>> 4b9aa87 (adding notification feature)

    admin.initializeApp({
      credential: admin.credential.cert({
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
<<<<<<< HEAD
        token_uri : process.env.FIREBASE_TOKEN_URI
=======
>>>>>>> 4b9aa87 (adding notification feature)
      }),
    })

    console.log("Firebase Admin SDK initialized successfully")
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error)
    process.exit(1)
  }
}

export default admin