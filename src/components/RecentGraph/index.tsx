import dottedLine from '@/assets/dottedLine.svg'
import { ReportColors } from '@/components/utils/ReportColors'

type DataType = {
  text: string
}

type RecentGraphProps = {
  data: DataType[]
}

export default function RecentGraph({ data }: RecentGraphProps) {
  const itemWidth = `${100 / data.length}%`

  return (
    <div className="w-full h-full flex justify-center items-center gap-1 mt-12">
      {data.map((item, index) => {
        const isFirst = index === 0
        const isLast = index === data.length - 1
        const roundedClass = `${isFirst ? 'rounded-l-lg' : ''} ${isLast ? 'rounded-r-lg' : ''}`

        const isEven = index % 2 !== 0

        return (
          <div
            key={index}
            style={{ flexBasis: itemWidth }}
            className="flex flex-col justify-center items-center text-center"
          >
            {!isEven ? (
              <>
                <div
                  className={`flex flex-col justify-center items-center font-semibold text-text-white w-24 h-16 ${ReportColors(item.text)} rounded-full p-2`}
                >
                  {item.text.split(/, (?![^,]*$)/).map((phrase, index) => (
                    <span key={index}>{phrase}</span>
                  ))}
                </div>
                <img className="h-10" src={dottedLine} alt="dottedLine" />
              </>
            ) : (
              <>
                <div className="h-16" />
                <div className="h-10" />
              </>
            )}
            <div
              className={`w-full h-6 ${ReportColors(item.text)} ${roundedClass}`}
            />
            {isEven ? (
              <>
                <img className="h-10" src={dottedLine} alt="dottedLine" />
                <div
                  className={`flex flex-col justify-center items-center font-semibold text-text-white w-24 h-16 ${ReportColors(item.text)} rounded-full p-2`}
                >
                  {item.text.split(' ').map((word, index) => (
                    <span key={index}>{word}</span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="h-10" />
                <div className="h-16" />
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
