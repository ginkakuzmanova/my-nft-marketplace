import Image  from "next/image";
import images from '../assets';
import {Banner, Loader, NFTCard, SearchBar} from "../components";
import {shortenAddress} from "../utils/shortenAddress";
import {useEffect, useState} from "react";
import {makeId} from "../utils/makeId";

const nftsTest = [10,9,8,7,6,5,4,3,2];

export default function MyNFTs() {
    const currentAccount = '057794nf03677i9549';
    const [isLoading, setIsLoading] = useState(true);
    const [activeSelect, setActiveSelect] = useState('Recently Added');

    const onHandleSearch = (value) => {
        const filteredNFT = '';
    };

    const onClearSearch = () => setActiveSelect('');


    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 600);
        return () => {
            clearTimeout(timeout);
        }
    }, []);

    if(isLoading) {
        return (
            <div className={'flexStart min-h-screen'}>
                <Loader />
            </div>
        )
    }

    return (
        <div className={'w-full flex justify-start items-center flex-col min-h-screen'}>
            <div className={'w-full flexCenter flex-col'}>
                <Banner text={'Your Nifty NFTS'} childStyles={'text-center mb-4'} parentStyles={'h-80 justify-center'} />
                <div className={'flexCenter flex-col -mt-20 z-0'}>
                    <div className={'flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full'}>
                        <Image src={images.creator1} alt={'creator'} objectFit={'cover'}
                               className={'rounded-full object-cover'}/>
                    </div>
                    <p className={'font-semibold font-poppins dark:text-white text-nft-black-1 text-2xl mt-6'}>{shortenAddress(currentAccount)}</p>
                </div>
            </div>

            {
                !isLoading && !nftsTest ? (
                    <div className={'flexCenter sm:p-4 p-16'}>
                        <h1 className={'font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl'}>No NFTs owned!</h1>
                    </div>
                ) : (
                    <div className={'sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col'}>
                        <div className={'flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8'}>
                            <SearchBar activeSelect={activeSelect} setActiveSelect={setActiveSelect} handleSearch={onHandleSearch} clearSearch={onClearSearch}/>
                        </div>
                        <div className={'mt-3 w-full flex flex-wrap justify-start md:justify-center'}>
                            {nftsTest.map((item) => (
                                <NFTCard key={`nft-${item}`} nft={{
                                    i: item,
                                    name: `Nifty NFT ${item}`,
                                    price: (10 - item * 0.535).toFixed(2),
                                    seller: `0x${makeId(3)}...${makeId(4)}`,
                                    owner: `0x${makeId(3)}...${makeId(4)}`,
                                    description: 'Cool NFT on Sale'
                                }}/>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}