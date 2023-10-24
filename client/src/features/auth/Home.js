import React from 'react'
import useAuth from '../../hooks/useAuth'
// import { Link } from 'react-router-dom'

export default function Home() {
  const { username, firstName } = useAuth()

  console.log("username",username);
  console.log("firstName",firstName);

  console.log("firstName ? firstName : username", firstName ? firstName : username);
  

  return (
    <>
      Hello {firstName ? firstName : username}!
    </>
  )
}
