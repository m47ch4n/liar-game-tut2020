import React from 'react';
import { Flex, Box, Heading, Text, Button } from '@chakra-ui/core';
import signIn from '../util/signin';
import useFirebase from '../hooks/use_firebase';

export default () => {
  const firebsae = useFirebase();

  return (
    <Box p={[2, 4]} maxW="1024px" m="auto">
      <Flex justify="center" display="flex" flexDirection="column" textAlign="center" align="center" h="70vh">
        <Heading as="h1" size="2xl" mb={2}>
          みんなの研究室志望状況
        </Heading>
        <Heading as="h2" size="md" mb={12}>
          Liar game simulator for CS course at the Toyohashi University of Technology in 2020
        </Heading>
        <Text mb={8}>
          成績を入力してみんなの研究室志望状況を見てみよう！「みんなの研究室志望状況」は豊橋技術科学大学3系の2020年における研究室配属に特化して作成されたサービスです。
          あなたの成績と志望研究室を入力することで、研究室の競争率、あなたの順位などを知ることができます。成績は匿名化されているので、安心してご利用ください。
        </Text>
        <Button variantColor="teal" cursor="pointer" onClick={() => signIn(firebsae)}>
          いますぐはじめる
        </Button>
      </Flex>
    </Box>
  );
};
