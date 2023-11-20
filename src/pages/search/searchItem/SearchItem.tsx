import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/store'
import { useGetWeatherQuery } from '~/services/weatherApi.services'
import { selectCity } from '~/features/weather.slice'
import { IGeoData } from '~/interfaces/geo.interfaces'
import convertTimestamp from '~/utils/convertTimestamp'
import Card from '~/components/card/Card'
import Skeleton from '~/components/skeleton/Skeleton'

type Props = { item: IGeoData }

const SearchItem = ({ item }: Props) => {
  const { data, isLoading } = useGetWeatherQuery({ lat: item.latitude, lon: item.longitude })

  const dispatch = useDispatch<AppDispatch>()
  const handleClick = () => {
    data && dispatch(selectCity({ coord: data.coord, name: data.name }))
  }
  return isLoading ? (
    <Card>
      <Skeleton />
    </Card>
  ) : (
    <Card className='cursor-pointer' onClick={handleClick}>
      <div className='w-full flex gap-2 items-center justify-between !py-0'>
        <div className='flex items-center'>
          <img className='w-20 h-20' src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} />
          <div>
            <p className='text-secondary-light text-value mb-1'>{data?.name}</p>
            <p className='text-secondary text-label'>{data && convertTimestamp(data.dt).time}</p>
          </div>
        </div>

        <p className='text-[#dde0e4ff] text-[40px]'>{data && Math.round(data.main.temp)}°</p>
      </div>
    </Card>
  )
}

export default SearchItem
