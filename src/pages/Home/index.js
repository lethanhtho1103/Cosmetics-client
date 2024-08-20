import * as React from 'react';
import { useSelector } from 'react-redux';
import UserLayout from '~/layouts/UserLayout';

function Home() {
  const user = useSelector((state) => state.auth.login?.currentUser?.data);

  return (
    <UserLayout>
      <h1>Home page {user?.username}</h1>
    </UserLayout>
  );
}
export default Home;
