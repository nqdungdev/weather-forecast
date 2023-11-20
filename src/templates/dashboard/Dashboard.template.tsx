import { useEffect, ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store'
import { Outlet, useNavigate } from 'react-router-dom'
import { useGetOneCallQuery } from '~/services/oneCallApi.services'
import { setOneCall } from '~/features/weather.slice'
import { search } from '~/features/geo.slice'
import Card from '~/components/card/Card'
import Aside from '~/components/aside/Aside'

const Dashboard = () => {
  const [text, setText] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { city } = useSelector((state: RootState) => state.weatherSlice)
  const { data: oneCall } = useGetOneCallQuery(city.coord)

  useEffect(() => {
    oneCall && dispatch(setOneCall(oneCall))

    return () => {}
  }, [oneCall, dispatch])

  useEffect(() => {
    const timeoutId = setTimeout(() => dispatch(search(text)), 500)
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
      <div className='h-full w-full col-span-1'>
        <Aside />
      </div>

      <div className='col-span-11'>
        <div className='grid grid-cols-12'>
          <Card className='!rounded-xl !h-[48px] col-span-8'>
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

        <Outlet />

        <div className='grid grid-cols-12'>
          {/* <div className='col-span-8'>
            <Weather />

            <Card className='flex-col'>
              <p className='w-full uppercase text-subHeadline text-secondary'>today's forecast</p>

              <div className='w-full grid grid-cols-5'>
                {data?.list.map(
                  (item: IForecastThreeHour, index: number) =>
                    index < 5 && (
                      <div
                        key={index}
                        className={`col-span-1 flex flex-col justify-center border-solid border-primary-light ${
                          index < 4 ? 'border-r' : 'border-none'
                        }`}
                      >
                        <p className='text-body font-semibold text-center text-secondary'>
                          {convertTimestamp(item.dt).date}
                          <br />
                          {convertTimestamp(item.dt).time}
                        </p>
                        <img src={` https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
                        <p
                          style={{
                            fontSize: 24,
                            fontWeight: 600,
                            textAlign: 'center'
                          }}
                        >
                          <span style={{ color: '#dde0e4ff' }}>{Math.round(item.main.temp)}°</span>
                        </p>
                      </div>
                    )
                )}
              </div>
            </Card>
          </div>

          <div className='col-span-4'>
            <Forecast />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
