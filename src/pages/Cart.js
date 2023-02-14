import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { backend_endpoint, ipfs_origin } from 'src/utils/static';

import {
    CartMain,
    NFTCard,
    NFTAsset,
    NFTName,
    NFTDesc,
    ButtonDiv
} from './styled/Cart.styled';

import NFTView from 'src/components/Cart/NFTView';
import Loading from 'react-loading-components';

import axios from 'axios';
import { authorization } from 'src/utils/helper/globalHelper';
import ActionTypes from 'src/redux/actions/actionTypes';

import aptos_asset_list from 'src/shared/data/aptos_asset_list.json';
import { loadAllCartList } from 'src/redux/actions/cart';

const Cart = () => {
    const cartList = useSelector(state => state.cart.cartList) ;
    const dispatch = useDispatch() ;

    const [selectedNft, setSelectedNft] = React.useState(null) ;
    const [openNftView, setOpenNftView] = React.useState(false) ;

    const handleCloseNftView = () => { setOpenNftView(false) }
    const handleOpenNftView = () => { setOpenNftView(true) }

    const loadCartList = async () => {
        let res = await axios.get(`${backend_endpoint}cart/cartList`, authorization()) ;

        dispatch({
            type : ActionTypes.GetCartList,
            payload : {
                cartList : res.data.cartList
            }
        }) ;
    }

    const cancelCart = async (cart_id) => {
        console.log(cart_id) ;
        let res = await axios.delete(`${backend_endpoint}cart`, {
            ...authorization(),
            data : {
                cart_id
            }
        }) ;

        console.log(res.data) ;

        loadCartList() ;
        loadAllCartList(dispatch) ;
    }

    React.useEffect(() => {
        loadCartList() ;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) ;

    return (
        <CartMain>
            {
                cartList ? cartList
                .map((cart, index) => (
                    <NFTCard key={index} >
                        <NFTAsset src={`${ipfs_origin}/${aptos_asset_list[cart.nft_id].image.replaceAll('ipfs://','')}`}/>
                        <NFTName >
                            {aptos_asset_list[cart.nft_id].name}
                        </NFTName>
                        <NFTDesc >
                            {aptos_asset_list[cart.nft_id].description}
                        </NFTDesc>
                        <ButtonDiv>
                            <button type='button'
                                onClick={() => cancelCart(cart._id)}
                            >Remove From Cart</button>
                            <button onClick={() => {
                                setSelectedNft(aptos_asset_list[cart.nft_id]) ;
                                handleOpenNftView() ;
                            }}>View</button>
                        </ButtonDiv>
                    </NFTCard>
                )) : <Loading type='oval' width={30} height={30} />
            }
            <NFTView 
                open={openNftView}
                handleClose={handleCloseNftView}
                nftInfo={selectedNft}
            />
        </CartMain>
    )
}

export default Cart ;