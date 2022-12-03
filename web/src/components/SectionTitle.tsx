import { Box, Divider, Heading } from "@chakra-ui/react";

export const SectionTitle = ({ title }: { title: string }) => {
  return (
    <Box>
      <Heading size="md">{title}</Heading>
      <Divider />
    </Box>
  );
};
