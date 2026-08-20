import { Navigation } from '../components/Navigation';
import './globals.css';

export const metadata = {
  title: 'Orvyn',
  description: 'Find your people. Build your space. Belong somewhere.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
          <Navigation />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
