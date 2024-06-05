import { Button, Flex, Heading, Input } from '@chakra-ui/react';
import React, { useRef } from 'react';

export const Login = () => {

  const usernameInput = useRef()
  const passwordInput = useRef()

  const LoginHandler = () => {

    // These are the values from the form that you will need to send in your request.

    const username = usernameInput.current.value
    const password = passwordInput.current.value

    // TODO: Make HTTP request to login endpoint in backend.
    // TODO: Save response data to session storage.
    const loginData = {
      username: username,
      password: password
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
      method: 'post',
      headers: {
        
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(loginData)
    })
    .then(res=> res.json())
    .then(body=>{
      if(body.token !== null) sessionStorage.setItem('token', body.token)
      if(body.userGroup !== null) sessionStorage.setItem('userGroup', body.userGroup)
    });
  }

  return (
    <Flex direction={'column'} alignItems={'center'} gap={5} w={'50%'} mx={'auto'}>
      <Heading>Login</Heading>
      <Input ref={usernameInput} type="text" placeholder="Please enter your username" />
      <Input ref={passwordInput} type='password' placeholder="Please enter your password" />
      <Button onClick={LoginHandler}>Submit</Button>
    </Flex>
  );
};
