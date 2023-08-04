import React from 'react'
import AssetOwner from './AssetOwner';
import { Link } from 'react-router-dom';

export default function AssetRow({ asset }) {
    return (
        <tr>
            <td>{asset._id}</td>
            <td>{asset.name}</td>
            <td>{asset.invSymbol}</td>
            <td><AssetOwner userID={asset.ownerID} /></td>
            <td><Link to={`/assets/${asset._id}`}>show</Link></td>
        </tr>
    );
}
