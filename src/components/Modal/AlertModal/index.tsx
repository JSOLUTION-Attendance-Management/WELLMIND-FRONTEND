import { Disclosure, DisclosurePanel } from '@headlessui/react'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  icon: React.ReactNode
  title: string
  description: string
}

export const AlertModal = ({
  isOpen,
  onClose,
  icon,
  title,
  description,
}: ConfirmModalProps) => {
  return (
    <Disclosure
      as="div"
      className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}
    >
      <div
        className="fixed inset-0 z-40 bg-black-700 bg-opacity-30"
        onClick={onClose}
      ></div>
      <div className="flex items-center justify-center min-h-screen">
        <Disclosure>
          <DisclosurePanel
            static
            className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-50"
          >
            <div className="flex flex-col items-start">
              <div className="bg-red-100 text-red-500 p-2 rounded-full mb-4">
                {icon}
              </div>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-sm text-gray-600 mt-2">{description}</p>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                닫기
              </button>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </Disclosure>
  )
}
