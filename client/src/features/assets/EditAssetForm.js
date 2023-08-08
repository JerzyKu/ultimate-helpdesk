import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectAssetByID, updateAsset } from "./assetsSlice";
import { selectAllUsers } from "../users/usersSlice";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export default function EditAssetForm() {
    const { id } = useParams()
    const navigate = useNavigate()

    const usersList = useSelector(selectAllUsers)
    const asset = useSelector(state => selectAssetByID(state, id))

    const [assetName, setAssetName] = useState(asset?.name)
    const [assetInvSymbol, setAssetInvSymbol] = useState(asset?.invSymbol)
    const [assetOwner, setAssetOwner] = useState(asset?.ownerID)
    const [requsestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    useEffect( () => {
        setAssetName(asset?.name)
        setAssetInvSymbol(asset?.invSymbol)
        setAssetOwner(asset?.ownerID)
    },[asset])


    const canSave = [assetName, assetInvSymbol, assetOwner].every(Boolean) && requsestStatus === 'idle'

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updateAsset({
                    id: asset._id,
                    name: assetName,
                    invSymbol: assetInvSymbol,
                    ownerID: assetOwner
                })).unwrap()
                navigate(`/assets/${id}`)
            }
            catch (err) {
                console.log('Filed to update asset', err);
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const usersOptions = usersList.map((user) => (
        <option key={user._id} value={user._id}>
            {user.username}
        </option>
    ));

    return (<>
        {/* {JSON.stringify(asset)} */}
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name :</Form.Label>
                <Form.Control type="text" value={assetName} onChange={e => setAssetName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Inventory Symbol:</Form.Label>
                <Form.Control type="text" value={assetInvSymbol} onChange={e => setAssetInvSymbol(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Ownerl:</Form.Label>
                <Form.Select
                    defaultValue={assetOwner}
                    onChange={e => setAssetOwner(e.target.value)}
                >
                    {usersOptions}
                </Form.Select>
            </Form.Group>
            <Button
                variant="success"
                className='ps-4 pe-4'
                onClick={onSavePostClicked}
                disabled={!canSave}
            >Update</Button>
        </Form>
    </>);
}
