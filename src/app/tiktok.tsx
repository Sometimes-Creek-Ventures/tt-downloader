import Head from 'next/head';
import TikTokViewer from '@/components/ui/tiktok-viewer';

export default function TikTokPage() {
  return (
    <>
      <Head>
        <title>TikTok Viewer</title>
        <meta name="description" content="View and manage your TikTok videos." />
      </Head>
      <main className="min-h-screen p-8">
        <TikTokViewer />
      </main>
    </>
  );
}
