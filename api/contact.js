export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, type, message } = req.body

  if (!type || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  console.log({
    name: name || 'Anónimo',
    type,
    message,
    date: new Date().toISOString()
  })

  return res.status(200).json({ ok: true })
}
