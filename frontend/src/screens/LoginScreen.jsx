import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(userInfo.role.includes('Admin') ? '/admin/dashboard' : '/dashboard');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Login Successful');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="form-container w-100">
        <h1 className="text-center mb-4">Welcome Back</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-3' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              className="form-control-modern"
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='my-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="form-control-modern"
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {/* --- THIS IS THE KEY CHANGE --- */}
          <Button type='submit' className='btn-modern w-100 mt-3 py-2' disabled={isLoading}>
            {isLoading ? (
              // Show a small spinner inside the button when loading
              <Loader size='25px' /> 
            ) : (
              // Otherwise, show the text
              'Sign In'
            )}
          </Button>
        </Form>
        <Row className='py-3 text-center'>
          <Col>
            New Member? <Link to='/register' className="text-decoration-none">Register Here</Link>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default LoginScreen;