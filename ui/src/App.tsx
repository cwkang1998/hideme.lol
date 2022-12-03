import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { wrap } from "comlink";
import { ChakraProvider } from "@chakra-ui/react";
import {
  darkTheme,
  DisclaimerComponent,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  Chain,
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { theme } from "./styles";
import { MainPage } from "./MainPage";

const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.goerli,
    chain.polygon,
    chain.polygonMumbai,
    chain.optimism,
    chain.arbitrum,
    {
      id: 534354,
      name: "Scroll L2 Testnet",
      testnet: true,
      network: "scrolll2testnet",
      rpcUrls: {
        public: "https://prealpha.scroll.io/l2",
        default: "https://prealpha.scroll.io/l2",
      },
    },
  ],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: (curChain: Chain) => {
        if (curChain.id === 534354) {
          return { http: "https://prealpha.scroll.io/l2" };
        }
        return { http: chain.goerli.rpcUrls[0] };
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "zk-form",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [...connectors()],
  provider,
});

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and
    acknowledge you have read and understand the protocol{" "}
    <Link href="https://disclaimer.xyz">Disclaimer</Link>
  </Text>
);

const App = () => {
  // Memoize worker and workerApi to prevent unneccessary rerenders
  const worker = useMemo(() => {
    return new Worker(new URL("./file-hasher.worker", import.meta.url), {
      name: "file-hasher.worker",
      type: "module",
    });
  }, []);

  const workerApi = useMemo(() => {
    return wrap<import("./file-hasher.worker").FileHasher>(worker);
  }, [worker]);

  useEffect(() => {
    const asyncFn = async () => {
      await workerApi.initialize();
    };
    if (worker && workerApi) {
      asyncFn();
    }
  }, [worker, workerApi]);

  return (
    <>
      <Helmet>
        <title>Zk Form</title>
      </Helmet>
      <ChakraProvider resetCSS theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            theme={darkTheme({
              ...darkTheme.accentColors.blue,
            })}
            appInfo={{
              disclaimer: Disclaimer,
            }}
            coolMode
          >
            <MainPage wasmWorkerApi={workerApi} />
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </>
  );
};

export default App;
