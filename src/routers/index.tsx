import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '~/templates/dashboard/Dashboard.template'
import Home from '~/pages/home/Home.page'
import Search from '~/pages/search/Search.page'
import Settings from '~/pages/settings/Setting'
import WeatherMap from '~/pages/weatherMap/WeatherMap.page'

const router = createBrowserRouter([
  {
    element: <Dashboard />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: 'search',
        element: <Search />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'map',
        element: <WeatherMap />
      }
    ]
  }
])

export default router
