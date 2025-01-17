import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">
            TT Refuge: A Safe Haven for TikTok Creators
          </h1>
          <p className="text-gray-600 leading-relaxed">
            With the uncertainty surrounding TikTok’s future, <strong>TT Refuge</strong> is here to help creators preserve their content. Our tool provides a simple and private way to download your TikTok videos <strong>without watermarks</strong> and <strong>securely on your device</strong>.
          </p>
        </div>

        {/* Features Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Why Choose TT Refuge?</h2>
          <ul className="list-disc space-y-3 pl-6 text-gray-600">
            <li>
              <strong>No Watermarks:</strong> Keep your videos clean and professional, free of TikTok branding.
            </li>
            <li>
              <strong>Privacy Guaranteed:</strong> Your data stays on your computer. No uploads to any server.
            </li>
            <li>
              <strong>Preserve Your Legacy:</strong> Save your videos, captions, and metadata before it’s too late.
            </li>
            <li>
              <strong>Easy and Free:</strong> Just upload your TikTok data export, and our tool does the rest.
            </li>
          </ul>
        </div>

        {/* Video Section */}
       

        {/* Call-to-Action */}
        <div className="text-center space-y-6">
          <Link
            href="/tiktok"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
          >
            Start Saving Your Content
          </Link>
        </div>

        {/* Help Section */}
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
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">How It Works</h2>
          <p className="text-gray-600 text-center">
            Watch this quick video to see how easy it is to download TikTok videos without a watermark.
          </p>
          <div className="flex justify-center">
            <div className="w-full max-w-3xl aspect-video">
              <iframe
                className="w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/ODcstHZhp5I"
                title="How to Download TikTok Videos Without Watermark"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Free Service Section */}
        <div className="text-center border-t pt-6 space-y-4">
          <p className="text-gray-600">
            <strong>TT Refuge is 100% Free</strong> — created for creators, by creators. But if you’d like to show your appreciation, feel free to buy me a beer 🍺 at:
          </p>
          <p className="text-xl font-semibold text-gray-800">
            <span className="text-green-500">$</span>sjdenton
          </p>
          <p className="text-sm text-gray-500">via CashApp</p>
        </div>
      </div>
    </main>
  );
}
