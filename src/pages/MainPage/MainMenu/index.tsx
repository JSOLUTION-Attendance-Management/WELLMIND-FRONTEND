import { useNavigate } from 'react-router-dom'

import { MenuButton } from '@/components/MenuButton'

interface MainMenuProps {
  authType: 'M' | 'N'
}

export default function MainMenu({ authType }: MainMenuProps) {
  const navigate = useNavigate()

  return (
    <div
      className="flex flex-col gap-3 mt-3 font-semibold "
      style={{ width: '200px' }}
    >
      <div className="flex items-center">
        <span className="text-text-darkgray">QR 생성</span>
        <div className="flex-1 h-px bg-black-300 ml-1"></div>
      </div>
      <MenuButton
        content="QR 코드 생성"
        color="light"
        onButtonClick={() => {
          navigate('/qr')
        }}
      />
      <div className="flex items-center">
        <span className="text-text-darkgray">회사 기록 조회</span>
        <div className="flex-1 h-px bg-black-300 ml-1"></div>
      </div>
      <MenuButton
        content="출퇴근 기록 조회"
        color="dark"
        onButtonClick={() => {
          navigate('/commute')
        }}
      />
      <MenuButton
        content="인사 이동 기록 조회"
        color="dark"
        onButtonClick={() => {
          navigate('/transfer-dept')
        }}
      />
      {authType === 'M' && (
        <>
          <div className="flex items-center">
            <span className="text-text-darkgray">회사 정보 조회</span>
            <div className="flex-1 h-px bg-black-300 ml-1"></div>
          </div>
          <MenuButton
            content="직원 정보 조회"
            color="dark"
            onButtonClick={() => {
              navigate('/employee-info')
            }}
          />
          <MenuButton
            content="직원 리포트 조회"
            color="dark"
            onButtonClick={() => {
              navigate('/employee-reports')
            }}
          />
        </>
      )}
    </div>
  )
}
