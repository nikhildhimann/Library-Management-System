import { useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Badge } from 'react-bootstrap';
import { useGetLoansQuery, useIssueBookMutation, useReturnBookMutation, useDeleteLoanMutation } from '../../slices/loansApiSlice';
import { useGetBooksQuery } from '../../slices/booksApiSlice';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash } from 'react-icons/fa';

const LoanListScreen = () => {
  const { data: loans, isLoading, error, refetch } = useGetLoansQuery();
  const { data: books } = useGetBooksQuery();
  const { data: users } = useGetUsersQuery();
  const [issueBook, { isLoading: loadingIssue }] = useIssueBookMutation();
  const [returnBook, { isLoading: loadingReturn }] = useReturnBookMutation();
  const [deleteLoan, { isLoading: loadingDelete }] = useDeleteLoanMutation(); // Hook for deleting loans

  // State for the "Issue Book" modal
  const [showModal, setShowModal] = useState(false);
  const [bookId, setBookId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setBookId('');
    setMemberId('');
    setDueDate('');
  };

  const issueHandler = async (e) => {
    e.preventDefault();
    if (!bookId || !memberId || !dueDate) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      await issueBook({ bookId, memberId, dueDate }).unwrap();
      toast.success('Book issued successfully');
      refetch();
      handleClose();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  
  const returnHandler = async (loanId) => {
    if (window.confirm('Are you sure you want to mark this book as returned?')) {
      try {
        await returnBook(loanId).unwrap();
        toast.success('Book returned successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // Handler for the new delete functionality
  const deleteHandler = async (loanId) => {
    if (window.confirm('Are you sure you want to permanently delete this loan record?')) {
      try {
        await deleteLoan(loanId).unwrap();
        toast.success('Loan record deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center mb-3'>
        <Col><h1>Loan Management</h1></Col>
        <Col className='text-end'>
          <Button variant="primary" onClick={handleShow}><FaPlus /> Issue Book</Button>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Issue New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={issueHandler}>
            <Form.Group controlId='bookId' className='my-2'>
              <Form.Label>Book</Form.Label>
              <Form.Select value={bookId} onChange={(e) => setBookId(e.target.value)}>
                <option value=''>-- Select a Book --</option>
                {books?.filter(b => b.availableCopies > 0).map(book => (<option key={book._id} value={book._id}>{book.title}</option>))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId='memberId' className='my-2'>
              <Form.Label>Member</Form.Label>
              <Form.Select value={memberId} onChange={(e) => setMemberId(e.target.value)}>
                <option value=''>-- Select a Member --</option>
                {users?.filter(u => u.role === 'Member').map(member => (<option key={member._id} value={member._id}>{member.name}</option>))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId='dueDate' className='my-2'>
              <Form.Label>Due Date</Form.Label>
              <Form.Control type='date' value={dueDate} onChange={(e) => setDueDate(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3 w-100' disabled={loadingIssue}>
              {loadingIssue ? 'Issuing...' : 'Issue Book'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {loadingReturn || loadingDelete && <Loader />}
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>BOOK</th>
              <th>MEMBER</th>
              <th>DUE DATE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>{loan.book?.title}</td>
                <td>{loan.member?.name}</td>
                <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                <td>
                  <Badge pill bg={loan.status === 'Active' ? 'success' : loan.status === 'Overdue' ? 'danger' : 'secondary'}>
                    {loan.status}
                  </Badge>
                </td>
                <td>
                  {loan.status === 'Active' && (
                    <Button variant='primary' className='btn-sm me-2' onClick={() => returnHandler(loan._id)}>
                      Return
                    </Button>
                  )}
                  {/* The new Delete Button */}
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(loan._id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default LoanListScreen;