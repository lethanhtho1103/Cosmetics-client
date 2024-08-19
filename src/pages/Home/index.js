import * as React from 'react';
import { useSelector } from 'react-redux';
import UserLayout from '~/layouts/UserLayout';
import Toast from '../Toast';

function Home() {
  const user = useSelector((state) => state.auth.login?.currentUser);

  return (
    <UserLayout>
      {user && <Toast severity={'success'} message={'Đăng nhập thành công.'} />}
      <h1>Home page {user.username}</h1>
    </UserLayout>
  );
}
export default Home;
