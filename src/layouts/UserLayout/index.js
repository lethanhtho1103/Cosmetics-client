import './UserLayout.scss';
import Header from '~/layouts/components/Header';

function UserLayout({ children }) {
  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default UserLayout;
