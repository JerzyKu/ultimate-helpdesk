import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../api/axios';

// bootstrap
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

// fonta awsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const tempEmplo = [
  { firstname: "Anna", lastname: "Nowak" },
  { firstname: "Anna", lastname: "Nowak" },
  { firstname: "Anna", lastname: "Nowak" },
  { firstname: "Anna", lastname: "Nowak" },
  { firstname: "Anna", lastname: "Nowak" },
  { firstname: "Anna", lastname: "Nowak" },
  { firstname: "Anna", lastname: "Nowak" },
  { firstname: "Anna", lastname: "Nowak" },
  { firstname: "Anna", lastname: "Nowak" }
] 

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

      {users?.length
        ? (
          <ul>
            {users.map((user, i) => {
              return <li key={i}>{user.firstname} {user.lastname}</li>
            })}
          </ul>
        ) : (
          <p>no users to display</p>
        )}

      <hr />

      <Table hover striped >
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actioins</th>
          </tr>
        </thead>
        <tbody>
          {tempEmplo.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{el.firstname}</td>
                <td>{el.lastname}</td>
                <td><Button size="sm">Actions</Button></td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}
