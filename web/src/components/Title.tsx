import { Box, Flex, Text } from '@chakra-ui/react';

type TitleProps = {
  title: string;
}

export const Title = ({ title }: TitleProps) => {
  return (
    <Box width="100%" className="titleWrapper">
      <h1 className="title">{title}</h1>
      <div className="horizontalLine"></div>
    </Box>
  )
}
