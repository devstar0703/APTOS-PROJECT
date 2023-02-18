import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CurrencyBitcoinOutlinedIcon from '@mui/icons-material/CurrencyBitcoinOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';

export const routeData = {
    dashboard : {
        key : 'dashboard',
        label : <>
            <GridViewOutlinedIcon /> &nbsp; Home
        </>,
        link : "/dashboard"
    },
    cart : {
        key : 'cart',
        label : <>
            <ShoppingCartOutlinedIcon /> &nbsp; Cart
        </>,
        link : "/cart"
    },
    mint :{
        key : 'mint',
        label : <>
            <CurrencyBitcoinOutlinedIcon /> &nbsp; Mint
        </>,
        link : "/mint"
    }
}