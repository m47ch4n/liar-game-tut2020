import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { Box, Heading, Flex, Text } from '@chakra-ui/core';

import useFirebase from '../hooks/use_firebase';
import useUser from '../hooks/use_user';
import { TITLE_SHORT } from '../constants/site';
import { ROOT, TERMS, GPA_FORM, LAB_FORM } from '../constants/routes';

const MenuItems = ({ children, ...props }) => (
  <Text cursor="pointer" {...props} mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

export default props => {
  const [show, setShow] = useState(false);
  const { load, user } = useUser();
  const handleToggle = () => setShow(!show);
  const dispatch = useDispatch();
  const firebase = useFirebase();

  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  const isSignedIn: boolean = !load && user;
  const display = show ? 'block' : 'none';

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
      <Flex align="center" mr={10}>
        <Heading cursor="pointer" as="h1" size="lg" letterSpacing={'-.1rem'} onClick={() => dispatch(push(ROOT))}>
          {TITLE_SHORT}
        </Heading>
      </Flex>

      <Box display={{ xs: 'block', sm: 'block', md: 'none' }} onClick={handleToggle}>
        <svg fill="white" width="16px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box display={[display, display, 'flex']} width={['full', 'full', 'auto']} alignItems="center" flexGrow={1}>
        {isSignedIn && (
          <>
            <MenuItems onClick={() => dispatch(push(GPA_FORM))}>成績設定</MenuItems>
            <MenuItems onClick={() => dispatch(push(LAB_FORM))}>志望設定</MenuItems>
          </>
        )}
      </Box>

      <Box display={[display, display, 'flex']} mt={{ base: 4, md: 0 }}>
        <MenuItems onClick={() => dispatch(push(TERMS))}>利用規約</MenuItems>
        {isSignedIn && <MenuItems onClick={() => handleSignOut()}>サインアウト</MenuItems>}
      </Box>
    </Flex>
  );
};
