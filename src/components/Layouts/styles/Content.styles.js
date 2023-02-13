import tagStyled from 'styled-components';

export const ContentMain = tagStyled.div`
    height : calc(100% - ${props => props.theme.layout.header}px);

    padding : 20px 2%;
`