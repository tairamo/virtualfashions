import { createContext, useContext, useEffect, useState } from "react";
import Web3Instance from "../utils/web3";

import { useAuth } from "./auth";
import SettingService from "../services/api/SettingService";
import {
  getChainId,
  isConnected,
  getETHAccount,
  onChainChanged,
  onAccountChanged,
} from "../utils/ethereum";

const web3 = new Web3Instance();
const ETHContext = createContext({});

export const ETHProvider = ({ children }) => {
  const { user } = useAuth();
  const [chainId, setChainId] = useState("");
  const [ethPrice, setETHPrice] = useState(0);
  const [balance, setBalance] = useState(0.0);
  const [ETHAccount, setETHAccount] = useState(null);

  // Get balance function
  const getBalance = async () => {
    // Get account balance
    const accountBalance = await web3.getBalance(ETHAccount);

    // Convert balacne into ether format
    const convetedBalance = web3.convertBalance(accountBalance, "ether");

    // Parse and fix balance to 0.00 decimals
    const parsedBalance = parseFloat(convetedBalance).toFixed(2);

    // Set balance state
    setBalance(parsedBalance);
  };

  useEffect(() => {
    if (!user) return;

    // On ETH account change
    onAccountChanged(setETHAccount);

    // On chain id change
    onChainChanged(setChainId);

    if (isConnected()) {
      // Get ETH account
      getETHAccount().then((account) => {
        // set ETH Account state
        setETHAccount(account);
      });

      // Get chain id
      getChainId().then((chain_Id) => {
        // set chain id state
        setChainId(chain_Id);
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user || !ETHAccount || !window.ethereum) return;

    // Call get balance function
    getBalance().then(() => {
      if (chainId !== "" && chainId !== process.env.NEXT_PUBLIC_CHAIN_ID) {
        // Set get balance state
        setBalance((0).toFixed(2));
      }
    });
  }, [ETHAccount, chainId, user]);

  useEffect(() => {
    const load = async () => {
      const { data } = await SettingService.fetchETHPrice();
      setETHPrice(data?.price);
    };
    load();
  }, []);

  return (
    <ETHContext.Provider value={{ chainId, ETHAccount, balance, ethPrice }}>
      {children}
    </ETHContext.Provider>
  );
};

export const useETH = () => useContext(ETHContext);
