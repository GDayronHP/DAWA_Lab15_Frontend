import LaboratorioForm from '../../../../components/LaboratorioForm'

export default function EditLabPage({ params }: {params: any}) {
  return <LaboratorioForm isEdit id={params.id} />
}
