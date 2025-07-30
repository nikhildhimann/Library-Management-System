import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) navigate('/');
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const res = await register({ name, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');
            toast.success('Registration successful!');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="form-container">
            <h1 className="text-center mb-4">Become a Member</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-3' controlId='name'>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control className="form-control-modern" type='text' placeholder='Enter your full name' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className='my-3' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control className="form-control-modern" type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className='my-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="form-control-modern" type='password' placeholder='Create a password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className='my-3' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control className="form-control-modern" type='password' placeholder='Confirm your password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                <Button type='submit' className='btn-modern w-100 mt-3 py-2' disabled={isLoading}>
                    {isLoading ? <Loader /> : 'Sign Up'}
                </Button>
            </Form>
            <Row className='py-3 text-center'>
                <Col>
                    Already a Member? <Link to='/login' className="text-decoration-none">Login Here</Link>
                </Col>
            </Row>
        </div>
    );
};

export default RegisterScreen;