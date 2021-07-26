import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { useETH } from "../context/ETH";
import Web3Instance from "../utils/web3";
import Layout from "../components/layout";
import { ErrorMsg } from "../components/alerts/error";
import { DashboradWidget } from "../components/widgets/dashboard";
import {
  NOT_ENOUGH_ETH,
  WITHDRAW_ERROR,
  CONNECT_MAINNET,
  CONTRACT_BALANCE,
  COMMISSION_EARNED,
  COMMISSION_FETCHING_ERROR,
} from "../constants";

const web3 = new Web3Instance();

function Dashboard(props) {
  const { ETHAccount, chainId } = useETH();

  const [commission, setCommission] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [contractBalance, setContractBalance] = useState(0);

  // Get commission function
  const getCommission = async () => {
    try {
      const commission = await web3.getCommission(ETHAccount);
      const commissionEther = web3.convertBalance(commission, "ether");

      // Set commission state
      setCommission(parseFloat(commissionEther));
    } catch (err) {
      // Set commission state
      setCommission(0);

      // Show error message
      toast.error(<ErrorMsg msg={COMMISSION_FETCHING_ERROR} />);
    }
  };

  // Get contract balance
  const getContractBalance = async () => {
    try {
      const balance = await web3.getContractBalance(ETHAccount);
      const balanceEther = web3.convertBalance(balance, "ether");

      // Set contract balance state
      setContractBalance(parseFloat(balanceEther));
    } catch (err) {
      // Set contract balance state
      setContractBalance(0);
    }
  };

  // On withdraw click handler
  const onWithdrawClickHandler = async () => {
    try {
      if (commission <= 0) {
        throw new Error(NOT_ENOUGH_ETH);
      }

      // Set is loading state
      setIsLoading(true);

      // Call withdraw commission function
      await web3.withdrawCommission(ETHAccount);

      // Call get commission function
      getCommission();

      // Call get contract balance function
      getContractBalance();
    } catch (err) {
      console.log(err);

      // Show error message
      toast.error(<ErrorMsg msg={WITHDRAW_ERROR} />);
    } finally {
      // Set is loading state
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!ETHAccount) return;

    // Call get commission function
    getCommission();

    // Call get contract balance function
    getContractBalance();
  }, [ETHAccount, chainId]);

  let buttonText = COMMISSION_EARNED;
  let isDisabled = false;
  if (chainId !== "" && chainId !== process.env.NEXT_PUBLIC_CHAIN_ID) {
    isDisabled = true;
    buttonText = CONNECT_MAINNET;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-4 sm:pb-6 md:pb-8">
        <h1 className="text-2xl font-semibold text-gray-900 w-min">
          Dashboard
        </h1>
      </div>

      <div className="grid-cols-1sm grid gap-12 sm:grid-cols-2sm">
        <DashboradWidget
          title={CONTRACT_BALANCE}
          amount={contractBalance}
          showButton={false}
        />
        <DashboradWidget
          text={buttonText}
          amount={commission}
          showButton={true}
          loading={isLoading}
          isDisabled={isDisabled}
          title={COMMISSION_EARNED}
          withdraw={onWithdrawClickHandler}
        />
      </div>
    </Layout>
  );
}

export default Dashboard;
