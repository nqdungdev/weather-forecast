import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from '~/components/card/Card'

type Props = {
  onSeeMore: () => void
}
const AirConditions = ({ onSeeMore }: Props) => {
  const { oneCall } = useSelector((state: RootState) => state.weatherSlice)

  return (
    <Card className='flex-col'>
      <div className='w-full flex justify-between items-center mb-6'>
        <p className='uppercase text-subHeadline text-secondary'>Air conditions</p>

        <button
          className='flex items-center justify-center outline-none rounded-3xl bg-accent-blue border-none py-1 px-4'
          onClick={onSeeMore}
        >
          <span
            className='text-subHeadline font-medium'
            style={{
              color: 'rgb(245, 245, 245)'
            }}
          >
            See more
          </span>
        </button>
      </div>

      <div className='w-full grid grid-cols-2 gap-4'>
        <div className='flex gap-3'>
          <FontAwesomeIcon className='w-6 h-6 text-secondary' icon={['fas', 'thermometer-half']} />
          <div>
            <p className='text-label text-secondary mb-2'>Real Feel</p>
            <p className='text-value text-secondary-light'>{oneCall && Math.round(oneCall.current.feels_like)}°</p>
          </div>
        </div>

        <div className='flex gap-3'>
          <FontAwesomeIcon className='w-6 h-6 text-secondary' icon={['fas', 'tint']} />
          <div>
            <p className='text-label text-secondary mb-2'>Chance of rain</p>
            <p className='text-value text-secondary-light'>
              {oneCall?.current?.rain ? oneCall?.current?.rain['1h'] : 0} mm/h
            </p>
          </div>
        </div>

        <div className='flex gap-3'>
          <FontAwesomeIcon className='w-6 h-6 text-secondary' icon={['fas', 'wind']} />

          <div>
            <p className='text-label text-secondary mb-2'>Wind</p>
            <p className='text-value text-secondary-light'>{oneCall?.current.wind_speed} km/h</p>
          </div>
        </div>

        <div className='flex gap-3'>
          <FontAwesomeIcon className='w-6 h-6 text-secondary' icon={['fas', 'sun']} />

          <div>
            <p className='text-label text-secondary mb-2'>UV Index</p>
            <p className='text-value text-secondary-light'>{oneCall?.current.uvi}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AirConditions
