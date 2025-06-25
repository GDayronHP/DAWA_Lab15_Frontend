// app/layout.js
import './globals.css'
import Navbar from '../components/NavBar'

export const metadata = {
  title: 'CRUD Laboratorio y OrdenCompra',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body className="bg-gray-100 text-gray-800">
        <Navbar />
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
