export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, message } = req.body

    if (!name || !message) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    // 🔎 Test ENV
    console.log('PROJECT', process.env.FIREBASE_PROJECT_ID)
    console.log('EMAIL', process.env.FIREBASE_CLIENT_EMAIL)
    console.log('KEY EXISTS', !!process.env.FIREBASE_PRIVATE_KEY)

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}
