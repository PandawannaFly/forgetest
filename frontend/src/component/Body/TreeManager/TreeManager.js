import CachedIcon from '@mui/icons-material/Cached';

import CreateBucket from '../Modal/CreateBucket';
import ForgeTree from './ForgeTree';
import { changeRefreshTree } from 'redux/Refresh/refreshSlice';
import { useDispatch } from 'react-redux';

function TreeManager() {
    const dispatch = useDispatch();

    return (
        <div className="panel panel-default">
            <div className="panel-heading" data-toggle="tooltip">
                <div className="col-xs-8 fill">
                    <p style={{ float: 'left', width: 'auto' }}>
                        Buckets và đối tượng
                        <span
                            id="refreshBuckets"
                            className="glyphicon glyphicon-refresh"
                            style={{ cursor: 'pointer', marginLeft: 4 }}
                            onClick={() => dispatch(changeRefreshTree(true))}
                        >
                            <CachedIcon style={{ width: 20 }} />
                        </span>
                    </p>
                </div>

                <div className="col-xs-4">
                    <CreateBucket />
                </div>
            </div>
            <div id="appBuckets">
                <ForgeTree />
            </div>
        </div>
    );
}

export default TreeManager;
