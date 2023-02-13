import tagStyled from 'styled-components' ;

import { Link } from 'react-router-dom';

import {
    styled
} from '@mui/material';

export const HeaderMain = tagStyled.div`
    width : 100%;
    height : ${props => props.theme.layout.header}px;
    box-sizing : border-box ;

    display : flex;
    justify-content : space-between ;
    align-items : center;
    
    gap : 10px;

    padding : 10px 2%;
`
export const NavBar = tagStyled.div`
    display : flex;
    align-items : center;
    gap : 30px;
`
export const LogoImage = tagStyled.img`
    border-radius : 10px;
    width : 200px;
`

export const NavList = tagStyled.div`
    display : flex;
    align-items :center;
    gap : 10px;
`

export const NavItem = styled(Link)`
    text-decoration : none ;
    color : white;
    font-size : 20px;
    cursor : pointer;

    height : 100%;
    width : 120px;

    display : flex;
    align-items :center;
    justify-content: center;

    transition: 0.5s;

    &.active {
        color : red;
    }

    :hover {
        color : red;
    }
`