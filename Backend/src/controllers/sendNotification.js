import admin from '../config/firebase-admin.js';
import db from '../config/db.js';

// Save token to MySQL
export const saveToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    const [rows] = await db.query('SELECT token FROM device_tokens WHERE token = ?', [token]);
    if (rows.length === 0) {
      await db.query('INSERT INTO device_tokens (token) VALUES (?)', [token]);
      console.log('Token saved:', token);
    } else {
      console.log('Token already exists:', token);
    }
    res.json({ message: 'Token saved successfully' });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
};



// Send notifications to stored tokens
export const sendNotification = async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ message: 'Title and body are required' });
  }

  try {
    const [rows] = await db.query('SELECT token FROM device_tokens');
    if (rows.length === 0) {
      return res.status(400).json({ message: 'No users to notify' });
    }

    const tokensArray = rows.map(row => row.token);
    console.log("Sending notifications to tokens:", tokensArray);

    const message = {
      notification: { title, body },
      tokens: tokensArray,
    };
    // console.log("token Array : ", tokensArray)

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log("Firebase responses:", response);

    response.responses.forEach((res, index) => {
      if (!res.success) {
        console.error(`Error for message ${index}:`, res.error);
      }
    });


    // Remove invalid tokens
    const invalidTokens = [];
    response.responses.forEach((resp, index) => {
      if (!resp.success && resp.error.code === "messaging/registration-token-not-registered") {
        invalidTokens.push(tokensArray[index]);
      }
    });

    if (invalidTokens.length > 0) {
      await db.query('DELETE FROM device_tokens WHERE token IN (?)', [invalidTokens]);
      console.log('Removed invalid tokens:', invalidTokens);
    }

    res.json({
      message: "Notification sent successfully!",
      // tokensSent: tokensArray,
      response,
    });
  } catch (error) {
    console.error("Firebase Error:", error);
    res.status(500).json({ message: "Failed to send notification", error: error.message });
  }
};


// import admin from '../config/firebase-admin.js';

// let tokensArray = []

// export const saveToken = (req, res) => {
//   const { token } = req.body

//   if (!token) {
//     return res.status(400).json({ message: 'Token is required' });
//   }

//   if (!tokensArray.includes(token)) {
//     tokensArray.push(token);
//     console.log('Stored tokens:', tokensArray)
//   }

//   res.json({ message: 'Token saved successfully' })
// }

// export const sendNotification = async (req, res) => {
//   const { title, body } = req.body

//   if (!title || !body) {
//     console.error("Missing title or body in request:", req.body)
//     return res.status(400).json({ message: 'Title and body are required' })
//   }

//   if (tokensArray.length === 0) {
//     console.error("No users to notify. Tokens list is empty.")
//     return res.status(400).json({ message: 'No users to notify' })
//   }

//   console.log("Sending notifications to tokens:", tokensArray)

//   const message = {
//     notification: { title, body },
//     tokens: tokensArray,
//   }

//   try {
//     const response = await admin.messaging().sendEachForMulticast(message)
//     console.log("Firebase responses:", response)

//     response.responses.forEach((resp, index) => {
//       if (!resp.success && resp.error.code === "messaging/registration-token-not-registered") {
//         console.log(`Removing invalid token: ${tokensArray[index]}`)
//         tokensArray.splice(index, 1); 
//       }
//     })

//     res.json({
//       message: "Notification sent successfully!",
//       tokensSent: tokensArray,
//       response,
//     })

//   } catch (error) {
//     console.error("Firebase Error:", error)
//     res.status(500).json({ message: "Failed to send notification", error: error.message })
//   }
// };
