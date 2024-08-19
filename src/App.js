import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
function App() {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let LayOut = Fragment;
            if (route.layout) {
              LayOut = route.layout;
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
                    <LayOut>
                      <Page />
                    </LayOut>
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
