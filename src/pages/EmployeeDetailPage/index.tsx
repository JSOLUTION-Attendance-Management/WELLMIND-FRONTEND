import { useParams } from 'react-router-dom'

import EmployeeDetail from '@/pages/EmployeeDetailPage/EmployeeDetail'

export default function EmployeeDetailPage() {
  const { employeeId } = useParams<{ employeeId: string }>()
  if (!employeeId || employeeId === undefined) throw Error()

  return <EmployeeDetail employeeId={employeeId} />
}
