import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  })
}

const db = admin.firestore()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, type, message } = req.body

  if (!name || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  await db.collection('messages').add({
    name,
    type: type || 'pregunta',
    message,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  })

  return res.status(200).json({ ok: true })
}