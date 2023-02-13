import * as React from 'react';

import { useTheme } from '@mui/styles';

import { 
    ContentMain
} from './styles/Content.styles';

const Content = ({children}) => {
    const theme = useTheme() ;

    return (
        <ContentMain
            theme={theme}
        >
            {children}
        </ContentMain>
    )
}

export default Content ;