import "./globals.css";
import MeshBg from "@/components/mesh-bg";

export const metadata = {
  title: "OSIRIS Deploy Console",
  description: "Spin up subdomains in 60 seconds",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white antialiased">
        <MeshBg />
        <div className="relative mx-auto max-w-6xl px-4 py-8">
          <header className="mb-8 flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">OSIRIS Deploy Console</h1>
            <a href="/new" className="text-sm text-white/75 hover:text-white">New App</a>
          </header>
          {children}
          <footer className="mt-12 text-center text-xs text-white/40">© {new Date().getFullYear()} OSIRIS LABS</footer>
        </div>
      </body>
    </html>
  );
}