import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Play, Pray, Grow",
  description: "Home-based learning planner"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="min-h-screen">
          <header className="bg-cream border-b">
            <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-leaf flex items-center justify-center text-white font-bold">PPG</div>
                <div>
                  <h1 className="text-xl font-bold">Play, Pray, Grow</h1>
                  <p className="text-sm text-slate-600">Home-Based Learning</p>
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>

          <footer className="border-t mt-10 bg-white">
            <div className="max-w-4xl mx-auto px-4 py-6 text-sm text-slate-500">
              Built with ♥ for family learning.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
