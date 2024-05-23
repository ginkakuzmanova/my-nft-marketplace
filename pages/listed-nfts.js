import { useState, useEffect } from 'react';
import { Loader, NFTCard } from '../components';
import { makeId } from "../utils/makeId";

const nftsTest = [1,2,3,4,5,6,7,8,9];

export default function ListedNFTs() {
    const [nfts] = useState(nftsTest);
    const [isLoading, setIsLoading] = useState(true);

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

    if(!isLoading && !nfts.length) {
        return (<div className={'flexCenter sm:p-4 min-h-screen'}>
            <h1 className={'font-poppins dark:text-white text-nft-black-1 text-3xl font-bold'}>No NFTs Listed for Sale!</h1>
        </div>)
    }

    return (
        <div className={'flex justify-center sm:px-4 p-12 min-h-screen'}>
            <div className={'w-full minmd:w-4/5'}>
                <div className={'mt-4'}>
                    <h2 className={'font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold mt-2 ml-4 sm:ml-2'}>NFTs Listed For Sale</h2>

                    <div className={'mt-3 w-full flex flex-wrap justify-start md:justify-center'}>
                        {nfts.map((item) => (
                            <NFTCard key={`nft-${item}`} nft={{ i: item, name: `Nifty NFT ${item}`, price: (10 - item * 0.535).toFixed(2), seller: `0x${makeId(3)}...${makeId(4)}`, owner: `0x${makeId(3)}...${makeId(4)}`, description: 'Cool NFT on Sale' }}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}