import React from 'react'
import AssetOwner from './AssetOwner';

export default function AssetRow({ asset }) {
    return (
        <tr>
            <td>{asset._id}</td>
            <td>{asset.name}</td>
            <td>{asset.invSymbol}</td>
            <td><AssetOwner userID={asset.ownerID} /></td>
        </tr>
    );
}
