import { Text } from "@chakra-ui/react";
import { EntityForm } from "../components/EntityForm";
import { Hero } from "../components/Hero";
import { HideMeProps } from "../hideme-types";

export const Entity = ({ wasmWorkerApi }: HideMeProps) => {
  return (
    <div style={{ width: "100%" }}>
      <Hero
        title={"Entity Certificate"}
        subtitle={"How it works"}
        imageUrl={"/assets/entity-certificate.png"}
      >
        <Text textAlign="justify">
          A certificate is a set of data points with a key and value.
        </Text>
        <br />
        <Text textAlign="justify">
          The issuer states that the lines of data are true, and creates a hash
          of the data that is stored on chain.
        </Text>
        <br />
        <Text textAlign="justify">
          The recipient, is able to reveal a specific lines such that it can be
          verified it is from the certificate.
        </Text>
      </Hero>
      <div className="page-container-outer">
        <div className="page-container">
          <EntityForm wasmWorkerApi={wasmWorkerApi} />
        </div>
      </div>
    </div>
  );
};
