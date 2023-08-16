import React from 'react'
import AssetOwner from './AssetOwner';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectAssetById } from './assetsSlice';

export default function AssetRow({ assetId }) {

    const asset = useSelector(state => selectAssetById(state, assetId))

    return (
        <tr>
            <td>{asset.name}</td>
            <td>{asset.invSymbol}</td>
            <td><AssetOwner userID={asset.ownerID} /></td>
            <td><Button variant="success" as={Link} to={`/assets/${asset._id}`}>
                <FontAwesomeIcon icon={faEye} />
            </Button></td>
        </tr>
    );
}
