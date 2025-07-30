import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useGetBooksQuery } from '../../slices/booksApiSlice';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { useGetLoansQuery } from '../../slices/loansApiSlice';

const DashboardScreen = () => {
  const { data: books, isLoading: loadingBooks, error: errorBooks } = useGetBooksQuery();
  const { data: users, isLoading: loadingUsers, error: errorUsers } = useGetUsersQuery();
  const { data: loans, isLoading: loadingLoans, error: errorLoans } = useGetLoansQuery();

  const getError = () => {
    if (errorBooks) return errorBooks?.data?.message || errorBooks.error;
    if (errorUsers) return errorUsers?.data?.message || errorUsers.error;
    if (errorLoans) return errorLoans?.data?.message || errorLoans.error;
    return null;
  };

  return (
    <>
      <h1 className="mb-4">Admin Dashboard</h1>
      {loadingBooks || loadingUsers || loadingLoans ? <Loader /> : getError() ? (
        <Message variant='danger'>{getError()}</Message>
      ) : (
        <Row>
          <Col md={4}>
            <Card className='card-modern mb-3'>
              <Card.Body>
                <Card.Title>Total Books</Card.Title>
                <Card.Text className='display-4 fw-bold'>{books.length}</Card.Text>
                <Link to='/admin/booklist' className="text-decoration-none">Manage Books →</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='card-modern mb-3'>
              <Card.Body>
                <Card.Title>Total Users</Card.Title>
                <Card.Text className='display-4 fw-bold'>{users.length}</Card.Text>
                <Link to='/admin/userlist' className="text-decoration-none">Manage Users →</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='card-modern mb-3'>
              <Card.Body>
                <Card.Title>Active Loans</Card.Title>
                <Card.Text className='display-4 fw-bold'>{loans.filter(l => l.status === 'Active').length}</Card.Text>
                <Link to='/admin/loanlist' className="text-decoration-none">Manage Loans →</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default DashboardScreen;