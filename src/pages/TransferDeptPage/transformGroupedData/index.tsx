import { TransferDeptTable, TransferItem } from '@/types'

type GroupedData = {
  transferData: TransferItem[]
}

export function transformGroupedData(
  transferData: GroupedData
): TransferDeptTable {
  return transferData.transferData.map((group) => {
    const previous = group.previousPosition ? group.previousPosition : '-'

    return {
      id: group.id.toString(),
      type: group.transferType,
      date: group.modDate,
      previous,
      update: group.newPosition,
      reason: group.transferReason,
      recipient: group.managerName,
    }
  })
}
