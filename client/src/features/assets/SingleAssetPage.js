import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectAssetByID } from './assetsSlice';
import AssetOwner from './AssetOwner';
import Button from 'react-bootstrap/Button';

export default function SingleAssetPage() {
    const  { id } = useParams();
    const assetData = useSelector(state => selectAssetByID(state, id))

    const asset = < div>
        {/* {JSON.stringify(assetData)} <br /> */}
        <Button as={Link} to='/assets'> {'< Assets'}</Button> <br />
        Name: {assetData.name} <br />
        Inventory symbol: {assetData.invSymbol}<br />
        createdAt: {assetData.createdAt}<br />
        last update: {assetData.updatedAt}<br />
        Owner: <AssetOwner userID={assetData.ownerID} /> <br />
        <Link to={`/assets/edit/${assetData._id}`}>Edit</Link>
    </div>

    return (
        <>
            {asset ? asset : "no asset with that id"}
        </>
    )
}
