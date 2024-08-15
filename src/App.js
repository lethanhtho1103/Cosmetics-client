import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment } from 'react';
function App() {
  const isLogIn = true; // thay isAdmin bằng user_id đã đăng nhập
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
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.isLogin && !isLogIn ? (
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
