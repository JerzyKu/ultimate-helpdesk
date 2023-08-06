import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAssetByID } from "./assetsSlice";
import { selectAllUsers } from "../users/usersSlice";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


export default function EditAssetForm() {
    const dispatch = useDispatch()

    const { id } = useParams()

    const usersList = useSelector(selectAllUsers)
    
    const asset = useSelector(state => selectAssetByID(state, id))
    const [assetName, setAssetName] = useState(asset.name)
    const [assetInvSymbol, setAssetInvSymbol] = useState(asset.invSymbol)

    const usersOptions = usersList.map((user) => (
        <option key={user._id} value={user._id}>
          {user.username}
        </option>
      ));

    return (<>
        {/* {JSON.stringify(asset)} */}
        <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Name :</Form.Label>
                <Form.Control type="text" value={assetName}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Inventory Symbol:</Form.Label>
                <Form.Control type="text" value={assetInvSymbol}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Ownerl:</Form.Label>
                <Form.Select>
                    <option > test </option>
                    <option > test 1</option>
                    <option > test 2</option>
                    {usersOptions}
                </Form.Select>
            </Form.Group>
            <Button variant="success" className='ps-4 pe-4'>Update</Button>
        </Form>
    </>);
}
