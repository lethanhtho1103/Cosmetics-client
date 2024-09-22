import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, adminRoutes } from './routes';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const isAdmin = useSelector((state) => state.auth.login?.currentAdmin?.admin);

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

          {/* Admin Routes */}
          {adminRoutes.map((route, index) => {
            let Layout = Fragment;
            if (route.layout) {
              Layout = route.layout;
            }
            const Page = route.component;

            // Redirect logged-in admin away from admin login page
            if (isAdmin && route.path === '/admin/login') {
              return <Route key={index} path={route.path} element={<Navigate to="/admin/dashboard" replace />} />;
            }

            // Only allow access to admin routes if the user is an admin and logged in
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.isAdmin && !isAdmin ? (
                    <Navigate to="/admin/login" replace />
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
