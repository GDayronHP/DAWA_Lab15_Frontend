'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function OrdenesPage() {
  const [ordenes, setOrdenes] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ordenes`)
      .then(res => res.json())
      .then(setOrdenes)
  }, [])

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Estás seguro de eliminar esta orden?')
    if (!confirm) return

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ordenes/${id}`, {
      method: 'DELETE'
    })

    setOrdenes(ordenes.filter(o => o.NroOrdenC !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Órdenes de Compra</h1>
        <Link href="/ordenes/create" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Nueva Orden
        </Link>
      </div>
      <div className="space-y-4">
        {ordenes.map(o => (
          <div key={o.NroOrdenC} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="font-semibold">Factura: {o.NrofacturaProv}</h2>
              <p className="text-sm text-gray-600">Total: S/ {o.Total}</p>
              <p className="text-sm text-gray-600">Situación: {o.Situacion}</p>
              <p className="text-sm text-gray-600">Laboratorio ID: {o.CodLab}</p>
            </div>
            <div className="space-x-2">
              <Link href={`/ordenes/edit/${o.NroOrdenC}`} className="text-blue-600 hover:underline">Editar</Link>
              <button onClick={() => handleDelete(o.NroOrdenC)} className="text-red-600 hover:underline">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
