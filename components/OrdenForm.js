'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OrdenForm({ isEdit = false, id }) {
  const [form, setForm] = useState({
    fechaEmision: '',
    Situacion: '',
    Total: '',
    CodLab: '',
    NrofacturaProv: ''
  })
  const [labs, setLabs] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:3001/laboratorios')
      .then(res => res.json())
      .then(setLabs)

    if (isEdit && id) {
      fetch(`http://localhost:3001/ordenes/${String(id)}`)
        .then(res => res.json())
        .then(data => {
          // Asegura el formato YYYY-MM-DD para el input tipo date
          const fecha = data.fechaEmision?.slice(0, 10) || ''
          setForm({ ...data, fechaEmision: fecha })
        })
    }
  }, [isEdit, id])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const method = isEdit ? 'PUT' : 'POST'
    const url = isEdit
      ? `http://localhost:3001/ordenes/${id}`
      : `http://localhost:3001/ordenes`

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    router.push('/ordenes')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-center">{isEdit ? 'Editar' : 'Nueva'} Orden de Compra</h2>
      <input name="fechaEmision" type="date" value={form.fechaEmision} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
      <select name="Situacion" value={form.Situacion} onChange={handleChange} required className="w-full border px-4 py-2 rounded">
        <option value="">Seleccione una situación</option>
        <option value="Pendiente">Pendiente</option>
        <option value="Emitida">Emitida</option>
        <option value="Anulada">Anulada</option>
      </select>
      <input name="Total" type="number" value={form.Total} onChange={handleChange} placeholder="Total" required className="w-full border px-4 py-2 rounded" />
      <select name="CodLab" value={form.CodLab} onChange={handleChange} required className="w-full border px-4 py-2 rounded">
        <option value="">Seleccione un Laboratorio</option>
        {labs.map(l => (
          <option key={l.CodLab} value={l.CodLab}>{l.razonSocial}</option>
        ))}
      </select>
      <input name="NrofacturaProv" value={form.NrofacturaProv} onChange={handleChange} placeholder="N° de factura del proveedor" required className="w-full border px-4 py-2 rounded" />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        {isEdit ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  )
}
