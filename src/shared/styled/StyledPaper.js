import {
    Paper, styled,
} from '@mui/material';

export default styled(Paper)`
    background-color : black ;
    border : 1px solid gray;

    & .MuiDialogContent-root {
        position : relative;

        display : flex;
        flex-direction : column;
        align-items : center;

        padding : 20px 20px 20px 20px !important;
    }

    & .MuiDialogTitle-root {
        color : white;
        border-bottom : 1px solid gray;
    }

    & .MuiDialogActions-root {
        border-top : 1px solid gray;
        padding : 10px;
    }
`