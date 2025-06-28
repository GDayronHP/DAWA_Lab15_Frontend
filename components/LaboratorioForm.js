'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LaboratorioForm({ isEdit = false, id }) {
  const [form, setForm] = useState({
    razonSocial: '',
    direccion: '',
    telefono: '',
    email: '',
    contacto: ''
  })

  const router = useRouter()

  useEffect(() => {
    if (isEdit && id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/laboratorios/${id}`)
        .then(res => res.json())
        .then(data => setForm(data))
    }
  }, [isEdit, id])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const method = isEdit ? 'PUT' : 'POST'
    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_API_URL}/laboratorios/${id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/laboratorios`

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    router.push('/laboratorios')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-center">{isEdit ? 'Editar' : 'Nuevo'} Laboratorio</h2>
      <input name="razonSocial" value={form.razonSocial} onChange={handleChange} placeholder="Razón Social" required className="w-full border px-4 py-2 rounded" />
      <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" required className="w-full border px-4 py-2 rounded" />
      <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" required className="w-full border px-4 py-2 rounded" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="w-full border px-4 py-2 rounded" />
      <input name="contacto" value={form.contacto} onChange={handleChange} placeholder="Persona de contacto" required className="w-full border px-4 py-2 rounded" />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        {isEdit ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  )
}
