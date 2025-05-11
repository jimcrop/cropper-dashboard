// File: pages/index.tsx
import Head from 'next/head';
import GovTribeFeed from '../components/GovTribeFeed';

export default function Home() {
  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-900">
      <Head>
        <title>Cropper Industries Dashboard</title>
      </Head>
      <main className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Cropper Industries Dashboard</h1>
        <p className="text-lg text-gray-600">
          Welcome to the secure, AI-integrated platform built on the GovOmniAI sovereign stack.
        </p>

        {/* BD Pipeline Visualization */}
        <section>
          <GovTribeFeed />
        </section>
      </main>
    </div>
  );
}
