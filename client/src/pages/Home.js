import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      Home
      <hr/>
      <Link to={'/login'} >Login</Link>
    </>
  )
}
