import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import Card from '~/components/card/Card'
import convertTimestamp from '~/utils/convertTimestamp'

type Props = {
  days: number
  className?: string
}
const SomeDaysForecast = ({ days, className }: Props) => {
  const { oneCall } = useSelector((state: RootState) => state.weatherSlice)

  return (
    <Card className={`flex-col ${className ? className : ''}`}>
      <p className='text-subHeadline uppercase text-secondary'>{days}-day forecast</p>

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
                <p className='text-body text-secondary'>{index === 0 ? 'Today' : convertTimestamp(daily.dt).weekday}</p>

                <div className='grid grid-cols-2 items-center col-span-3'>
                  <img
                    className='w-22 h-22'
                    src={`https://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`}
                  />
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
    </Card>
  )
}

export default SomeDaysForecast
