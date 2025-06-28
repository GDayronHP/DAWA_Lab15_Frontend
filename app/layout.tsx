// app/layout.js
import './globals.css'
import Navbar from '../components/NavBar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto p-4 ">{children}</main>
      </body>
    </html>
  );
}
