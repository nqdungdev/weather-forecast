import { useEffect, ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store'
import { Outlet, useNavigate } from 'react-router-dom'
import { useGetOneCallQuery } from '~/services/oneCallApi.services'
import { setOneCall } from '~/features/weather.slice'
import { searchCity } from '~/features/geo.slice'
import Card from '~/components/card/Card'
import Aside from '~/components/aside/Aside'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useResize from '~/hooks/useResize'

const Dashboard = () => {
  const [showAside, setShowAside] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const { width } = useResize()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { city } = useSelector((state: RootState) => state.geoSlice)
  const { data: oneCall } = useGetOneCallQuery(city.coord)

  useEffect(() => {
    oneCall && dispatch(setOneCall(oneCall))

    return () => {}
  }, [oneCall, dispatch])

  useEffect(() => {
    width >= 1024 ? setShowAside(true) : setShowAside(false)

    return () => {}
  }, [width])

  useEffect(() => {
    const timeoutId = setTimeout(() => dispatch(searchCity(text)), 500)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [dispatch, text])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)

    navigate('/search')
  }

  return (
    <div className='relative w-full py-3 px-4 grid grid-cols-12 bg-primary-dark min-h-screen'>
      <div className='h-full w-full col-span-12 lg:col-span-1 contents lg:block py-2 px-1'>
        {showAside && <Aside />}
      </div>

      <div className='col-span-12 lg:col-span-11'>
        <div className='grid grid-cols-12'>
          <Card className='!rounded-xl !h-[48px] col-span-11 lg:col-span-8'>
            <input
              type='text'
              placeholder='Search for cities'
              className='px-2 m-0 outline-none border-none bg-transparent text-body'
              style={{
                color: 'rgb(221, 224, 228)'
              }}
              onChange={handleChange}
            />
          </Card>
        </div>
        <div className='lg:hidden fixed top-6 right-6'>
          <FontAwesomeIcon
            className='w-6 h-6 cursor-pointer text-secondary hover:animate-spin'
            icon={['fas', 'globe']}
            onClick={() => setShowAside((prev) => (prev = !prev))}
          />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
