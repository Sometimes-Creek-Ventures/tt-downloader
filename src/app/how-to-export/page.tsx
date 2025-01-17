import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Export TikTok Data',
  description: 'Learn how to export your TikTok data in JSON format.',
};

export default function HowToExportPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">How to Export Your TikTok Data</h1>
        <p className="text-gray-600 leading-relaxed">
          TikTok allows you to export your account data, including videos, likes, and activity history, in JSON format.
          Follow the steps below to get your TikTok data export:
        </p>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Step 1: Open TikTok in a Web Browser</h2>
          <p className="text-gray-600">
            Open a web browser on your computer and visit the TikTok website at <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">https://www.tiktok.com</a>.
            Log in to your account using your credentials. Alternatively, you can log in by scanning a QR code using the TikTok mobile app.
          </p>

          <h2 className="text-xl font-semibold">Step 2: Access Privacy Settings</h2>
          <p className="text-gray-600">
            After logging in, click on your profile picture in the top-right corner to open the dropdown menu. Select <strong>Settings and Privacy</strong>, then go to <strong>Privacy</strong>.
          </p>

          <h2 className="text-xl font-semibold">Step 3: Request Your Data</h2>
          <p className="text-gray-600">
            Scroll down and select <strong>Download your data</strong>. Choose the <strong>JSON format</strong> for your data export and click <strong>Request data</strong>.
          </p>

          <h2 className="text-xl font-semibold">Step 4: Wait for Approval</h2>
          <p className="text-gray-600">
            TikTok will process your request. This may take a few minutes, hours, or even days. You will receive a notification in your TikTok account when your data export is ready.
          </p>

          <h2 className="text-xl font-semibold">Step 5: Download Your Data</h2>
          <p className="text-gray-600">
            Once approved, return to the <strong>Download your data</strong> section in your browser. Click the <strong>Download</strong> button to save the file. The file will be downloaded as a compressed ZIP archive.
          </p>

          <h2 className="text-xl font-semibold">Step 6: Extract and Use</h2>
          <p className="text-gray-600">
            Extract the ZIP file on your computer. Inside, you’ll find a <strong>JSON</strong> file containing your TikTok data. You can upload this file into the TikTok Viewer tool to explore your content.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
