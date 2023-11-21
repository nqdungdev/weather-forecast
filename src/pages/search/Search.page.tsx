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
      <div className='col-span-12 md:col-span-8'>
        {cities?.data.length === 0 ? (
          <div className='flex flex-col my-5 h-full justify-center items-center'>
            <span className='flex justify-center text-headline text-secondary pb-3'> X__X </span>
            <span className='text-secondary-white flex justify-center text-subHeadline'>No matching cities</span>
          </div>
        ) : (
          cities?.data.map((item) => <SearchItem key={item.id} item={item} />)
        )}
      </div>

      <div className='hidden md:block col-span-4'>
        <DetailCity />
      </div>
    </div>
  )
}

export default Search
