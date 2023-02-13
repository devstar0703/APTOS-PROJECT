import * as React from 'react' ;

import useRouteData  from 'src/shared/hooks/useRouteData';

import { routeData } from 'src/utils/routeData';

import { useTheme } from '@mui/styles';

import LogoImg from 'src/assets/logo.webp';

import { 
    HeaderMain,
    NavItem,
    NavList,
    LogoImage,
    NavBar
} from './styles/Header.styles';

import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
    const theme = useTheme() ;

    const {
        selectedRouteData,
        onChangeRoute
    } = useRouteData() ;

    const navList = [
        {
            ...routeData.home,
            childrens : [routeData.home.key],
            navLabel : routeData.home.label
        }
    ];

    const clickNavItem = (navItem) => {
        onChangeRoute(navItem);
    }

    return (
        <HeaderMain theme={theme}>
            <NavBar>
                <LogoImage src={LogoImg} />
                <NavList>
                    { navList.map((nav, index) => (
                        <NavItem key={index} theme={theme} onClick={() => clickNavItem(nav)}
                            className={nav.childrens.includes(selectedRouteData.key) ? 'active' : ''}
                            to={nav.link}
                        >
                            {nav.navLabel}
                        </NavItem>
                    ))}
                </NavList>
            </NavBar>
            <ConnectButton />
        </HeaderMain>
    )
}

export default Header;