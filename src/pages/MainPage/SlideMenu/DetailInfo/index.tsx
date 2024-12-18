import { MyProfileDetailItem } from '@/types'

type DetailInfoType = {
  detailInfo: MyProfileDetailItem
}

export default function DetailInfo({ detailInfo }: DetailInfoType) {
  return (
    <div className="w-full">
      <div className="py-4 rounded-sm h-64 overflow-auto">
        <div className="flex justify-between text-text-default">
          <div className="flex flex-col gap-5 w-1/2">
            <div className="flex gap-4">
              <div className="w-1/3 border-r border-r-text-gray mr-1">사번</div>
              <div className="font-semibold flex-1">
                {detailInfo.employeeId}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3 border-r border-r-text-gray mr-1">취미</div>
              <div className="font-semibold flex-1">
                {detailInfo.userInfo.hobby}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3 border-r border-r-text-gray mr-1">
                특이사항
              </div>
              <div className="font-semibold flex-1">
                {detailInfo.userInfo.significant}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3 border-r border-r-text-gray mr-1">
                결혼 유무
              </div>
              <div className="font-semibold flex-1">
                {detailInfo.userSignificant.maritalStatus ? 'O' : 'X'}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3 border-r border-r-text-gray mr-1">
                평균 수면 시간
              </div>
              <div className="font-semibold flex-1">
                {detailInfo.userSignificant.sllepHours}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/3 border-r border-r-text-gray mr-1">
                만성 질환
              </div>
              <div className="font-semibold flex-1">
                {detailInfo.userSignificant.chronicDiseases.join(', ')}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-1/2">
            <div className="flex gap-4">
              <div className="w-2/5 border-r border-r-text-gray pr-1">
                주민등록번호
              </div>
              <div className="font-semibold flex-1">{`${detailInfo.regNumberFor}-${detailInfo.regNumberLat}`}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-2/5 border-r border-r-text-gray pr-1">
                장거리 유무
              </div>
              <div className="font-semibold flex-1">
                {detailInfo.userInfo.long ? 'O' : 'X'}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2/5 border-r border-r-text-gray pr-1">직종</div>
              <div className="font-semibold flex-1">
                {detailInfo.userSignificant.jobCategory}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2/5 border-r border-r-text-gray pr-1">
                아침 결식 유무
              </div>
              <div className="font-semibold flex-1">
                {detailInfo.userSignificant.skipBreakfast ? 'O' : 'X'}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2/5 border-r border-r-text-gray pr-1">
                흡연 유무
              </div>
              <div className="font-semibold flex-1">
                {detailInfo.userSignificant.smokier ? 'O' : 'X'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
