import MetaMaskOnboarding from "@metamask/onboarding";

// Connect Metamask wallet
export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      const onboarding = new MetaMaskOnboarding();

      // Start onbording process
      onboarding.startOnboarding();
    } else if (window.ethereum) {
      // Connect account metamask account
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }
  } catch (err) {
    console.log(err);

    throw err;
  }
};

// Get connected account detail
export const getETHAccount = async () => {
  if (!window.ethereum) return;

  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  return accounts[0];
};

// Get current chainid info
export const getChainId = async () => {
  if (!window.ethereum) return;

  return await window.ethereum.request({ method: "eth_chainId" });
};

// Runs only they are brand new, or have hit the disconnect button
export const requestPermissions = async () => {
  if (!window.ethereum) return;

  await window.ethereum.request({
    method: "wallet_requestPermissions",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });
};

// Listen connect event
export const onConnect = () => {
  if (!window.ethereum) return;

  window.ethereum.on("connect", (connectInfo) => {
    console.log("connectInfo", connectInfo);
  });
};

// Listen disconnect event
export const onDisconnect = () => {
  if (!window.ethereum) return;

  window.ethereum.on("disconnect", (error) => {
    console.log("error", error);
  });
};

// Check if account is connected
export const isConnected = () => {
  if (!window.ethereum) return false;

  return window.ethereum.isConnected();
};

// Listen account changes
export const onAccountChanged = (setETHAccount) => {
  if (!window.ethereum) return;

  window.ethereum.on("accountsChanged", (accounts) => {
    const account = accounts.length > 0 ? accounts[0] : null;

    // Set ETH account state
    setETHAccount(account);
  });
};

// Listen chain id changes
export const onChainChanged = (setChainId) => {
  if (!window.ethereum) return;

  window.ethereum.on("chainChanged", (chainId) => {
    // Set chain id state
    setChainId(chainId);
  });
};
