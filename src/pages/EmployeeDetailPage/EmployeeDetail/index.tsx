import { useGetEmployeeDetail } from '@/api/services/admin/employeeDetail.api'
import LoadingPage from '@/pages/LoadingPage'

type EmployeeDetailType = {
  employeeId: string
}

export default function EmployeeDetail({ employeeId }: EmployeeDetailType) {
  const {
    data: EmployeeDetail,
    isLoading,
    error,
  } = useGetEmployeeDetail(employeeId)

  if (isLoading) return <LoadingPage />
  if (error) throw Error()
  if (!EmployeeDetail) alert('직원 정보가 없어요.')

  return (
    <div className="relative flex flex-col w-full h-full mx-10">
      <div className="absolute w-full h-40 bg-background-default z-20" />
      <div className="flex text-text-default gap-10 w-full z-40 mt-20 items-center mx-10">
        <img
          className="w-40 h-40 object-cover rounded-full"
          src={EmployeeDetail?.userInfo?.photo}
          alt="employeePhoto"
        />
        <div className="flex gap-1 flex-col w-full pb-2 mt-2.5">
          <div className="text-3xl font-bold">
            {EmployeeDetail?.userTopDto?.name}
          </div>
          <div className="flex gap-3 text-xl font-semibold">
            <div>{EmployeeDetail?.departName}</div>
            <div>{EmployeeDetail?.positionName}</div>
          </div>
          <div className="flex flex-col">
            <div>사번 : {EmployeeDetail?.userTopDto?.employeeId}</div>
            <div>이메일 : {EmployeeDetail?.userTopDto?.email}</div>
            <div>전화번호 : {EmployeeDetail?.userTopDto?.phoneNum}</div>
          </div>
        </div>
      </div>
      <div className="mt-7 font-semibold text-lg mx-60">주소</div>
      <div
        className="my-2 bg-text-darkgray ml-60"
        style={{ height: '1.5px' }}
      />
      <div className="mx-60 flex flex-col gap-2">
        <div className="flex gap-3">
          <div className="w-32 font-semibold text-center border-r border-gray-300">
            우편번호
          </div>
          {EmployeeDetail?.userInfo?.address.postalCode}
        </div>
        <div className="flex gap-3">
          <div className="w-32 font-semibold text-center border-r border-gray-300">
            기본주소
          </div>
          {EmployeeDetail?.userInfo?.address.address}
        </div>
        <div className="flex gap-3">
          <div className="w-32 font-semibold text-center border-r border-gray-300">
            상세주소
          </div>
          {EmployeeDetail?.userInfo?.address.address_detail}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="ml-60">
          <div className="mt-10 font-semibold text-lg">학력</div>
          <div
            className="my-2 bg-text-darkgray w-96"
            style={{ height: '1.5px' }}
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <div className="w-32 font-semibold text-center border-r border-gray-300">
                학사
              </div>
              -
            </div>
            <div className="flex gap-3">
              <div className="w-32 font-semibold text-center border-r border-gray-300">
                석사
              </div>
              -
            </div>
            <div className="flex gap-3">
              <div className="w-32 font-semibold text-center border-r border-gray-300">
                박사
              </div>
              -
            </div>
          </div>
        </div>
        <div>
          <div className="mt-10 font-semibold text-lg">특이사항</div>
          <div
            className="my-2 bg-text-darkgray w-96"
            style={{ height: '1.5px' }}
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <div className="w-32 font-semibold text-center border-r border-gray-300">
                입사날짜
              </div>{' '}
              {EmployeeDetail?.userInfo?.hireDate}
            </div>
            <div className="flex gap-3">
              <div className="w-32 font-semibold text-center border-r border-gray-300">
                장거리 유무
              </div>
              {EmployeeDetail?.userInfo?.long ? 'O' : 'X'}
            </div>
            <div className="flex gap-3">
              <div className="w-32 font-semibold text-center border-r border-gray-300">
                취미
              </div>
              {EmployeeDetail?.userInfo?.hobby}
            </div>
            <div className="flex gap-3">
              <div className="w-32 font-semibold text-center border-r border-gray-300">
                특이사항
              </div>
              {EmployeeDetail?.userInfo?.significant}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
