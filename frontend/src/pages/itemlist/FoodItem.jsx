import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  CardFooter,
  Button,
} from '@chakra-ui/react';
import React from 'react';

export const FoodItem = ({foodId, name, description, listItems, setListItems}) => {
  const HandleDelete =() => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/food/delete/${foodId}`,{
        method: 'delete',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
          
      })
      .then(res => res.json())
      .then(success =>{
        if(success){
          const newItems = listItems.filter(item => item.foodId !== foodId)
          setListItems([...newItems])
        }
      });
  }
  return (
    <Card>
      <CardHeader>
        <Heading size="md">
          {name}
        </Heading>
      </CardHeader>

      <CardBody>
        {description === null? "No description" : description}
      </CardBody>
      <CardFooter>
        {sessionStorage.getItem('userGroup') === '1' && (
          <Button onClick={HandleDelete} variant={'outline'} colorScheme="red">
          Delete
          </Button>

        )}
      </CardFooter>
    </Card>
  );
};
