import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  CardFooter,
  Button,
} from '@chakra-ui/react';
import React from 'react';

export const FoodItem = ({foodId, name, description}) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">
          {name}
        </Heading>
      </CardHeader>

      <CardBody>
        {description === null? "No description": description}
      </CardBody>
      <CardFooter>
        <Button variant={'outline'} colorScheme="red">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
