import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Core Components
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import MemberDashboardScreen from './screens/MemberDashboardScreen';

// Import Admin Screens
import DashboardScreen from './screens/admin/DashboardScreen';
import BookListScreen from './screens/admin/BookListScreen';
import BookEditScreen from './screens/admin/BookEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import LoanListScreen from './screens/admin/LoanListScreen';

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />

            {/* Member Private Routes */}
            <Route path='' element={<PrivateRoute />}>
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/dashboard' element={<MemberDashboardScreen />} />
            </Route>

            {/* Admin Private Routes */}
            <Route path='' element={<AdminRoute />}>
              <Route path='/admin/dashboard' element={<DashboardScreen />} />
              <Route path='/admin/booklist' element={<BookListScreen />} />
              <Route path='/admin/book/:id/edit' element={<BookEditScreen />} />
              <Route path='/admin/userlist' element={<UserListScreen />} />
              <Route path='/admin/loanlist' element={<LoanListScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;