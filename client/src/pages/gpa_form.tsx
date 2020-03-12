import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { useForm } from 'react-hook-form';
import { GpaFormData } from '../types';
import useFirebase from '../hooks/use_firebase';
import useUser from '../hooks/use_user';
import useSample from '../hooks/use_sample';

import {
  Button,
  Box,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  List,
  ListItem,
  SimpleGrid,
  useToast,
} from '@chakra-ui/core';
import GradeSelect from '../components/grade_select';
import { subjects, points } from '../constants';
import { LABS } from '../constants/routes';

export default () => {
  const toast = useToast();
  const [result, setResult] = useState<number>(undefined);
  const [condition, setCondition] = useState<'' | 'req'>('');
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const { user } = useUser();
  const { sample } = useSample();

  const { handleSubmit, errors, register, watch } = useForm<GpaFormData>({
    defaultValues: subjects
      .filter(({ name }) => name !== '-' && name !== 'dummy')
      .reduce((acc, { name }) => {
        acc[name] = '';
        return acc;
      }, {}),
  });
  const formValues = watch();

  useEffect(() => {
    if (Object.keys(formValues).filter(field => formValues[field] === '').length === 0) {
      const temp = subjects
        .filter(({ name }) => name !== '-' && name !== 'dummy')
        .reduce(
          (acc, { name, credit }) => {
            acc.sum += points[formValues[name]] * credit;
            acc.credits += credit;
            return acc;
          },
          { sum: 0, credits: 0 },
        );

      setResult(temp.sum / temp.credits);
    } else {
      setResult(undefined);
    }
  }, [formValues]);

  function onSubmit() {
    setCondition('req');
    firebase
      .firestore()
      .collection('samples')
      .doc(user.uid)
      .set({
        ...sample,
        uid: user.uid,
        result,
      })
      .then(() => {
        setCondition('');
        toast({
          title: '登録完了!',
          description: `あなたの成績は ${result} 点です。`,
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
        成績算出フォーム
      </Text>
      <Text pb={2}>
        あなたの科目評価を入力することで研究室配属で考慮される成績(の目安)を算出することができます。研究室配属で考慮される成績は、以下の科目の成績(素点)の単位重み付き平均点です。
      </Text>
      <List as="ol" styleType="decimal" pb={2}>
        <ListItem>3年次開講英語高得点上位Ⅱ科目(GAC留学生は日本語科目)</ListItem>
        <ListItem>ソフトウェア演習Ⅳを除く3年次必修9科目</ListItem>
        <ListItem>3年次コース選択科目の高得点上位1科目</ListItem>
        <ListItem>選択科目の高得点上位2科目</ListItem>
      </List>
      <Text pb={2}>
        ただし、教務システムでは科目評価(S,A,B,C,D)しか確認できないため、このシステムではS→95点, A→85点, B→75点, C→65点,
        D→50点として計算します。
      </Text>
      <Divider mb={4} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={[1, 1, 2]}>
          {subjects.map(({ name, label, credit }, index) => {
            if (name === '-') {
              return [
                <Divider key={`${index}_1`} mb={4} />,
                <Divider display={['none', 'none', 'block']} key={`${index}_2`} mb={4} />,
              ];
            }

            if (name === 'dummy') {
              return <Box key={index} pb={4} />;
            }

            return (
              <Box p={2} pb={4} key={index}>
                <GradeSelect
                  name={name}
                  label={`${label} (${credit}単位)`}
                  errors={errors}
                  register={register({ required: '選択してください。' })}
                />
              </Box>
            );
          })}
        </SimpleGrid>
        <Divider mb={4} />
        <SimpleGrid columns={2}>
          <Stat>
            <StatLabel>あなたの成績</StatLabel>
            <StatNumber>{result ? result : 'N/A'}</StatNumber>
          </Stat>
          <Button isLoading={condition === 'req'} mt={4} variantColor="teal" type="submit">
            登録
          </Button>
        </SimpleGrid>
      </form>
    </Box>
  );
};
