import React from 'react';
import Image from 'next/image';
import images from '../assets';

function Loader() {
    return (
        <div className={'flexCenter w-full my-4'}>
            <Image src={images.loader} alt={'Loader'} width={100} objectFit={'contain'} />
        </div>
    );
}

export default Loader;