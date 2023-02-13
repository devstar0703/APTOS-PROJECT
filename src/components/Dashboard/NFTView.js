import * as React from 'react';

import { useWalletData } from 'src/shared/hooks/useWalletData';

import { Dialog, DialogContent } from '@mui/material';

import {
    NFTViewMain,
    NFTImage,
    NFTName,
    NFTDesc,
    StyledPaper,
    StyledTextField,
    StyledButton
} from './styles/NFTView.styles';
import Checkout from 'src/shared/components/Checkout';

const NFTView = (props) => {
    const {
        handleClose,
        open,
        nftInfo
    } = props;

    const {
        isConnected
    } = useWalletData() ;

    const [buyer_address, setBuyerAddress] = React.useState('');

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={StyledPaper}
            fullWidth
        >
            <DialogContent>
                <NFTViewMain>
                    <NFTImage src={nftInfo.assetUrl} />
                    <NFTName>{nftInfo.name}</NFTName>
                    <NFTDesc>{nftInfo.description}</NFTDesc>
                </NFTViewMain>
                <StyledTextField
                    placeholder='Enter Buyer Address'
                    fullWidth
                    value={buyer_address}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                />
                <Checkout />
                <StyledButton fullWidth
                    disabled={!isConnected}
                >Purchase</StyledButton>
            </DialogContent>
        </Dialog>
        
    )
}

export default NFTView;