import { BiEnvelope, BiHome, BiPencil, BiPhone } from 'react-icons/bi'

import { MyProfileResponse } from '@/types'

type MyInfoProps = {
  profile: MyProfileResponse['data']
}

export default function MyInfo({ profile }: MyInfoProps) {
  return (
    <div className="flex gap-12">
      {profile.photo ? (
        <img
          className="rounded-sm object-cover"
          src={profile.photo}
          alt="myphoto"
          style={{ width: '200px', height: '280px' }}
        />
      ) : (
        <div style={{ width: '200px', height: '280px' }} />
      )}
      <div className="flex justify-between flex-1 relative">
        <div className="flex flex-col gap-6 py-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-text-default">
                {profile.name}
              </div>
              <div
                className={`text-text-white text-xs px-2 py-1 rounded-sm ${
                  profile.authType === 'N'
                    ? 'bg-default-mint'
                    : 'bg-default-lightRed'
                }`}
              >
                {profile.authType === 'N' ? '직원' : '관리자'}
              </div>
            </div>
            <div className="text-primary-400 text-xl font-bold">
              {`${profile.departName} ${profile.positionName}`}
            </div>
          </div>
          <div className="flex flex-col text-lg font-semibold gap-3">
            <div className="flex gap-14">
              <div>
                <div>
                  <BiEnvelope className="w-6 h-6 text-text-gray" />
                </div>
                <div>
                  <div>{profile.email}</div>
                </div>
              </div>
              <div>
                <div>
                  <BiPhone className="w-6 h-6 text-text-gray" />
                </div>
                <div>{profile.phoneNum}</div>
              </div>
            </div>
            <div>
              <div>
                <BiHome className="w-6 h-6 text-text-gray" />
              </div>
              <div>{profile.address?.postalCode}</div>
              <div>{`${profile.address?.address} ${profile.address?.address_detail}`}</div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-8">
          <button className="bg-primary-700 py-1 pl-4 pr-5 text-text-white rounded-md flex items-center gap-2">
            <div>
              <BiPencil className="w-6 h-6" />
            </div>
            수정
          </button>
        </div>
      </div>
    </div>
  )
}
