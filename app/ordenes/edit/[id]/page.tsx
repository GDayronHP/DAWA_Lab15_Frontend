import OrdenForm from '../../../../components/OrdenForm'
export default function EditOrdenPage({ params }: {params: any}) {
  return <OrdenForm isEdit id={params.id} />
}