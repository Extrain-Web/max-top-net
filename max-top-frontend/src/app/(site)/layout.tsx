import SiteProvider from '@/components/site/SiteProvider';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import FloatingButtons from '@/components/site/FloatingButtons';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteProvider>
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
      <FloatingButtons />
    </SiteProvider>
  );
}
