import * as React from 'react' ;

import validator from 'validator';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Loading from 'react-loading-components';

import { 
    MintNowDiv,
    CounterDiv,
    CircularDiv,
    StyledP,
    CounterButton,
    TitleDiv,
    DescPara
} from './styled/MintNow.styled';

import { StyledButton, StyledTextField } from 'src/shared/styled';

import swal from 'sweetalert';

import * as Wagmi from "wagmi";
import { ethers } from 'ethers';

import { nftAddr } from 'src/web3/addr';
import nftAbi from 'src/web3/abi/nft.json' ;

const MintNow = () => {
    const [loading, setLoading] = React.useState(false) ;
    const [address, setAddress] = React.useState('') ;
    const [totalSupply, setTotalSupply] = React.useState(0) ;
    const [mint_amount, setMintAmount] = React.useState(1) ;
    const [max_amount, setMaxAmount] = React.useState(2);
    const [public_price, setPublicPrice] = React.useState(0) ;

    const {data: signer} = Wagmi.useSigner() ;

    const nftInstance = Wagmi.useContract({
		address: nftAddr,
		abi: nftAbi,
		signerOrProvider: signer,
	});

    const handleDecrease = () => {
        if(mint_amount <= 1) return;
        setMintAmount(mint_amount - 1);
    }

    const handleIncrease = () => {
        if(mint_amount === max_amount || !max_amount) return ;
        setMintAmount(mint_amount + 1);
    }

    const getTotalSupply = async () => {
        let amount = await nftInstance.totalSupply() ;

        setTotalSupply(Number(amount.toString())) ;
        setMaxAmount(10000 - Number(amount.toString())) ;
    }

    const handleMint = async () => {
        try {
            setLoading(true);

            let receipt = await nftInstance.mint(address, mint_amount);

            await receipt.wait() ;

            console.log(receipt);

            await getTotalSupply();

            setLoading(false);

            setMintAmount(1);
            setAddress('');

            return swal({
                title : 'Success',
                text : `You mint ${mint_amount} nfts successfully`,
                buttons : false,
                timer : 3000,
                icon : 'success'
            }) ;
        } catch(err) {
            console.log(err);
        }
    }
    
    React.useEffect(() => {
        async function publicPrice() {
            let price = await nftInstance.publicPrice() ;

            price = ethers.utils.formatUnits(price.toString(), '18') ;

            setPublicPrice(Number(price.toString()));
        }
          
        if(signer) {
            getTotalSupply();
            publicPrice();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer]);

    return (
        <MintNowDiv>
            <TitleDiv>
                APTOS Mint Pass
            </TitleDiv>
            <CircularDiv>
                <CircularProgressbar 
                    value={Number(Number(totalSupply) / 10000).toFixed(3)} 
                    text={`${Number(Number(totalSupply) / 10000).toFixed(3)}%`} 
                    styles={buildStyles({
                        pathColor: "#FE3301",
                        trailColor: "#132135",
                        textColor: "#FE3301",
                    })}
                />
            </CircularDiv>
            <DescPara>
                {
                    !Number(totalSupply) ? "No NFT mints yet." : `${totalSupply}/10000 already minted`
                }
            </DescPara>
            <DescPara>
                {
                    !Number(max_amount) && "Marketplace open period has ended."
                }
            </DescPara>
            <CounterDiv>
                <CounterButton onClick={() => handleDecrease()}>
                    -
                </CounterButton>
                <StyledTextField 
                    value={mint_amount}
                    onChange={(e) => setMintAmount(Number(e.target.value))}
                    size='small'
                />
                <CounterButton onClick={() => handleIncrease()}>
                    +
                </CounterButton>
            </CounterDiv>
            <StyledTextField 
                placeholder='You will mint nft into this address.'
                fullWidth
                size='small'
                onChange={(e) => setAddress(e.target.value)}
                helperText={(!validator.isEthereumAddress(address) && address) ? "Invalid Address" : ""}
            />
            <StyledP>
                Total Cost : {mint_amount} Ξ { mint_amount > 0 ? `(${Number(public_price * mint_amount).toFixed(1)} AVAX)` : '0 AVAX'}
            </StyledP>
            <br/>
            <StyledButton variant='contained' onClick={() => handleMint()} 
                disabled={
                    !max_amount
                    || !validator.isEthereumAddress(address)
                    || loading
                }
                startIcon={loading && <Loading type='oval' width={25} height={25}/>}
            >
                {loading ? '...Minting' : 'Mint Now'}
            </StyledButton>
        </MintNowDiv>
    )
}

export default MintNow ;