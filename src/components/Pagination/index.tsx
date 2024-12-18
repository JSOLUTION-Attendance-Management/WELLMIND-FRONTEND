import { useState } from 'react'
import { BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi'

import { PaginationItem } from '@/types'

type PaginationProps = PaginationItem & {
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPage,
  onPageChange,
}: PaginationProps) => {
  const [currentGroup, setCurrentGroup] = useState(
    Math.floor((currentPage - 1) / 5)
  )

  const startPage = currentGroup * 5 + 1
  const endPage = Math.min(startPage + 4, totalPage)
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )

  const handlePrevGroup = () => {
    if (currentGroup > 0) {
      setCurrentGroup(currentGroup - 1)
      onPageChange(startPage - 5)
    }
  }

  const handleNextGroup = () => {
    if (endPage < totalPage) {
      setCurrentGroup(currentGroup + 1)
      onPageChange(startPage + 5)
    }
  }

  return (
    <div className="w-full flex gap-3 items-center justify-center">
      <button
        onClick={handlePrevGroup}
        disabled={currentGroup === 0}
        className="disabled:opacity-50"
      >
        <BiSolidChevronLeft className="text-primary-900" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? 'bg-primary-900 text-white'
              : 'border border-primary-900 text-text-default hover:bg-background-default'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNextGroup}
        disabled={endPage === totalPage}
        className="disabled:opacity-50"
      >
        <BiSolidChevronRight />
      </button>
    </div>
  )
}
