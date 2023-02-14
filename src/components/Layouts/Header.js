import * as React from 'react' ;

import useRouteData  from 'src/shared/hooks/useRouteData';
import { useNavigate } from 'react-router-dom';
import { useWalletData } from 'src/shared/hooks/useWalletData';

import { routeData } from 'src/utils/routeData';

import { useTheme } from '@mui/styles';

import LogoImg from 'src/assets/logo.webp';

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

import { AccountBalanceWalletOutlined } from '@mui/icons-material';

import WalletDrawer from './WalletDrawer';

import { eraseCookie, getCookie } from 'src/utils/helper/cookieHelper';

const Header = () => {
    const navigate = useNavigate() ;
    const theme = useTheme() ;

    const {
        isConnected
    } = useWalletData() ;

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
    const [openWalletDrawer, setWalletDrawer] = React.useState(false);

    const clickNavItem = (navItem) => {
        onChangeRoute(navItem);
    }

    const handleOpenLogin = () => { setOpenLogin(true) }
    const handleCloseLogin = () => { setOpenLogin(false) }

    const handleWalletDrawer = () => { setWalletDrawer(!openWalletDrawer) }

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
                        { getCookie('token') && prvNavList.map((nav, index) => (
                            <NavItem key={index} theme={theme} onClick={() => clickNavItem(nav)}
                                className={nav.childrens.includes(selectedRouteData.key) ? 'active' : ''}
                                to={nav.link}
                            >
                                {nav.navLabel}
                            </NavItem>
                        ))}
                        {
                            isConnected && web3NavList.map((nav, index) => (
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
                        !getCookie('token') ? <ToolItem
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
                    <ToolItem
                        onClick={handleWalletDrawer}
                    >
                        <AccountBalanceWalletOutlined />
                    </ToolItem>
                </ToolBar>

                <Login 
                    open={openLogin}
                    handleClose={handleCloseLogin}
                /> 
            </HeaderMain>
            <WalletDrawer 
                open={openWalletDrawer}
                handleDrawer={handleWalletDrawer}
            />
        </>
    )
}

export default Header;