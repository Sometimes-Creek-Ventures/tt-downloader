import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to TikTok Downloader</h1>
        <p className="text-gray-600 mb-8">Manage and download your TikTok videos easily.</p>
        <Link href="/tiktok">
          <span className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block">
            Go to TikTok Viewer
          </span>
        </Link>
      </div>
    </div>
  );
}
