// components/Navbar.js
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4 mb-4">
      <div className="flex gap-4">
        <Link href="/" className="hover:underline">Inicio</Link>
        <Link href="/laboratorios" className="hover:underline">Laboratorios</Link>
        <Link href="/ordenes" className="hover:underline">Órdenes de Compra</Link>
      </div>
    </nav>
  )
}
