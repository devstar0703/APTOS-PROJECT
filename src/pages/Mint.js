import * as React from 'react' ;

import { 
    MintMain
} from './styled/Mint.styled';

import MintNow from 'src/components/Mint/MintNow';

const Mint = () => {
    return (
        <MintMain>
            <MintNow />
        </MintMain>
    )
}

export default Mint ;