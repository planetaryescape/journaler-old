import { BackgroundGradient } from "@/components/background-gradient";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileHeader } from "@/components/mobile-header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="row-span-1 relative">{children}</main>
      <MobileHeader />
      <Footer />

      <BackgroundGradient degrees={Math.random() * 360} />
    </div>
  );
}
