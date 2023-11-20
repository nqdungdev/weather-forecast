import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import convertTimestamp from '~/utils/convertTimestamp'
import Card from '../card/Card'

type Props = { shows: number; className?: string }

const TodayForecast = ({ shows, className }: Props) => {
  const { oneCall } = useSelector((state: RootState) => state.weatherSlice)

  return (
    <Card className={`flex-col mb-4 ${className ? className : ''}`}>
      <div className='w-full flex justify-between items-center mb-6'>
        <p className='w-full uppercase text-subHeadline text-secondary'>today's forecast</p>
      </div>

      <div className={`w-full grid ${shows === 3 ? 'grid-cols-3' : 'grid-cols-5'}`}>
        {oneCall?.hourly.map(
          (hour, index: number) =>
            index < shows && (
              <div
                key={index}
                className={`col-span-1 flex flex-col justify-center border-solid border-primary-light ${
                  index < shows - 1 ? 'border-r' : 'border-none'
                }`}
              >
                <p className='text-body font-semibold text-center text-secondary'>{convertTimestamp(hour.dt).time}</p>
                <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} />
                <p
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  <span style={{ color: '#dde0e4ff' }}>{Math.round(hour.temp)}°</span>
                </p>
              </div>
            )
        )}
      </div>
    </Card>
  )
}

export default TodayForecast
