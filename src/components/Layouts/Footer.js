import * as React from 'react' ;

import { useTheme } from '@mui/styles';

import { 
    FooterMain
} from './styles/Footer.styles';

const Footer = () => {
    const theme = useTheme() ;

    return (
        <FooterMain theme={theme}>
        </FooterMain>
    )
}

export default Footer;