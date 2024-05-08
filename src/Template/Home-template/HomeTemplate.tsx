import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
//components
import HeaderHome from "../../Components/Header-home/HeaderHome"
import FooterHome from "../../Components/Footer-home/FooterHome"

function HomeTemplate() {
    return (
      <div>
          <HeaderHome/>
          <Suspense >
              <Outlet />
          </Suspense>
          <FooterHome/>
      </div>
    )
  }
  
  export default HomeTemplate