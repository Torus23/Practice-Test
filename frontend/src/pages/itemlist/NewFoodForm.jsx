import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import {useNavigate} from 'react-router-dom';

export const NewFoodForm = ({ isOpen, onClose }) => {
  
  const navigate = useNavigate()

  const SubmitFormHandler = () => {
    const name = foodName.current.value;
    const description = foodDescription.current.value;
    
    const newFoodRequest = {
      "name": name,
      "description": description,
      "restaurantId": 1
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/food/create`, {
      method: 'post',
      body: JSON.stringify(newFoodRequest),
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    .then(res => res.json())
    .then(success =>{
      if(success) navigate(0);
    })
};
  const foodName = useRef('');
  const foodDescription = useRef('');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Food</ModalHeader>
        <ModalCloseButton />
        <ModalBody>          
          <Input ref={foodName} placeholder="Name" />
          <Input ref={foodDescription} placeholder="Description" />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="gray"
            variant={'outline'}
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
          <Button onClick={SubmitFormHandler} variant="outline" colorScheme="green">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
