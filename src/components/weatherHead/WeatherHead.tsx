import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { useGetWeatherQuery } from '~/services/weatherApi.services'
import Card from '~/components/card/Card'
import { useRef } from 'react'
import useContainerDimensions from '~/hooks/useContainerDimensions'
type Props = { className?: string }
const WeatherHead = ({ className }: Props) => {
  const ref = useRef(null)
  const { width } = useContainerDimensions(ref)
  const { city } = useSelector((state: RootState) => state.geoSlice)
  const { data: weather } = useGetWeatherQuery({ ...city.coord })

  return (
    <Card
      className={`!bg-transparent ${width <= 400 ? 'flex-col !items-start' : 'flex-row'} ${className ? className : ''}`}
      ref={ref}
    >
      <div className={`w-1/2 max-w-[150px] sm:max-w-[250px] h-full ${width <= 400 ? 'order-1' : 'order-2'}`}>
        <img className='w-full' src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} />
      </div>
      <div className={`w-full flex flex-col ${width <= 400 ? 'order-2' : 'order-1'}`}>
        <p className='capitalize text-headline text-secondary-white'>{weather?.name}</p>

        <p className='text-body text-secondary'>Chance of rain: {weather?.rain ? weather?.rain['1h'] : 0}mm/h</p>

        <p className='capitalize text-valueHeadline text-secondary-white'>
          {weather && Math.round(weather.main.temp)}°
        </p>
      </div>
    </Card>
  )
}

export default WeatherHead
