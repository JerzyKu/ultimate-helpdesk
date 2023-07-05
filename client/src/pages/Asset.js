import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

import Alert from 'react-bootstrap/Alert';


export default function Asset() {
  const [asset, setAsset] = useState("");
  const [errorMessage, setErrorMessage] = useState('')
  const {id} = useParams();

  useEffect(() => {
    const getAsset = async () => {
      try {
        const response = await axios.get(`/assets/${id}`);
        setAsset(response.data);
      } catch (error) {
        setErrorMessage([JSON.stringify(error.message)]);
      }
    };
    getAsset();
    // eslint-disable-next-line
  }, []);

  return (
    <>
        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
      <div>{JSON.stringify(asset)}</div>
    </>
  );
}
