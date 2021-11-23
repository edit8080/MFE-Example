import React from 'react'
import { Link } from 'react-router-dom'

const MainPage = () => {
  return (
    <>
      <div>This is Main Page</div>
      <Link to="/subPage">Go To Sub Page</Link>
    </>
  )
}

export default MainPage
