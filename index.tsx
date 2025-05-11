import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Cropper Industries Dashboard</title>
      </Head>
      <main className="min-h-screen bg-gray-100 p-6 text-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Cropper Industries Dashboard</h1>
          <p className="mb-6 text-lg">
            Welcome to the secure, AI-integrated platform built on the GovOmniAI sovereign stack.
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li className="text-green-600">✅ BD Pipeline Visualization</li>
            <li className="text-green-600">✅ Capture & Proposal Tracking</li>
            <li className="text-green-600">✅ API Health Monitor</li>
            <li className="text-green-600">✅ Sovereign Alerts Panel</li>
          </ul>
        </div>
      </main>
    </>
  );
}
