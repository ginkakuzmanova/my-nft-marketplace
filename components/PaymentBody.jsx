import React from 'react';
import images from '../assets';
import Image from 'next/image';
import { shortenAddress } from "../utils/shortenAddress";


const PaymentBody = () => (
    <div className='flex flex-col'>
        <div className='flexBetween'>
            <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl'>
                Item
            </p>
            <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl'>
                Subtotal
            </p>
        </div>

        <div className='flexBetweenStart my-5'>
            <div className='flex-1 flexStartCenter'>
                <div className='relative w-28 h-28'>
                    <Image
                        src={images.nft6}
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
                <div className='flexCenterStart flex-col ml-5'>
                    <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl'>
                        {shortenAddress('0xbDA5747bFD65F08deb54cb465eB87D40e51B197E')}
                    </p>
                    <p className='font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal'>
                        {'Ginka'}
                    </p>
                </div>
            </div>

            <div>
                <p className='font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal'>
                    {nft.price} <span className='font-semibold'>{'ETH'}</span>
                </p>
            </div>
        </div>

        <div className='flexBetween mt-10'>
            <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl'>
                Total
            </p>
            <p className='font-poppins dark:text-white text-nft-black-1 text-base minlg:text-xl font-normal'>
                {nft.price} <span className='font-semibold'>{nftCurrency}</span>
            </p>
        </div>
    </div>
);



export default PaymentBody;