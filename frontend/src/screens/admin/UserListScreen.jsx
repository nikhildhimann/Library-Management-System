import { useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Badge } from 'react-bootstrap';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { useGetUsersQuery, useDeleteUserMutation, useCreateUserMutation } from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  const [createUser, { isLoading: loadingCreate }] = useCreateUserMutation();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Member');

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setName(''); setEmail(''); setPassword(''); setRole('Member');
  };

  const createHandler = async (e) => {
    e.preventDefault();
    try {
      await createUser({ name, email, password, role }).unwrap();
      toast.success('User created successfully');
      refetch();
      handleClose();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('User deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center mb-3'>
        <Col><h1>User Management</h1></Col>
        <Col className='text-end'>
          <Button className='btn-modern' onClick={handleShow}><FaPlus /> Create User</Button>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose} centered>
        <div className="form-container">
            <Modal.Header closeButton closeVariant="white"><Modal.Title>Create New User</Modal.Title></Modal.Header>
            <Modal.Body>
            <Form onSubmit={createHandler}>
                <Form.Group controlId='name' className='my-2'><Form.Label>Name</Form.Label><Form.Control className="form-control-modern" type='text' value={name} onChange={(e) => setName(e.target.value)}></Form.Control></Form.Group>
                <Form.Group controlId='email' className='my-2'><Form.Label>Email</Form.Label><Form.Control className="form-control-modern" type='email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control></Form.Group>
                <Form.Group controlId='password' className='my-2'><Form.Label>Password</Form.Label><Form.Control className="form-control-modern" type='password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control></Form.Group>
                <Form.Group controlId='role' className='my-2'><Form.Label>Role</Form.Label><Form.Select className="form-control-modern" value={role} onChange={(e) => setRole(e.target.value)}><option value='Member'>Member</option><option value='Admin'>Admin</option></Form.Select></Form.Group>
                <Button type='submit' className='btn-modern w-100 mt-3' disabled={loadingCreate}>{loadingCreate ? 'Creating...' : 'Create User'}</Button>
            </Form>
            </Modal.Body>
        </div>
      </Modal>

      {loadingDelete && <Loader />}
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
        <div className="p-4 rounded-3 card-modern">
            <Table hover responsive className='table-modern'>
            <thead><tr><th>ID</th><th>NAME</th><th>EMAIL</th><th>ROLE</th><th></th></tr></thead>
            <tbody>
                {users.map((user) => (
                <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                    <td><Badge bg={user.role === 'SuperAdmin' ? 'danger' : user.role === 'Admin' ? 'warning' : 'info'}>{user.role}</Badge></td>
                    <td>{user.role !== 'SuperAdmin' && (<Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}><FaTrash style={{ color: 'white' }} /></Button>)}</td>
                </tr>
                ))}
            </tbody>
            </Table>
        </div>
      )}
    </>
  );
};

export default UserListScreen;