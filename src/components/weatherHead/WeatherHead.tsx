import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import Card from '~/components/card/Card'
import { useRef } from 'react'
import useContainerDimensions from '~/hooks/useContainerDimensions'
import convertIcons from '~/utils/convertIcons'
import { useGetOneCallQuery } from '~/services/oneCallApi.services'
type Props = { className?: string }
const WeatherHead = ({ className }: Props) => {
  const ref = useRef(null)
  const { width } = useContainerDimensions(ref)
  const { cityPicker } = useSelector((state: RootState) => state.geoSlice)

  const { data: oneCall } = useGetOneCallQuery({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lon: (cityPicker as any).center[0],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lat: (cityPicker as any).center[1]
  })

  return (
    <Card
      className={`!bg-transparent ${width <= 400 ? 'flex-col !items-center' : 'flex-row'} ${
        className ? className : ''
      }`}
      ref={ref}
    >
      <div className={`w-1/2 max-w-[150px] sm:max-w-[250px] h-full ${width <= 400 ? 'order-1' : 'order-2'}`}>
        <img
          className='w-full'
          src={
            oneCall?.current &&
            (oneCall.current.dt < oneCall.current.sunrise && oneCall.current.dt > oneCall.current.sunset
              ? convertIcons(oneCall.current.weather[0].id)
              : convertIcons(oneCall.current.weather[0].id, false))
          }
        />
      </div>
      <div className={`w-full flex flex-col ${width <= 400 ? 'order-2 !items-center' : 'order-1'}`}>
        <p className={`capitalize text-headline text-secondary-white ${width <= 400 ? 'text-center' : 'text-start'}`}>
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (cityPicker as any)?.place_name_en.split(',')[0]
          }
        </p>
        <p className={`capitalize text-body text-secondary-light mb-1 ${width <= 400 ? 'text-center' : 'text-start'}`}>
          {// eslint-disable-next-line @typescript-eslint/no-explicit-any
          (cityPicker as any)?.place_name_en.split(',').slice(1).join(',')}
        </p>

        <p className='text-body text-secondary'>
          Chance of rain: {oneCall?.daily[0]?.rain ? oneCall.daily[0].rain : 0}mm/h
        </p>

        <p className='capitalize text-valueHeadline text-secondary-white'>
          {oneCall?.current && Math.round(oneCall.current.temp)}°
        </p>
      </div>
    </Card>
  )
}

export default WeatherHead
