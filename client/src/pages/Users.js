import React, { useEffect, useState } from 'react'
import axios from '../api/axios'

// reat-bootstrap
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert';

// font awsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'


export default function Users() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUsers = async () => {
      try {
        const response = await axios.get('/users', {
          signal: controller.signal
        })
        isMounted && setUsers(response.data)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    getUsers()

    return () => {
      isMounted = false
      controller.abort()
    }

  }, [])

  const table = <Table hover striped>
    <thead>
      <tr>
        <th className='hearderStyles'>Username</th>
        <th style={{}}>Inventory Number</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => {
        return (
          <tr key={user.username}>
            <td>{user.username}</td>
            <td>{user.invSymbol}</td>
          </tr>
        )
      })}
    </tbody>
  </Table>

  return (
    <>
      {users?.length
        ? table
        : <Alert variant={'warning'}><FontAwesomeIcon icon={faTriangleExclamation} /> No users to display</Alert>
      }
    </>
  )
}
