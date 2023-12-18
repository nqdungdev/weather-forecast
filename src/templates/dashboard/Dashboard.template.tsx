import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/store'
import { Outlet } from 'react-router-dom'
import Card from '~/components/card/Card'
import Aside from '~/components/aside/Aside'
import { GeocodingControl } from '@maptiler/geocoding-control/react'
import type { Feature } from 'geojson'
import { pickCity, setCityListed } from '~/features/geo.slice'
import { useGetIPAddressQuery } from '~/services/IPAddressApi.services'
import { useGetLocationCityQuery, useGetLocationLatLngQuery } from '~/services/locationIPApi.services'
// import { MapController } from 'node_modules/@maptiler/geocoding-control/types'

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: ip } = useGetIPAddressQuery()
  const { data: latLng } = useGetLocationLatLngQuery(ip || '118.69.244.151')
  const { data: city } = useGetLocationCityQuery(ip || '118.69.244.151')

  useEffect(() => {
    latLng &&
      city &&
      dispatch(pickCity({ center: [Number(latLng.split(',')[1]), Number(latLng.split(',')[0])], place_name_en: city }))

    return () => {}
  }, [city, latLng, dispatch])

  // const [mapController, setMapController] = useState<MapController>()
  // const navigate = useNavigate()

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setText(event.target.value)

  //   navigate('/search')
  // }

  const pickCityHandler = (event: Feature | undefined) => {
    event && dispatch(pickCity(event))
  }

  const featuresListedHandler = (event: Feature[] | undefined) => {
    event && dispatch(setCityListed(event))
  }

  // const handleMapController = useCallback((data: MapController) => {
  //   setMapController(data)
  // }, [])

  return (
    <div className='relative w-full py-3 px-4 grid grid-cols-12 bg-primary-dark min-h-screen bg-hero-pattern bg-cover'>
      <div className='lg:h-full w-full col-span-12 lg:col-span-1 lg:py-2'>
        <Aside />
      </div>

      <div className='col-span-12 lg:col-span-11'>
        <div className='grid grid-cols-12'>
          <Card className='!rounded-xl !h-[48px] col-span-12 lg:col-span-8 geo--config !overflow-visible !z-30'>
            <GeocodingControl
              class='!bg-transparent !w-full !max-w-full !z-30 !text-secondary-white geo-input--config'
              placeholder='Search for cities'
              apiKey={import.meta.env.VITE_MAPTILER_API_KEY}
              onPick={pickCityHandler}
              onFeaturesListed={featuresListedHandler}
              minLength={1}
              // mapController={mapController}
            />
          </Card>
        </div>

        {/* context={[mapController, setMapController]} */}
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
