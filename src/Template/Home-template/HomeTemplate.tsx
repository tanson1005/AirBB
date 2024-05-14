import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
//components
import HeaderHome from "../../Components/Header-home/HeaderHome"
import FooterHome from "../../Components/Footer-home/FooterHome"
import {SkeletonC, SkeletonListRoom} from "../../Components/Skeleton/Skeleton"


function HomeTemplate() {
    return (
      <div>
          <HeaderHome/>
          <Suspense fallback={location.pathname === '/' ? <SkeletonC/> : <SkeletonListRoom/>}>
              <Outlet />
          </Suspense>
          <FooterHome/>
      </div>
    )
  }
  
  export default HomeTemplate