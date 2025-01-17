import Script from 'next/script';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 p-8">

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-8">
        {/* Your page content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">
            TikTok May Be Shutting Down — Save Your Content Now!
          </h1>
          <p className="text-gray-600 leading-relaxed">
            With the uncertainty around TikTok’s future, it’s crucial for creators to preserve their content. Our tool lets you download your TikTok videos <strong>without watermarks</strong>, while keeping your data <strong>secure on your device</strong>.
          </p>
        </div>

        {/* Google AdSense Block */}
        <div className="my-6">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-7037492213974375"
            data-ad-slot="1234567890" /* Replace with your ad slot */
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <Script
            id="adsbygoogle-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
            }}
          />
        </div>

        {/* Rest of your page content */}
        <div className="text-center space-y-6">
          <a
            href="/tiktok"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
          >
            Start Downloading Your Videos
          </a>
        </div>
      </div>
    </main>
  );
}
