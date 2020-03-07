import React, { useState } from 'react';
import { auth } from 'firebase/app';
import { useDispatch } from 'react-redux';
import useFirebase from '../hooks/use_firebase';
import { push } from 'connected-react-router';

import { Box, Heading, Flex, Text, Button } from '@chakra-ui/core';

import { TITLE_SHORT } from '../constants/site';
import { LANDING, TERMS } from '../constants/routes';

const MenuItems = ({ children, ...props }) => (
  <Text cursor="pointer" {...props} mt={{ base: 4, sm: 0 }} mr={6} display="block">
    {children}
  </Text>
);

export default props => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const dispatch = useDispatch();
  const firebase = useFirebase();

  const handleSignIn = () => {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({
      hd: 'tut.jp',
    });
    firebase.auth().signInWithRedirect(provider);
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading cursor="pointer" as="h1" size="lg" letterSpacing={'-.1rem'} onClick={() => dispatch(push(LANDING))}>
          {TITLE_SHORT}
        </Heading>
      </Flex>

      <Box display={{ xs: 'block', sm: 'none' }} onClick={handleToggle}>
        <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ xs: show ? 'block' : 'none', sm: 'flex' }}
        width={{ xs: 'full', sm: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems onClick={() => dispatch(push(TERMS))}>利用規約</MenuItems>
      </Box>

      <Box display={{ xs: show ? 'block' : 'none', sm: 'block' }} mt={{ base: 4, sm: 0 }}>
        <Button bg="transparent" border="1px" onClick={handleSignIn}>
          サインイン
        </Button>
      </Box>
      <Box display={{ xs: show ? 'block' : 'none', sm: 'block' }} mt={{ base: 4, sm: 0 }}>
        <Button bg="transparent" border="1px" onClick={handleSignOut}>
          サインアウト
        </Button>
      </Box>
    </Flex>
  );
};
