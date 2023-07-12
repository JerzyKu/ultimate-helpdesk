import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'

// reat-bootstrap
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert';

// font awsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function AssetsList() {

  const [assets, setAssets] = useState([])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getAssets = async () => {
      try {
        const response = await axios.get('/assets', {
          signal: controller.signal
        })
        isMounted && setAssets(response.data)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    getAssets()

    return () => {
      isMounted = false
      controller.abort()
    }

  }, [])



  const table = <Table hover striped>
    <thead>
      <tr>
        <th className='hearderStyles'>Name</th>
        <th style={{}}>Inventory Number</th>
      </tr>
    </thead>
    <tbody>
      {assets.map(asset => {
        return (
          <tr key={asset.name}>
            <td>{asset.name}</td>
            <td>{asset.invSymbol}</td>
          </tr>
        )
      })}
    </tbody>
  </Table>


  return (
    <>
      <Button type='succes' className='m-2' as={Link} to="/assets/new"><FontAwesomeIcon icon={faPlus} /> New Asset </Button>

      <hr />

      {assets?.length
        ? table
        : <Alert variant={'warning'}><FontAwesomeIcon icon={faTriangleExclamation} /> No users to display</Alert>
      }

    </>
  )
}
