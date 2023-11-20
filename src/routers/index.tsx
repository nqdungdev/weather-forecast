import { createBrowserRouter } from 'react-router-dom'
import Home from '~/pages/home/Home.page'
import Map from '~/pages/map/Map'
import Search from '~/pages/search/Search.page'
import Settings from '~/pages/settings/Setting'
import Dashboard from '~/templates/dashboard/Dashboard.template'

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
        element: <Map />
      }
    ]
  }
])

export default router
