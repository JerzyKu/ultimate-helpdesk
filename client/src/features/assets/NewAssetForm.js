import Form  from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function NewAssetForm() {
  const [name, setName] = useState('')
  const [invSymbol, setInvSymbol] = useState('')
  
    return (
    <>
      <h2>Add new Asset</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name: </Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={ e => setName(e.target.value)}
            required
            isInvalid
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="invSymbol">invSymbol:</Form.Label>
          <Form.Control
            type="text"
            name="invSymbol"
            id="invSymbol"
            placeholder="Enter inventory number"
            value={invSymbol}
            onChange={ e => setInvSymbol(e.target.value)}
            required
            isValid
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="owner">Owner: </Form.Label>
          <Form.Select 
          id="owner" 
        //   value={userID}
        //   onChange={onOwnerChange}
          >
            <option value="">-=- select owner -=-</option>
            {/* {usersOptions} */}
          </Form.Select>
        </Form.Group>

        <Button type="button" 
        // onClick={onSavePostClicked} 
        // disabled={!canSave}
        >
          {/* <Spinner animation="grow" size='sm'/>  */}
          Add Asset
        </Button>
      </Form>
    </>
  );
}
