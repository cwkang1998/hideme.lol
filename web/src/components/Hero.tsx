import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const Hero = ({
  title,
  subtitle,
  imageUrl,
  children,
}: PropsWithChildren<{
  title: string;
  subtitle: string;
  imageUrl: string;
}>) => {
  return (
    <Box w="100%" p={16} className="heroSection">
      <div className="heroSectionInner">
        <Heading size="lg" mb={4}>
          {title}
        </Heading>
        <Flex justifyContent="space-between">
          <Box>
            <Heading size="md" mb={4}>
              {subtitle}
            </Heading>
            <Box pr={8}>{children}</Box>
          </Box>
          <Image src={imageUrl} height={250} />
        </Flex>
      </div>
    </Box>
  );
};
