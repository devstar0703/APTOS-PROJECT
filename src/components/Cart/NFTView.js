import * as React from 'react';

import { Dialog, DialogContent } from '@mui/material';

import {
    NFTViewMain,
    NFTImage,
    NFTName,
    NFTDesc,
    NFTOwner,
} from './styled/NFTView.styled';

import {
    StyledPaper,
    StyledTextField,
} from 'src/shared/styled';

import swal from 'sweetalert';

import { ipfs_origin } from 'src/utils/static';
import Checkout from 'src/shared/components/Checkout';

import * as Wagmi from "wagmi";

import { nftAddr } from 'src/web3/addr';
import nftAbi from 'src/web3/abi/nft.json' ;

const NFTView = (props) => {
    const {
        handleClose,
        open,
        nftInfo,
        cancelCart
    } = props;
    
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
            let receipt = await nftInstance.safeTransferFrom(nft_owner, buyer_address, nft_id) ;
            await receipt.wait() ;


            await cancelCart(nftInfo.cart_id) ;

            swal({
                title : 'Success',
                text : 'Transfer is successful',
                buttons : {
                    confirm : {text : 'Got it'}
                },
                icon : 'success'
            });

            handleClose();
        } catch(err) {
            swal({
                title : 'Error',
                text : 'Transfer is not successful',
                buttons : {
                    confirm : {text: 'Got it'}
                },
                icon : 'error'
            })
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
                    <NFTImage src={`${ipfs_origin}/${nftInfo?.image?.replaceAll('ipfs://','')}`} />
                    <NFTOwner>Owner : {nft_owner || 'This is not minted yet.'}</NFTOwner>
                    <NFTName> Name : {nftInfo?.name}</NFTName>
                    <NFTDesc>Description : {nftInfo?.description}</NFTDesc>
                </NFTViewMain>
                <div style={{marginTop : 10}} />
                <StyledTextField
                    placeholder='Enter Buyer Address'
                    fullWidth
                    value={buyer_address}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                />
                { nft_owner && <Checkout 
                    payEvent={transferFrom}
                /> }
                <div style={{marginTop : 20}} />
            </DialogContent>
        </Dialog>
        
    )
}

export default NFTView;