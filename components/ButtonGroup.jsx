import {Button} from "./index";

export default function ButtonGroup({setActive, router}) {
    const hasConnected = true;
    return hasConnected ? (
        <Button classStyles={'mx-2 rounded-xl'} handleClick={() => {
            setActive('');
            router.push('/create-nfts');
        }}>Create</Button>
    ) : <Button classStyles={'mx-2 rounded-xl'} handleClick={() => {
    }}>Connect</Button>
}