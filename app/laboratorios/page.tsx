'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function LaboratoriosPage() {
  const [labs, setLabs] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/laboratorios')
      .then(res => res.json())
      .then(setLabs)
  }, [])

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este laboratorio?')
    if (!confirm) return

    await fetch(`http://localhost:3001/laboratorios/${id}`, {
      method: 'DELETE'
    })

    setLabs(labs.filter(lab => lab.CodLab !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Laboratorios</h1>
        <Link href="/laboratorios/create" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Nuevo
        </Link>
      </div>
      <div className="space-y-4">
        {labs.map(lab => (
          <div key={lab.CodLab} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">{lab.razonSocial}</h2>
              <p className="text-sm text-gray-600">{lab.direccion}</p>
              <p className="text-sm text-gray-600">{lab.email}</p>
            </div>
            <div className="space-x-2">
              <Link href={`/laboratorios/edit/${lab.CodLab}`} className="text-blue-600 hover:underline">Editar</Link>
              <button onClick={() => handleDelete(lab.CodLab)} className="text-red-600 hover:underline">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
