import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = Fragment;
            if (route.layout) {
              Layout = route.layout;
            }
            const Page = route.component;

            if (currentUser && (route.path === '/login' || route.path === '/register')) {
              return <Route key={index} path={route.path} element={<Navigate to="/" replace />} />;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.isLogin && !currentUser ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              >
                {route.children?.map((child, childIndex) => (
                  <Route key={childIndex} path={child.path} element={<child.component />} />
                ))}
              </Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
