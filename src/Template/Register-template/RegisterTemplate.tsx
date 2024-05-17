//react
import { Suspense }  from 'react'
import { Outlet } from 'react-router-dom'
//css
import './registerTemplate.scss'
//components
import { SkeletonRegister } from '../../Components/Skeleton/Skeleton'
import { useScrollTop } from '../../hooks/useScrollTop'
import backgroundImage from '../../assets/Image/background.jpg';

function RegisterTemplate() {
  useScrollTop()
  return (
    <div className='register-template'>
      <div className="content">
      <img src={backgroundImage} alt="Background" className="background-image" />
        <Suspense fallback={<SkeletonRegister/>}>
          <Outlet/>
        </Suspense>
      </div>
    </div>
  )
}

export default RegisterTemplate