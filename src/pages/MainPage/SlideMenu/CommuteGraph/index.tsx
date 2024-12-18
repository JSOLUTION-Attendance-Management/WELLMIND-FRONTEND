import { Graph } from '@/components/Graph'

type CommuteGraphTypes = {
  time: string[]
  date: string[]
}

export default function CommuteGraph({ time, date }: CommuteGraphTypes) {
  return (
    <div className="flex py-1 mx-20 rounded-md align-center bg-background-light">
      <div className="mx-auto">
        <Graph type="big" time={time} date={date} />
      </div>
    </div>
  )
}
