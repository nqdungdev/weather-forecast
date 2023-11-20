import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store'
import { useGetWeatherQuery } from '~/services/weatherApi.services'
import { selectCity } from '~/features/geo.slice'
import { IGeoData } from '~/interfaces/geo.interfaces'
import convertTimestamp from '~/utils/convertTimestamp'
import Card from '~/components/card/Card'
import Skeleton from '~/components/skeleton/Skeleton'

type Props = { item: IGeoData }

const SearchItem = ({ item }: Props) => {
  const { data, isLoading } = useGetWeatherQuery({ lat: item.latitude, lon: item.longitude })
  const { city } = useSelector((state: RootState) => state.geoSlice)
  const dispatch = useDispatch<AppDispatch>()
  const handleClick = () => {
    data && dispatch(selectCity({ id: data.id, coord: data.coord, name: data.name }))
  }

  console.log(item)
  console.log(data)
  return isLoading ? (
    <Card>
      <Skeleton />
    </Card>
  ) : (
    <Card
      className={`cursor-pointer ${
        data && city.id === data.id ? '!bg-transparent !border-solid border border-accent-blue' : ''
      }`}
      onClick={handleClick}
    >
      <div className='w-full flex gap-2 items-center justify-between !py-0'>
        <div className='flex items-center'>
          <img
            className='w-16 h-16 sm:w-20 sm:h-20'
            src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
          />
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
