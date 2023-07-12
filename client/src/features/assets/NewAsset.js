import React, { useState } from "react";
import axios from "../../api/axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Alert from 'react-bootstrap/Alert';

export default function NewAsset() {
  const [name, setName] = useState("");
  const [invSymbol, setInvSymbol] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/assets", { invSymbol, name });
      console.log(response);
      setInvSymbol("");
      setName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Create New Asset</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Inventory number: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter inventory number"
            value={invSymbol}
            onChange={(e) => setInvSymbol(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
