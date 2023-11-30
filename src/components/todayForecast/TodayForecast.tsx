import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import convertTimestamp from '~/utils/convertTimestamp'
import Card from '../card/Card'
import useContainerDimensions from '~/hooks/useContainerDimensions'
import { useEffect, useRef, useState } from 'react'
import { useGetOneCallQuery } from '~/services/oneCallApi.services'

type Props = { className?: string }

const TodayForecast = ({ className }: Props) => {
  const [show, setShow] = useState<number>(5)
  const ref = useRef(null)
  const { width } = useContainerDimensions(ref)
  const { cityPicker } = useSelector((state: RootState) => state.geoSlice)
  const { data: oneCall } = useGetOneCallQuery({
    lon: cityPicker?.center[0],
    lat: cityPicker?.center[1]
  })

  useEffect(() => {
    width && width <= 400 ? setShow(3) : setShow(5)

    return () => {}
  }, [width])

  return (
    <Card className={`flex-col mb-4 ${className ? className : ''}`} ref={ref}>
      <div className='w-full flex justify-between items-center mb-6'>
        <p className='w-full uppercase text-subHeadline text-secondary'>today's forecast</p>
      </div>

      <div className={`w-full grid ${width <= 400 ? 'grid-cols-3' : 'grid-cols-5'}`}>
        {oneCall?.hourly.map(
          (hour, index: number) =>
            index < show && (
              <div
                key={index}
                className={`col-span-1 flex flex-col justify-center border-solid border-primary-light ${
                  index < show - 1 ? 'border-r' : 'border-none'
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
