import TikTokViewer from '@/components/ui/tiktok-viewer';
import { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'TikTok Viewer',
  description: 'View and manage your TikTok videos.',
};

export default function TikTokPage() {
  return (
    <main className="min-h-screen p-8">
      <TikTokViewer />
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 shadow-md text-center">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Need help exporting your TikTok data?
          </h3>
          <p className="text-blue-600">
            Follow our step-by-step guide to get your TikTok data in JSON format.
          </p>
          <div className="mt-4">
            <Link
              href="/how-to-export"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
            >
              Learn How to Export Your Data
            </Link>
          </div>
        </div>

    </main>
  );
}
