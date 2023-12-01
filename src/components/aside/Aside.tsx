import { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Card from '~/components/card/Card'

const Aside = () => {
  const { pathname } = useLocation()
  const [active, setActive] = useState(pathname)

  const categories: { label: string; path: string; icon: IconName }[] = [
    { label: 'weather', path: '/', icon: 'cloud-sun-rain' },
    { label: 'cities', path: '/search', icon: 'list-ul' },
    { label: 'map', path: '/map', icon: 'map' },
    { label: 'settings', path: '/settings', icon: 'sliders-h' }
  ]

  return (
    <Card className='flex-col !justify-start !w-max lg:!w-full fixed lg:static top-0 right-0 mx-6 my-20 lg:m-0 z-10'>
      <div className='flex flex-col justify-center items-center py-6 lg:p-0'>
        <div className='w-12 h-12'>
          <div
            className='w-full h-full opacity-100'
            style={{
              backgroundImage:
                'url("https://assets.api.uizard.io/api/cdn/stream/d0bb0968-406e-4014-b9ab-080788e9d44b.png")',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
      </div>

      {categories.map((category, index) => (
        <Link
          key={index}
          to={category.path}
          className={`flex flex-col justify-center items-center py-6 ${
            active === category.path ? 'text-secondary-light' : 'text-secondary'
          } `}
          onClick={() => setActive(category.path)}
        >
          <FontAwesomeIcon className='w-6 h-6' icon={['fas', category.icon]} />

          <p className='text-body capitalize'>{category.label}</p>
        </Link>
      ))}
    </Card>
  )
}

export default Aside
