import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { useGetWeatherQuery } from '~/services/weatherApi.services'
import Card from '~/components/card/Card'
type Props = { className?: string }
const WeatherHead = ({ className }: Props) => {
  const { city } = useSelector((state: RootState) => state.weatherSlice)
  const { data: weather } = useGetWeatherQuery({ ...city.coord })
  return (
    <Card className={`!bg-transparent p-6 ${className ? className : ''}`}>
      <div className='flex flex-col'>
        <p className='capitalize text-headline text-secondary-white'>{weather?.name}</p>

        <p className='text-body text-secondary'>Chance of rain: {weather?.rain ? weather?.rain['1h'] : 0}mm/h</p>

        <p className='capitalize text-valueHeadline text-secondary-white'>
          {weather && Math.round(weather.main.temp)}°
        </p>
      </div>

      <div className='w-1/3 h-full'>
        <img className='w-full' src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} />
      </div>
    </Card>
  )
}

export default WeatherHead
