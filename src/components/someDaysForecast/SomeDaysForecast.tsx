import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import Card from '~/components/card/Card'
import convertTimestamp from '~/utils/convertTimestamp'
import { useGetOneCallQuery } from '~/services/oneCallApi.services'
import convertIcons from '~/utils/convertIcons'
import Skeleton from '../skeleton/Skeleton'

type Props = {
  days: number
  className?: string
}
const SomeDaysForecast = ({ days, className }: Props) => {
  const { cityPicker } = useSelector((state: RootState) => state.geoSlice)
  const { data: oneCall, isLoading } = useGetOneCallQuery({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lon: (cityPicker as any).center[0],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lat: (cityPicker as any).center[1]
  })

  return (
    <Card className={`flex-col ${className ? className : ''}`}>
      <p className='text-subHeadline uppercase text-secondary'>{days}-day forecast</p>
      {isLoading ? (
        <Skeleton className='flex-col' />
      ) : (
        <div className='w-full'>
          {oneCall?.daily.map(
            (daily, index: number) =>
              index < days && (
                <div
                  key={index}
                  className={`grid grid-cols-5 gap-1 border-solid border-primary-light items-center ${
                    index < days - 1 ? 'border-b' : 'border-none'
                  }`}
                >
                  <p className='text-body text-secondary'>
                    {index === 0 ? 'Today' : convertTimestamp(daily.dt).weekday}
                  </p>
                  <div className='grid grid-cols-2 items-center col-span-3'>
                    <img className='w-full' src={convertIcons(daily.weather[0].id)} />
                    <p className='text-body font-semibold text-secondary-light'>{daily.weather[0].description}</p>
                  </div>

                  <p className='text-body text-end'>
                    <span className='text-secondary-light font-semibold'>{Math.round(daily.temp.max)}</span>
                    <span className='text-secondary'>/{Math.round(daily.temp.min)}</span>
                  </p>
                </div>
              )
          )}
        </div>
      )}
    </Card>
  )
}

export default SomeDaysForecast
