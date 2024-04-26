import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
//components
import HeaderHome from "../../Components/Header-home/HeaderHome"

function HomeTemplate() {
    return (
      <div>
          <HeaderHome/>
          <Suspense >
              <Outlet />
          </Suspense>
      </div>
    )
  }
  
  export default HomeTemplate