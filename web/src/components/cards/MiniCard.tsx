import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Heading,
  Text,
} from "@chakra-ui/react";

export const MiniCard = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <Card h={175} w={250}>
      <CardHeader padding={3}>
        <Heading size="sm">{title}</Heading>
      </CardHeader>
      <CardBody padding={0} paddingRight={3} paddingLeft={3}>
        <Text>{content}</Text>
      </CardBody>
      <CardFooter padding={3} justifyContent="end">
        <Checkbox />
      </CardFooter>
    </Card>
  );
};
