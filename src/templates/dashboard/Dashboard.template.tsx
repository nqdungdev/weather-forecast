import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/store'
import { Outlet } from 'react-router-dom'
import Card from '~/components/card/Card'
import Aside from '~/components/aside/Aside'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useResize from '~/hooks/useResize'
import { GeocodingControl } from '@maptiler/geocoding-control/react'
import type { Feature } from 'geojson'
import { pickCity, setCityListed } from '~/features/geo.slice'
// import { MapController } from 'node_modules/@maptiler/geocoding-control/types'

const Dashboard = () => {
  const [showAside, setShowAside] = useState<boolean>(false)
  // const [mapController, setMapController] = useState<MapController>()
  const { width } = useResize()
  // const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    width >= 1024 ? setShowAside(true) : setShowAside(false)

    return () => {}
  }, [width])

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
    <div className='relative w-full py-3 px-4 grid grid-cols-12 bg-primary-dark min-h-screen'>
      <div className='h-full w-full col-span-12 lg:col-span-1 contents lg:block py-2 px-1'>
        {showAside && <Aside />}
      </div>

      <div className='col-span-12 lg:col-span-11'>
        <div className='grid grid-cols-12'>
          <Card className='w-full !rounded-xl !h-[48px] col-span-11 lg:col-span-8 geo--config !overflow-visible !z-30'>
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
        <div className='lg:hidden fixed top-6 right-6 z-50'>
          <FontAwesomeIcon
            className='w-6 h-6 cursor-pointer text-secondary hover:animate-spin'
            icon={['fas', 'globe']}
            onClick={() => setShowAside((prev) => (prev = !prev))}
          />
        </div>
        {/* context={[mapController, setMapController]} */}
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
