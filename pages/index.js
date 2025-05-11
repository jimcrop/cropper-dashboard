// File: pages/index.tsx
import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Cropper Industries Dashboard</title>
      </Head>
      <main className="min-h-screen bg-gray-100 p-8 text-gray-900 font-sans">
        <div className="max-w-6xl mx-auto space-y-10">
          <section className="text-center">
            <h1 className="text-4xl font-extrabold mb-2">Cropper Industries Dashboard</h1>
            <p className="text-lg text-gray-700">
              Real-time mission control for your AI-powered operations. Integrated with GovOmniAI.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-xl font-semibold mb-2">📊 BD Pipeline Visualization</h2>
              <p className="text-sm text-gray-600">Track real-time opportunities, win probabilities, and AI-suggested pursuit paths.</p>
              <div className="mt-4 bg-gray-200 h-40 flex items-center justify-center text-sm text-gray-500">[Live GovTribe API Feed Here]</div>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-xl font-semibold mb-2">🛠️ Capture & Proposal Strategy</h2>
              <p className="text-sm text-gray-600">AI-enhanced win themes, red team readiness, and compliance scaffolding.</p>
              <div className="mt-4 bg-gray-200 h-40 flex items-center justify-center text-sm text-gray-500">[CaptureGPT Summary Assistant]</div>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-xl font-semibold mb-2">📡 API Health Monitor</h2>
              <p className="text-sm text-gray-600">Live visibility on all integrations with SAM.gov, DSBS, GovTribe, and Salesforce (future).</p>
              <div className="mt-4 bg-gray-200 h-40 flex items-center justify-center text-sm text-gray-500">[API Status Panel]</div>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-xl font-semibold mb-2">🚨 Sovereign Alerts Panel</h2>
              <p className="text-sm text-gray-600">Automated alerts on expired certifications, new RFIs, protests, and exclusions.</p>
              <div className="mt-4 bg-gray-200 h-40 flex items-center justify-center text-sm text-gray-500">[Alerts Feed Placeholder]</div>
            </div>
          </section>

          <footer className="text-center text-sm text-gray-500 mt-12">
            GovOmniAI Sovereign Stack • Cropper Industries © {new Date().getFullYear()}
          </footer>
        </div>
      </main>
    </>
  );
}
