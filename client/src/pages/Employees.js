import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../api/axios';

// bootstrap
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

// fonta awsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Employees() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController()

    const getUsers = async () => {
      try {
        const response = await axios.get('/employees', {
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


  return (
    <>
      <Button type='succes' className='m-2' as={Link} to="/employees/new"><FontAwesomeIcon icon={faPlus} /> New Employee </Button>

      <hr />

      {users?.length ?
        <Table hover striped >
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              {/* <th>Actioins</th> */}
            </tr>
          </thead>
          <tbody>
            {(users.map((user, i) => {
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                </tr>)
            }))}
          </tbody>
        </Table>
        : (<Alert variant={'warning'}><FontAwesomeIcon icon={faTriangleExclamation} /> No users to display</Alert>)}
    </>
  )
}
