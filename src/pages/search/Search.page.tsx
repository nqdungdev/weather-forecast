import { useSelector } from 'react-redux'
import { useGetCitiesQuery } from '~/services/geoApi.services'
import { RootState } from '~/store'
import DetailCity from './detail/DetailCity'
import SearchItem from './searchItem/SearchItem'

const Search = () => {
  const { searchText } = useSelector((state: RootState) => state.geoSlice)
  const { data: cities } = useGetCitiesQuery(searchText)

  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-8'>{cities?.data.map((item) => <SearchItem key={item.id} item={item} />)}</div>

      <div className='col-span-4'>
        <DetailCity />
      </div>
    </div>
  )
}

export default Search
