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
          <h2 className="text-xl font-semibold">Step 1: Open TikTok App</h2>
          <p className="text-gray-600">
            Launch the TikTok app on your mobile device and go to your profile by tapping the <strong>Profile</strong> icon in the bottom-right corner.
          </p>

          <h2 className="text-xl font-semibold">Step 2: Access Privacy Settings</h2>
          <p className="text-gray-600">
            Tap the <strong>three lines</strong> in the top-right corner to open the menu. Select <strong>Settings and Privacy</strong>, then go to <strong>Privacy</strong>.
          </p>

          <h2 className="text-xl font-semibold">Step 3: Request Your Data</h2>
          <p className="text-gray-600">
            Scroll down and select <strong>Download your data</strong>. Choose the <strong>JSON format</strong> for your data export and tap <strong>Request data</strong>.
          </p>

          <h2 className="text-xl font-semibold">Step 4: Wait for Approval</h2>
          <p className="text-gray-600">
            TikTok will process your request, This has always taken a few minutes for me but it might take a few hours or days. You will receive a notification when your data export is ready.
          </p>

          <h2 className="text-xl font-semibold">Step 5: Download Your Data</h2>
          <p className="text-gray-600">
            Once approved, return to the <strong>Download your data</strong> section, and tap the <strong>Download</strong> button. The file will be saved as a compressed ZIP archive.
          </p>

          <h2 className="text-xl font-semibold">Step 6: Extract and Use</h2>
          <p className="text-gray-600">
            Extract the ZIP file on your device or computer. Inside, you’ll find a <strong>JSON</strong> file containing your TikTok data. You can upload this file into the TikTok Viewer tool to explore your content.
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
