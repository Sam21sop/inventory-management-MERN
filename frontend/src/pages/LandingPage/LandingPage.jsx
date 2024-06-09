import React from 'react'
import { Outlet } from 'react-router-dom';
import image from '/images/background.jpg'


const LandingPage = () => {
  return (
    <>
      <div className='' style={{backgroundSize:"cover", backgroundImage:`url(${image})`}}>
        <Outlet />
      </div>
    </>
  )
}

export default LandingPage;