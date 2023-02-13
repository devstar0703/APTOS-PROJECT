import tagStyled from 'styled-components';

import {
    Paper, styled,
    TextField,
    Button
} from '@mui/material';

export const StyledPaper = styled(Paper)`
    background-color : black ;
    border : 1px solid gray;

    .MuiDialogContent-root {
        position : relative;

        display : flex;
        flex-direction : column;
        align-items : center;

        padding : 20px 20px;
    }
`

export const NFTViewMain = tagStyled.div`
    width : 100%;

    background : black ;

    border-radius : 5px;

    overflow : hidden ;

    p {
        margin : 0px;
        padding-left : 10px;
        padding-right : 10px;
    }
`

export const NFTOwner = tagStyled.p`
    padding-top : 5px;
    font-size : 20px;
    color : rgb(100, 116, 139);
`

export const NFTImage = tagStyled.img`
    width : 50%;
    min-width : 300px;

    border-radius : 5px;
`

export const NFTName = tagStyled.p`
    color : white;
    font-size : 23px;
    padding : 5px;
`

export const NFTDesc = tagStyled.p`
    color : rgb(100, 116, 139);
    font-size : 20px;
`

export const StyledTextField = styled(TextField)`

    & .MuiFormHelperText-root {
        font-size : 14px;
        font-weight : bold;
    }

    &.success {
        & .MuiFormHelperText-root {
            color : #18bd18;
        }
    }

    &.error {
        & .MuiFormHelperText-root {
            color : red;
        }
    }

    & .MuiOutlinedInput-root {
        svg {
            color : white;
        }
        
        margin-top : 20px;
        background : #1F2025 !important;
        border-radius : 10px;

        & fieldset {
            border-color: none;
        }

        &:hover fieldset {
            border-color: none;
        }

        &.Mui-focused fieldset {
            border : 2px solid red;
        }

    }

    & .MuiInputBase-input {
        background : #1F2025 !important;
        color : white !important;
        border-radius : 10px;
        padding : 15px !important;
    }
`

export const StyledButton = styled(Button)`
    margin-top : 20px;

    background : #fe3301;
    border-radius : 30px;
    padding: 10px 30px;
    color : white;
    text-transform : capitalize ;

    :hover {
        background : #fe3301; 
    }

    &:disabled {
        background : gray;
        cursor : not-allowed !important;
    }
`