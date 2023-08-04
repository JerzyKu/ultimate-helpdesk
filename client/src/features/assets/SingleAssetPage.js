import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectAssetByID } from './assetsSlice';

export default function SingleAssetPage() {

    let { id } = useParams();

    const asset = useSelector(state => selectAssetByID(state, id))
    console.log(asset);

    if (!asset) {
        return (
            <p>post not found {id}</p>
        )
    }

    return (
        // <p>post found</p>
        <div>{ asset ? JSON.stringify(asset) : "no asset with that id"}</div>
    )
}
