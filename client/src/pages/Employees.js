import React from 'react'
import { Link } from 'react-router-dom';

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
  return (
    <>
      <Button type='succes' className='m-2' as={Link} to="/employees/new"><FontAwesomeIcon icon={faPlus} /> New Employee </Button>
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
              <tr>
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
