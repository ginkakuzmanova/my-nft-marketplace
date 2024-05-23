import Link from "next/link";

const activeStatus = {
    0: '/',
    1: '/listed-nfts',
    2: '/my-nfts'
};

export default function MenuItems({isMobile, active, setActive}) {
    const generateLink = (index) => {
        return activeStatus[index] || '/';
    }
    return (
        <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
            {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, index) => (
                <li key={index} onClick={() => setActive(item)} className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 
                ${item === active ? 'dark:text-white text-nft-black-1' : 'dark:text-nft-gray-2 text-nft-gray-2'} ${isMobile && 'my-3'}`}>
                    <Link href={generateLink(index)}>
                        {item}
                    </Link>
                </li>
            ))}
        </ul>
    )
}