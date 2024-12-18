import { useGetMyProfile } from '@/api/services/profile/myProfile'
import LoadingPage from '@/pages/LoadingPage'

import MainMenu from './MainMenu'
import MyInfo from './MyInfo'
import SlideMenu from './SlideMenu'

export default function MainPage() {
  const { data: Profile, isLoading, isFetching, error } = useGetMyProfile()

  if (isLoading || isFetching) return <LoadingPage />
  if (error) throw Error
  if (!Profile) return '프로필이 없습니다...'

  return (
    <div className="flex flex-col w-full">
      <MyInfo profile={Profile} />
      <div className="flex gap-12">
        <MainMenu authType={Profile.authType} />
        <SlideMenu />
      </div>
    </div>
  )
}
