
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Cropper Industries Dashboard</title>
        <meta name="description" content="Powered by GovOmniAI" />
      </Head>
      <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a' }}>Cropper Industries Dashboard</h1>
        <p>Welcome to the secure, AI-integrated platform built on GovOmniAI sovereign stack.</p>
        <ul style={{ marginTop: '20px' }}>
          <li>✅ BD Pipeline Visualization</li>
          <li>✅ Capture & Proposal Tracking</li>
          <li>✅ API Health Monitor</li>
          <li>✅ Sovereign Alerts Panel</li>
        </ul>
      </main>
    </>
  );
}
