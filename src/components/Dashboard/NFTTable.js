import * as React from 'react';

import { ipfs_origin } from 'src/utils/static';

import aptosList from 'src/shared/data/aptos_list.json';

import {
    Table,
    TableHead,
    TableBody,
    TableFooter,
    TablePagination,
    TableRow,
    TableCell
} from '@mui/material';

import { 
    NFTAsset, 
    NFTTableContainer,
    useStyles
} from './styles/NFTTable.styles';

import NFTView from './NFTView';

import { StyledTextField } from './styles/NFTView.styles';

console.log(aptosList);

const NFTTable = (props) => {
    const headFields = [
        "",
        "Name",
        "Description"
    ] ;

    const classes = useStyles() ;

    const [search_id, setSearchId] = React.useState('');
    const [selectedNFT, setSelectedNFT] = React.useState({});
    const [openNFTView, setOpenNFTView] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenNFTView = () => { setOpenNFTView(true) }
    const handleCloseNFTView = () => { setOpenNFTView(false) }

    return (
        <>
            <StyledTextField 
                placeholder='Enter NFT ID'
                value={search_id}
                onChange={(e) => setSearchId(e.target.value)}
            />
            <NFTTableContainer >
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                headFields.map((field, index) => {
                                    return (
                                        <TableCell key={index}>{ field }</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            aptosList.filter(nft =>
                                nft.name.search(search_id) >= 0
                            ).slice(
                                page * rowsPerPage, page * rowsPerPage + rowsPerPage
                            ).map((nft, index) => (
                                <TableRow key={index}
                                    onClick={() => {
                                        handleOpenNFTView();
                                        setSelectedNFT({
                                            ...nft,
                                            assetUrl : `${ipfs_origin}/${nft.image.replaceAll('ipfs://','')}`
                                        });
                                    }}
                                >
                                    <TableCell
                                        sx={{width : '150px'}}
                                    >
                                        <NFTAsset src={`${ipfs_origin}/${nft.image.replaceAll('ipfs://','')}`} />
                                    </TableCell>
                                    <TableCell>
                                        {nft.name}
                                    </TableCell>
                                    <TableCell>
                                        {nft.description}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                labelRowsPerPage={"NFTs per page"}
                                count={10000}
                                SelectProps={{
                                    MenuProps : {
                                        classes : {
                                            paper :  classes.paper
                                        }
                                    }
                                }}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />    
                        </TableRow>
                    
                    </TableFooter>
                </Table>
            </NFTTableContainer>
            <NFTView 
                open={openNFTView}
                handleClose={handleCloseNFTView}
                nftInfo={selectedNFT}
            />
        </>
    )
}

export default NFTTable;