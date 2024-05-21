import React, {useEffect, useState} from 'react';
import {create as ipfsHttpClient} from "ipfs-http-client";
import Web3Modal from 'web3modal';
import {ethers} from "ethers";
import {MarketAddress, MarketAddressABI} from "./constants";
import axios from "axios";

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
const fetchContract = (signerOrProvider) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);
export const NFTContext = React.createContext();
export const NFTProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const nftCurrency = 'ETH';

    const checkIfWalletIsConnected = async () => {
      if (!window.ethereum) return alert('Please connect to MetaMask!');

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
          setCurrentAccount(accounts[0]);
      } else {
          console.log('No accounts left.')
      }
    };

    const connectWallet = async () => {
        if (!window.ethereum) return alert('Please connect to MetaMask!');

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        setCurrentAccount(accounts[0]);
        window.location.reload();
    };

    const uploadToIPFS = async (file, setFileUrl) => {
        try {
            const added = await client.add({ content: file });
            return `https://ipfs.infura.io/ipfs/${added.path}`;
        } catch(error) {
            console.error('Error while uploading IPFS');
        }
    }

    const createSale = async (url, formInputPrice, isReselling, id) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const price = ethers.utils.parseUnits(formInputPrice, 'ether');
        const contract = fetchContract(signer);
        const listingPrice = await contract.getListingPrice();
        const transaction = await contract.createToken(url, price, { value: listingPrice.toString() });

        await transaction.wait();
    };

    const createNFT = async (formInput, fileUrl, router) => {
        const { name, description, price } = formInput;

        if (!name || !description || !price || !fileUrl) { return; }
        const data = JSON.stringify({ name, description, image: fileUrl });
        try {
            const added = await client.add(data);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            await createSale(url, price);

            router.push('/');
        } catch (e) {
            console.error('Error while creating NFT');
        }
    }

    const fetchNFTs = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);
        const data = await contract.fetchMarketItems();

        return await Promise.all(data
            .map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                const tokenURI = await contract.getTokenURI(tokenId);
                const {data: {image, name, description}} = await axios.get(tokenURI);
                const price = ethers.utils.formatUnits(unformattedPrice.toString(), 'ethers');

                return {price, tokenId: tokenId.toNumber(), seller, owner, image, name, description, tokenURI}
            }));
    }

    useEffect(async () => {
        await checkIfWalletIsConnected();
    }, []);

    return (
        <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS, createNFT, fetchNFTs }}>
            {children}
        </NFTContext.Provider>
    )
};