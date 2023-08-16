import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteAsset, selectAssetById } from './assetsSlice';
import AssetOwner from './AssetOwner';
import Button from 'react-bootstrap/Button';

export default function SingleAssetPage() {
    const  { id } = useParams();
    const dispach = useDispatch()
    const navigate = useNavigate()
    const assetData = useSelector(state => selectAssetById(state, id))

    const onDeleteClick = () => {
        try {
            dispach(deleteAsset({"id": assetData._id})).unwrap()
            navigate('/assets/')
        } catch (err) {
            console.log('Filet to delete ', err);
        }
    }

    const asset = < div>
        {/* {JSON.stringify(assetData)} <br /> */}
        <Button as={Link} to='/assets'> {'< Assets'}</Button> <br />
        Name: {assetData?.name} <br />
        Inventory symbol: {assetData?.invSymbol}<br />
        createdAt: {assetData?.createdAt}<br />
        last update: {assetData?.updatedAt}<br />
        Owner: <AssetOwner userID={assetData?.ownerID} /> <br />
        <Button variant='success' as={Link} to={`/assets/edit/${assetData?._id}`}>Edit</Button>
        <Button variant='danger' onClick={onDeleteClick}>delete</Button>
    </div>

    return (
        <>
            {asset ? asset : "no asset with that id"}
        </>
    )
}
