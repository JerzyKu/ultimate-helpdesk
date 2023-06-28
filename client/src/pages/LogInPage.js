import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faFrog } from '@fortawesome/free-solid-svg-icons'

export default function LogInPage() {

    const loginRef = useRef()

    useEffect( () => {
        loginRef.current.focus()
    }, [])

    return (
        <Container style={{ maxWidth: '400px', margin: '0 auto' }} className="mt-5">
            <h1>
                <FontAwesomeIcon icon={faFrog} bounce style={{ color: "#0b3805", }} /> Ultimate HD
            </h1>
            <Alert variant={'danger'} className='d-nsne' style={{ visibility: 'hiddsen' }}><FontAwesomeIcon icon={faCircleExclamation} />This is jfghjfghjfghjfghjfghjgfhjfghjfghjfghja danger
                alert—check it out!</Alert>
            <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={loginRef}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="success" className='ps-4 pe-4' as={Link} to="/">Login</Button>
            </Form>
        </Container>
    )
}
