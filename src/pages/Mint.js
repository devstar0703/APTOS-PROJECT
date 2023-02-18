import * as React from 'react' ;

import { useNavigate } from 'react-router-dom';
import useWalletData from 'src/shared/hooks/useWalletData';
import useRouteData from 'src/shared/hooks/useRouteData';

import { 
    MintMain
} from './styled/Mint.styled';

import MintNow from 'src/components/Mint/MintNow';

import { routeData } from 'src/utils/routeData';
import swal from 'sweetalert';

const Mint = () => {
    const dashboardRoute = {
        ...routeData.dashboard,
        childrens : [routeData.dashboard.key],
        navLabel : routeData.dashboard.label,
    };

    const {
        onChangeRoute
    } = useRouteData() ;

    const {
        isConnected
    } = useWalletData() ;

    const navigate = useNavigate() ;

    React.useEffect(() => {
        if(!isConnected) {
            swal({
                title : 'Information',
                text : 'You should connect wallet to mint NFT',
                buttons : {
                    confirm : {text  : 'Got it'}
                },
                icon : 'info'
            }) ;

            onChangeRoute(dashboardRoute);
            navigate('/dashboard');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected]);

    return (
        <MintMain>
            {
                isConnected && <MintNow />
            }
        </MintMain>
    )
}

export default Mint ;