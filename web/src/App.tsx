import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { wrap } from "comlink";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {
  darkTheme,
  DisclaimerComponent,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { theme } from "./styles";
import { Dashboard } from "./views/Dashboard";
import { Verifier } from "./views/Verifier";
import { Layout } from "./components/Layout";
import { Entity } from "./views/Entity";

const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.goerli,
    chain.polygon,
    chain.polygonMumbai,
    chain.optimism,
    chain.arbitrum,
  ],
  [publicProvider()]
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

const Disclaimer: DisclaimerComponent = ({
  Text,
  Link,
}: {
  Text: any;
  Link: any;
}) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and
    acknowledge you have read and understand the protocol{" "}
    <Link href="https://disclaimer.xyz">Disclaimer</Link>
  </Text>
);

// Routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "verifier",
        element: <Verifier />,
      },
      {
        path: "entity",
        element: <Entity />,
      },
    ],
  },
]);

const App = () => {
  // Memoize worker and workerApi to prevent unneccessary rerenders
  const worker = useMemo(() => {
    return new Worker(new URL("./hideme.worker", import.meta.url), {
      name: "hideme.worker",
      type: "module",
    });
  }, []);

  const workerApi = useMemo(() => {
    return wrap<import("./hideme.worker").HideMeClient>(worker);
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
        <title>HIDEME.LOL</title>
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
            <RouterProvider router={router} />
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </>
  );
};

export default App;
