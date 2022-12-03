import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const CollapsibleCard = ({
  title,
  address,
  date,
  children,
}: PropsWithChildren<{
  title: string;
  date: Date;
  address: string;
}>) => {
  return (
    <Card className="cardContainer">
      <CardBody padding={0} paddingRight={3} paddingLeft={3}>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Flex width={"100%"} justify={"space-between"}>
                  <Box>
                    <Heading size="md">{title}</Heading>
                  </Box>
                  <Flex>
                    <Box>
                      <Heading size="sm">Certified By:</Heading>
                      <Text>
                        {address.slice(0, 4)}...$
                        {address.slice(address.length - 4, address.length)}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="sm">Created On:</Heading>
                      <Text>{date.toLocaleDateString()}</Text>
                    </Box>
                  </Flex>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} w="full">
              {children}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
};
