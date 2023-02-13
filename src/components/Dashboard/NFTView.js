import * as React from 'react';

import { useWalletData } from 'src/shared/hooks/useWalletData';

import { Dialog, DialogContent } from '@mui/material';

import {
    NFTViewMain,
    NFTImage,
    NFTName,
    NFTDesc,
    NFTOwner,
    StyledPaper,
    StyledTextField,
    StyledButton
} from './styles/NFTView.styles';

import Checkout from 'src/shared/components/Checkout';

import * as Wagmi from "wagmi";

import { nftAddr } from 'src/web3/addr';
import nftAbi from 'src/web3/abi/nft.json' ;

const NFTView = (props) => {
    const {
        handleClose,
        open,
        nftInfo
    } = props;

    const {
        isConnected
    } = useWalletData() ;

    
    const {data: signer} = Wagmi.useSigner() ;

    const nftInstance = Wagmi.useContract({
		address: nftAddr,
		abi: nftAbi,
		signerOrProvider: signer,
	});

    const [buyer_address, setBuyerAddress] = React.useState('');
    const [nft_id, setNFTId] = React.useState(0) ;
    const [nft_owner, setNFTOwner] = React.useState(null) ;

    const getOwnerOf = async () => {
        try {
            let owner = await nftInstance.ownerOf(nft_id) ;
            setNFTOwner(owner);
        } catch(err) {
            setNFTOwner(null);
        }
    }

    const transferFrom = async () => {
        try {
            await nftInstance.safeTransferFrom(nft_owner, buyer_address, nft_id) ;
        } catch(err) {
            
        }
    }

    React.useEffect(() => {
        if(nftInfo?.name) {
            let nft_id = nftInfo.name.slice(nftInfo.name.search('#') + 1, nftInfo.name.length) ;
            setNFTId(parseInt(nft_id));
        }
    }, [nftInfo]) ;

    React.useEffect(() => {
        getOwnerOf();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nft_id]) ;

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
                    <NFTOwner>Owner : {nft_owner || 'Unknown'}</NFTOwner>
                    <NFTName> Name : {nftInfo.name}</NFTName>
                    <NFTDesc>Description : {nftInfo.description}</NFTDesc>
                </NFTViewMain>
                <StyledTextField
                    placeholder='Enter Buyer Address'
                    fullWidth
                    value={buyer_address}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                />
                { nft_owner && <Checkout 
                    payEvent={transferFrom}
                /> }
                <StyledButton fullWidth
                    disabled={!isConnected || !nft_owner}
                >Purchase</StyledButton>
            </DialogContent>
        </Dialog>
        
    )
}

export default NFTView;