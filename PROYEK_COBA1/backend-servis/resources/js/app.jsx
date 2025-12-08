import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterTechnician from './pages/auth/RegisterTechnician'

// Main Pages
import Home from './pages/Home'
import TechnicianList from './pages/TechnicianList'
import TechnicianDetail from './pages/TechnicianDetail'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterTechnician from './pages/auth/RegisterTechnician'

// Main Pages
import Home from './pages/Home'
import TechnicianList from './pages/TechnicianList'
import TechnicianDetail from './pages/TechnicianDetail'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterTechnician from './pages/auth/RegisterTechnician'

// Main Pages
import Home from './pages/Home'
import TechnicianList from './pages/TechnicianList'
import TechnicianDetail from './pages/TechnicianDetail'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);







import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterTechnician from './pages/auth/RegisterTechnician'

// Main Pages
import Home from './pages/Home'
import TechnicianList from './pages/TechnicianList'
import TechnicianDetail from './pages/TechnicianDetail'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterTechnician from './pages/auth/RegisterTechnician'

// Main Pages
import Home from './pages/Home'
import TechnicianList from './pages/TechnicianList'
import TechnicianDetail from './pages/TechnicianDetail'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);







import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterTechnician from './pages/auth/RegisterTechnician'

// Main Pages
import Home from './pages/Home'
import TechnicianList from './pages/TechnicianList'
import TechnicianDetail from './pages/TechnicianDetail'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterTechnician from './pages/auth/RegisterTechnician'

// Main Pages
import Home from './pages/Home'
import TechnicianList from './pages/TechnicianList'
import TechnicianDetail from './pages/TechnicianDetail'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);







import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterTechnician from './pages/auth/RegisterTechnician'

// Main Pages
import Home from './pages/Home'
import TechnicianList from './pages/TechnicianList'
import TechnicianDetail from './pages/TechnicianDetail'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterTechnician from './pages/auth/RegisterTechnician'

// Main Pages
import Home from './pages/Home'
import TechnicianList from './pages/TechnicianList'
import TechnicianDetail from './pages/TechnicianDetail'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);







import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterTechnician from './pages/auth/RegisterTechnician'

// Main Pages
import Home from './pages/Home'
import TechnicianList from './pages/TechnicianList'
import TechnicianDetail from './pages/TechnicianDetail'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterTechnician from './pages/auth/RegisterTechnician'

// Main Pages
import Home from './pages/Home'
import TechnicianList from './pages/TechnicianList'
import TechnicianDetail from './pages/TechnicianDetail'
import OrderList from './pages/OrderList'
import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);







import OrderDetail from './pages/OrderDetail'
import CreateOrder from './pages/CreateOrder'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-technician" element={<RegisterTechnician />} />
            <Route path="/technicians" element={<TechnicianList />} />
            <Route path="/technicians/:id" element={<TechnicianDetail />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <ProtectedRoute requireRole="CUSTOMER">
                  <CreateOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App


import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

