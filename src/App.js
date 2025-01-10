// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';  // Import AuthProvider
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Login from './pages/login';
import Register from './pages/register';
import GameSection from './pages/gamesection';
import MenuSection from './pages/menusection';
import DashboardLayout from './components/DashboardLayout/dashboardlayout';
import About from './pages/about';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
         <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
               <DashboardLayout>
                  <PrivateRoute>
                <GameSection />
              </PrivateRoute>
               </DashboardLayout>
            }
          />
          <Route
            path="/menu"
            element={
               <DashboardLayout>
                  <PrivateRoute>
                <MenuSection />
              </PrivateRoute>
               </DashboardLayout>
            }
          />
          <Route
            path="/about"
            element={
               <DashboardLayout>
               <PrivateRoute>
             <About />
           </PrivateRoute>
            </DashboardLayout>
            }
          /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
