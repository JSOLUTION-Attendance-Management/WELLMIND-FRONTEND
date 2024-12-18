import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { ProfileCard } from '@/components/ProfileCard'
import { SimpleEmployeeItem } from '@/types'

import '../employeeInfo.css'

function PrevArrow({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <BiChevronLeft
      className={`${className} w-12 h-12 text-text-gray hover:text-text-default absolute -left-10`}
      onClick={onClick}
    />
  )
}

function NextArrow({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <BiChevronRight
      className={`${className} w-12 h-12 text-text-gray hover:text-text-default absolute -right-10`}
      onClick={onClick}
    />
  )
}

type EmployeeSliderType = {
  setConfirmIsOpen: () => void
  setSelectEmployeeId: (id: string) => void
  departName: string
  employees: SimpleEmployeeItem[]
}

export default function EmployeeSlider({
  setConfirmIsOpen,
  setSelectEmployeeId,
  departName,
  employees,
}: EmployeeSliderType) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  }

  return (
    <div>
      <div className="text-xl text-text-default font-semibold">
        {departName}
      </div>
      <div className="flex items-center justify-center">
        <div className="flex w-11/12">
          {employees.length > 5 ? (
            <Slider
              {...settings}
              className="w-full flex [&_.slick-track]:flex [&_.slick-track]:gap-1 [&_.slick-slide]:flex [&_.slick-slide]:justify-center [&_.slick-slide]:items-center [&_.slick-slide]:w-auto"
            >
              {employees.map((employee, index) => (
                <ProfileCard
                  key={index}
                  id={employee.employeeId}
                  name={employee.name}
                  photo={employee.photo}
                  email={employee.email}
                  buttonMod="MESSAGE"
                  onButtonClick={() => {
                    setConfirmIsOpen()
                    setSelectEmployeeId(employee.employeeId)
                  }}
                  onClick={() => {
                    setConfirmIsOpen()
                    setSelectEmployeeId(employee.employeeId)
                  }}
                />
              ))}
            </Slider>
          ) : (
            employees.map((employee, index) => (
              <ProfileCard
                key={index}
                id={employee.employeeId}
                name={employee.name}
                photo={employee.photo}
                email={employee.email}
                buttonMod="MESSAGE"
                onButtonClick={() => {
                  setConfirmIsOpen()
                  setSelectEmployeeId(employee.employeeId)
                }}
                onClick={() => {
                  setConfirmIsOpen()
                  setSelectEmployeeId(employee.employeeId)
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
