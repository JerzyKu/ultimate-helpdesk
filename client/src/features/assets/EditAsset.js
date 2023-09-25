import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectAssetsById } from './assetsApiSlice';
import Spinner from 'react-bootstrap/Spinner';
import EditAssetForm from './EditAssetForm';

export default function EditAsset() {

  const { id } = useParams();

  const asset = useSelector( state => selectAssetsById(state, id))

  const content = asset ? <EditAssetForm asset={asset }/> : <Spinner />
  return content
}
