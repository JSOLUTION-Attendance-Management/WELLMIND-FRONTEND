import ReactMarkdown from 'react-markdown'

import { Disclosure, DisclosurePanel } from '@headlessui/react'

import { Keyword } from '@/components/Keyword'
import { MyReportDetailItem } from '@/types'

interface DetailReportBoxType {
  isOpen: boolean
  onClose: () => void
  report: MyReportDetailItem
}

export const DetailReportBox = ({
  isOpen,
  onClose,
  report,
}: DetailReportBoxType) => {
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
            className="bg-white rounded-lg shadow-xl max-w-md p-6 z-50 max-w-none w-2/3 my-1 text-text-default"
            style={{ maxHeight: '600px' }}
          >
            <div
              className="flex flex-col items-start overflow-y-auto"
              style={{ height: '500px' }}
            >
              <div className="flex gap-2 mb-4 items-center">
                <div className="bg-red-100 px-2 py-1 text-2xl rounded-full">
                  🔥
                </div>
                <div className="text-text-default text-2xl font-semibold">
                  {report.data.reportType}
                </div>
              </div>
              <div className="flex flex-col text-text-darkgray text-xs gap-1">
                <div>{`레포트 id: ${report.data.reportId}`}</div>
                <div>{`레포트 대상: ${report.data.reportedEmployeeName}`}</div>
                <div>{`레포트 생성 날짜: ${report.data.registeredDate}`}</div>
              </div>
              <div
                className="w-full bg-text-gray mt-8"
                style={{ height: '0.5px' }}
              />
              <h2 className="text-lg font-semibold my-4">{`🤖 AI 웰니스 리포트`}</h2>
              <div>
                <ReactMarkdown className="text-text-default leading-relaxed">
                  {report.data.aiComment}
                </ReactMarkdown>
              </div>
              <div className="flex flex-col my-2">
                <h2 className="text-lg font-semibold my-4">🧩 키워드</h2>
                <div className="flex flex-wrap">
                  {report.data.keywords.flat().map((keyword) => (
                    <Keyword keyword={keyword} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col my-2">
                <h2 className="text-lg font-semibold my-4">🕴️ 관리자 코멘트</h2>
                <div>{report.data.managerComment}</div>
              </div>
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
