import TikTokViewer from '@/components/ui/tiktok-viewer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TikTok Viewer',
  description: 'View and manage your TikTok videos.',
};

export default function TikTokPage() {
  return (
    <main className="min-h-screen p-8">
      <TikTokViewer />
    </main>
  );
}
