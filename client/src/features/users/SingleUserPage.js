import { useSelector } from "react-redux"
import { selectUserById } from "./usersSlice"
import { selectAssetsByOwner } from "../assets/assetsSlice"
import { Link, useParams } from "react-router-dom"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/esm/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"

export default function SingleUserPage() {
    const { id } = useParams()

    const user = useSelector(state => selectUserById(state, id))

    // const issuedAssets = useSelector(state => {
    //     const allAssets = selectAllAssets(state)
    //     return allAssets.filter(asset => asset.ownerID === user._id)
    // })

    const issuedAssets = useSelector( state => selectAssetsByOwner(state, id))

    return (
        <>
            <h2>
                {user.username}
            </h2>
            <br />
            {JSON.stringify(user.roles)}
            <hr />
            Issued Assets:
            {/* {JSON.stringify(issuedAssets)} */}
            <Table hover striped>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>SerialSymbol</td>
                        <td>action</td>
                    </tr>
                </thead>
                <tbody>
                    {issuedAssets.map(asset => (
                        <tr key={asset._id}>
                            <td>
                                {asset.name}
                            </td>
                            <td>
                                {asset.invSymbol}
                            </td>
                            <td>
                                <Button as={Link} to={`/assets/${asset._id}`}>
                                    <FontAwesomeIcon icon={faEye} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}