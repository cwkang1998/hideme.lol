import { Box, Divider, Heading } from "@chakra-ui/react";

export const SectionTitle = ({ title }: { title: string }) => {
  return (
    <Box>
      <Heading fontFamily="Inconsolata" color="white" size="xl">{title}</Heading>
      <Divider />
    </Box>
  );
};
