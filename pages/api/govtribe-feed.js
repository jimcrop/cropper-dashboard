export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Incoming GovTribe POST:', req.body);

    // In future: You can log this, store it, or trigger other actions
    res.status(200).json({ message: 'GovTribe feed received successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
