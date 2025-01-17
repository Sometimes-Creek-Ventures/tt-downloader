import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between">
        <div className="text-lg font-bold">My App</div>
        <div className="space-x-4">
          <Link href="/">
            <a className="hover:text-gray-300">Home</a>
          </Link>
          <Link href="/tiktok">
            <a className="hover:text-gray-300">TikTok Viewer</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
