import React from 'react';
import useUser from '../hooks/use_user';

export default () => {
  const { user, load } = useUser();
  return (
    <div>
      <p>ユーザーロード: {load ? '中' : '済'}</p>
      <p>{user ? `こんにちは${user.displayName}さん` : 'サインインしてないよ'}</p>
    </div>
  );
};
