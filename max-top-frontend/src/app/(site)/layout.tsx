import SiteProvider from '@/components/site/SiteProvider';
import ConnectionProvider from '@/components/site/ConnectionModal';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import FloatingButtons from '@/components/site/FloatingButtons';
import LiveChat from '@/components/site/LiveChat';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteProvider>
      <ConnectionProvider>
        <Header />
        <main className="main-content">{children}</main>
        <Footer />
        <FloatingButtons />
        <LiveChat />
      </ConnectionProvider>
    </SiteProvider>
  );
}
