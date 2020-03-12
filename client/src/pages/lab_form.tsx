import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { useForm } from 'react-hook-form';
import { LabFormData } from '../types';
import useFirebase from '../hooks/use_firebase';
import useUser from '../hooks/use_user';
import useSample from '../hooks/use_sample';

import { Button, Box, Divider, Text, SimpleGrid, useToast } from '@chakra-ui/core';
import LabSelect from '../components/lab_select';
import { LABS } from '../constants/routes';

export default () => {
  const [condition, setCondition] = useState<'' | 'req'>('');
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const { user } = useUser();
  const { sample } = useSample();
  const { handleSubmit, errors, register } = useForm<LabFormData>();
  const toast = useToast();

  function onSubmit(values) {
    setCondition('req');
    firebase
      .firestore()
      .collection('samples')
      .doc(user.uid)
      .set({
        ...sample,
        uid: user.uid,
        firstChoice: values.firstChoice,
        secondChoice: values.secondChoice,
      })
      .then(() => {
        setCondition('');
        toast({
          title: '登録完了!',
          description: `志望研究室を登録しました。`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        dispatch(push(LABS));
      })
      .catch(() => {
        setCondition('');

        toast({
          title: '登録失敗',
          description: '何度も失敗する場合、m47ch4nに連絡してください。',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }

  return (
    <Box p={[2, 4]}>
      <Text fontSize="2xl" pb={2}>
        志望研究室フォーム
      </Text>
      <Text pb={2}>あなたの志望研究室を入力してください。</Text>
      <Divider mb={4} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={[1, 1, 2]}>
          <Box p={2} pb={4} key={1}>
            <LabSelect
              name="firstChoice"
              label={`第一志望`}
              errors={errors}
              register={register({ required: '選択してください。' })}
            />
          </Box>
          <Box p={2} pb={4} key={2}>
            <LabSelect
              name="secondChoice"
              label={`第二志望`}
              errors={errors}
              register={register({ required: '選択してください。' })}
            />
          </Box>
        </SimpleGrid>
        <Divider mb={4} />
        <SimpleGrid>
          <Button isLoading={condition === 'req'} mt={4} variantColor="teal" type="submit">
            登録
          </Button>
        </SimpleGrid>
      </form>
    </Box>
  );
};
