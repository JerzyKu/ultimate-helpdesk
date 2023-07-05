import React, { useEffect, useState } from 'react'
import axios from '../api/axios'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'


export default function NewEmployee() {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setSuccess(false)
    setErrMsg("")
  }, [firstname, lastname])




  async function handleSubmit(e) {
    e.preventDefault()
    setSuccess(false)

    try {
      const response = await axios.post('/employees', { firstname, lastname })
      console.log(response);
      setLastname("")
      setFirstname("")
      setSuccess(true)
    } catch (error) {
      console.error(errMsg);
      if (!error?.response) {
        setErrMsg('No Server Response.')
      } else if (error.response?.status === 409) {
        setErrMsg('Username is taken.')
      } else {
        setErrMsg('Registracion Failed.')
      }
    }
  }

  return (
    <>
        <h2>Create New Employee</h2>

      {errMsg !== "" && <Alert variant={'danger'}><FontAwesomeIcon icon={faCircleExclamation} /> {errMsg}</Alert>}
      {success && <Alert variant={'success'}><FontAwesomeIcon icon={faCircleExclamation} /> załorzone </Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter firstname"
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Secondname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter secondname"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}
