import * as React from 'react' ;

import useRouteData  from 'src/shared/hooks/useRouteData';
import { useNavigate } from 'react-router-dom';
// import useWalletData from 'src/shared/hooks/useWalletData';

import { routeData } from 'src/utils/routeData';

import { useTheme } from '@mui/styles';

import LogoImg from 'src/assets/logo.png';

import { 
    HeaderMain,
    NavItem,
    NavList,
    LogoImage,
    NavBar,
    ToolBar,
    ToolItem
} from './styled/Header.styled';

import Login from '../Auth/Login';

// import { DropdownLink } from 'src/shared/ui';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// import { AccountBalanceWalletOutlined } from '@mui/icons-material';

// import WalletDrawer from './WalletDrawer';
// import WalletPopover from './WalletPopover';

import { eraseCookie } from 'src/utils/helper/cookieHelper';
import { isAuthenticated } from 'src/utils/helper/globalHelper';


const Header = () => {
    const navigate = useNavigate() ;
    const theme = useTheme() ;

    // const {
    //     isConnected
    // } = useWalletData() ;

    const {
        selectedRouteData,
        onChangeRoute
    } = useRouteData() ;

    const pubNavList = [
        {
            ...routeData.dashboard,
            childrens : [routeData.dashboard.key],
            navLabel : routeData.dashboard.label,
        },
    ];

    const prvNavList = [
        {
            ...routeData.cart,
            childrens : [routeData.cart.key],
            navLabel : routeData.cart.label
        }
    ]

    const web3NavList = [
        {
            ...routeData.mint,
            childrens : [routeData.mint.key],
            navLabel : routeData.mint.label
        }
    ]

    const [openLogin, setOpenLogin] = React.useState(false);
    // const [openWalletDrawer, setWalletDrawer] = React.useState(false);
    // const [openWalletPopover , setWalletPopover ] = React.useState(false) ;
    // const anchorRef = React.useRef(null) ;

    const clickNavItem = (navItem) => {
        onChangeRoute(navItem);
    }

    const handleOpenLogin = () => { setOpenLogin(true) }
    const handleCloseLogin = () => { setOpenLogin(false) }

    // const handleWalletDrawer = () => { setWalletDrawer(!openWalletDrawer) }
    // const handleWalletPopover = () => { setWalletPopover(!openWalletPopover) }

    return (
        <>
            <HeaderMain theme={theme}>
                <NavBar>
                    <LogoImage src={LogoImg} />
                    <NavList>
                        { pubNavList.map((nav, index) => (
                            <NavItem key={index} theme={theme} onClick={() => clickNavItem(nav)}
                                className={nav.childrens.includes(selectedRouteData.key) ? 'active' : ''}
                                to={nav.link}
                            >
                                {nav.navLabel}
                            </NavItem>
                        ))}
                        { isAuthenticated() && prvNavList.map((nav, index) => (
                            <NavItem key={index} theme={theme} onClick={() => clickNavItem(nav)}
                                className={nav.childrens.includes(selectedRouteData.key) ? 'active' : ''}
                                to={nav.link}
                            >
                                {nav.navLabel}
                            </NavItem>
                        ))}
                        {
                            isAuthenticated() && web3NavList.map((nav, index) => (
                                <NavItem key={index} theme={theme} onClick={() => clickNavItem(nav)}
                                    className={nav.childrens.includes(selectedRouteData.key) ? 'active' : ''}
                                    to={nav.link}
                                >
                                    {nav.navLabel}
                                </NavItem>
                            ))
                        }
                    </NavList>
                </NavBar>
                {/* <ConnectButton /> */}
                <ToolBar>
                    {
                        !isAuthenticated() ? <ToolItem
                            onClick={() => handleOpenLogin()}
                        >
                            Sign In
                        </ToolItem> : <ToolItem
                            onClick={() => {
                                eraseCookie('token');
                                navigate('/dashboard') ;
                            }}
                        >
                            Sign Out
                        </ToolItem>
                    }
                    {
                        // isAuthenticated() &&
                        //  <DropdownLink
                        //     // onClick={handleWalletDrawer}
                        //     label={<AccountBalanceWalletOutlined />}
                        // >
                        //     <ConnectButton />
                        // </DropdownLink>
                        isAuthenticated() &&   <ConnectButton />
                    }
                </ToolBar>

                <Login 
                    open={openLogin}
                    handleClose={handleCloseLogin}
                /> 
            </HeaderMain>
            {/* <WalletDrawer 
                open={openWalletDrawer}
                handleDrawer={handleWalletDrawer}
            />
            <WalletPopover 
                open={openWalletPopover}
                handlePopOver={handleWalletPopover}
                anchorEl={anchorRef ? anchorRef.current : null}
            /> */}
        </>
    )
}

export default Header;