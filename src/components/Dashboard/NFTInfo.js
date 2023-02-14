import * as React from 'react';

import { useWalletData } from 'src/shared/hooks/useWalletData';
import { loadAllCartList } from 'src/redux/actions/cart';
import { useDispatch } from 'react-redux';

import { Dialog, DialogContent } from '@mui/material';

import {
    NFTInfoMain,
    NFTImage,
    NFTName,
    NFTDesc,
    NFTOwner,
} from './styled/NFTInfo.styled';

import {
    StyledPaper,
    StyledButton
} from 'src/shared/styled';

import swal from 'sweetalert';

import { backend_endpoint, ipfs_origin } from 'src/utils/static';

import * as Wagmi from "wagmi";

import { nftAddr } from 'src/web3/addr';
import nftAbi from 'src/web3/abi/nft.json' ;
import axios from 'axios';
import { authorization, isAuthenticated } from 'src/utils/helper/globalHelper';

const NFTInfo = (props) => {
    const {
        handleClose,
        open,
        nftInfo
    } = props;

    const {
        isConnected
    } = useWalletData() ;

    const dispatch = useDispatch();

    const {data: signer} = Wagmi.useSigner() ;

    const nftInstance = Wagmi.useContract({
		address: nftAddr,
		abi: nftAbi,
		signerOrProvider: signer,
	});

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

    const addToCart = async () => {
        console.log(nft_id);
        try {
            let res = await axios.post(`${backend_endpoint}cart/addToCart`, {
                nft_id
            }, authorization()) ;

            console.log(res.data) ;

            swal({
                title : 'Success',
                text : `${nftInfo?.name} is added to cart`,
                buttons : false,
                timer : 1000,
                icon: 'success'
            })

            loadAllCartList(dispatch);
        } catch(err) {

        }

        handleClose() ;
    }

    React.useEffect(() => {
        if(nftInfo?.name) {
            let nft_id = nftInfo.name.slice(nftInfo.name.search('#') + 1, nftInfo.name.length) ;
            setNFTId(parseInt(nft_id)-1);
        }
    }, [nftInfo]) ;

    React.useEffect(() => {
        getOwnerOf();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nft_id, signer]) ;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={StyledPaper}
            fullWidth
        >
            <DialogContent>
                <NFTInfoMain>
                    <NFTImage src={`${ipfs_origin}/${nftInfo?.image?.replaceAll('ipfs://','')}`} />
                    <NFTOwner>Owner : {nft_owner || 'This is not minted yet.'}</NFTOwner>
                    <NFTName> Name : {nftInfo?.name}</NFTName>
                    <NFTDesc>Description : {nftInfo?.description}</NFTDesc>
                </NFTInfoMain>
                <div style={{marginTop: 20}} />
                <StyledButton fullWidth
                    disabled={!isConnected || !nft_owner || !isAuthenticated()}
                    onClick={() => addToCart()}
                >Add to Cart</StyledButton>
            </DialogContent>
        </Dialog>
        
    )
}

export default NFTInfo;