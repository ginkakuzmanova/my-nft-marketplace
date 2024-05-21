import {Button} from "./index";
import {NFTContext} from "../context/NFTContext";
import {useContext} from "react";

export default function ButtonGroup({setActive, router}) {
    const { connectWallet, currentAccount } = useContext(NFTContext);

    return currentAccount ? (
        <Button classStyles={'mx-2 rounded-xl'} handleClick={() => {
            setActive('');
            router.push('/create-nft');
        }}>Create</Button>
    ) : <Button classStyles={'mx-2 rounded-xl'} handleClick={connectWallet}>Connect</Button>
}