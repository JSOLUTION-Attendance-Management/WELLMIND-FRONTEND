import { CommuteItem, CommuteReportTable } from '@/types'

type GroupedData = {
  date: string
  items: CommuteItem[]
}[]

export function transformGroupedData(
  groupedData: GroupedData
): CommuteReportTable {
  return groupedData.map((group) => {
    const items = group.items

    const NA = items.find((item) => item.attendStatus === 'NA')
    const NL = items.find((item) => item.attendStatus === 'NL')
    const LA = items.find((item) => item.attendStatus === 'LA')
    const LL = items.find((item) => item.attendStatus === 'LL')
    const AB = items.find((item) => item.attendStatus === 'AB')
    const VC = items.find((item) => item.attendStatus === 'VC')
    const BT = items.find((item) => item.attendStatus === 'BT')
    const EL = items.find((item) => item.attendStatus === 'EL')

    let type = ''
    let goTime = '-'
    let leaveTime = '-'
    let isLate = false

    if (AB) {
      type = '결근'
    } else if (VC) {
      type = '휴가'
    } else if (BT) {
      type = '출장'
    } else if (NA && NL) {
      type = '정상 근무'
      goTime = NA.time
      leaveTime = NL.time
    } else if (NA && LL) {
      type = '야근'
      goTime = NA.time
      leaveTime = LL.time
    } else if (LA && NL) {
      type = '지각'
      goTime = LA.time
      leaveTime = NL.time
      isLate = true
    } else if (LA && LL) {
      type = '지각 및 야근'
      goTime = LA.time
      leaveTime = LL.time
      isLate = true
    } else if (NA && EL) {
      type = '조퇴'
      goTime = NA.time
      leaveTime = EL.time
      isLate = false
    } else if (LA && EL) {
      type = '지각 및 조퇴'
      goTime = LA.time
      leaveTime = EL.time
      isLate = true
    }

    return {
      id: group.date,
      date: group.date,
      type,
      goTime,
      leaveTime,
      isLate,
    }
  })
}
