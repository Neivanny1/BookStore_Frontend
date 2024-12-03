import { useEffect, useState } from 'react';
import { useAccount, useConnect, useReadContract, useWriteContract } from 'wagmi';

// useReadCONTRACT - get or read from the get functions from smart contract
// useWriteContract - write to your smart contract
import BookStoreAbi from '../blockchain-services/abi/BookStore.json'

const contractAddress = '0x0F9696E62ce7BF9fDCBa39FD3ad1cAE821E2458a' // deployed sepolia

export const useBookStore = () => {

    const [bookId, setBookId] = useState(1); // example book ID state
    
    // Read book data from the contract
    const { data: readData, isError: readError, error: readContractError, isLoading: isReadLoading } = useReadContract({
        address: contractAddress,
        abi: BookStoreAbi.abi,
        functionName: 'getBooks',
        args: [bookId],
    });

// Write book data to the contract (e.g., adding a new book)
const { data: writeContract, isError: writeError, error: writeContractError, isLoading: isWriteLoading  } = useWriteContract({
    address: contractAddress,
    abi: BookStoreAbi.abi,
    functionName: 'addBook',
});

// Function to trigger writing a new book to the contract
const setBookData = async (bookId, title, author, price, stock) => {
    try {
        const txResponse = await writeContract({
            args: [bookId, title, author, price, stock],
        });
        console.log('Transaction Response:', txResponse);
    } catch (error) {
        console.error('Error adding book:', error);
    }
};

return { readData, writeContract, addBook, readError, readContractError, isReadLoading, isWriteLoading, writeError, writeContractError };

}