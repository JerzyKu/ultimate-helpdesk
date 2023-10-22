import React from 'react'
import useAuth from '../../hooks/useAuth'
// import { Link } from 'react-router-dom'

export default function Home() {
  const { username } = useAuth()
  return (
    <>
      Hello {username}!
    </>
  )
}
