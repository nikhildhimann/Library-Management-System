import { Table, Card, Alert } from 'react-bootstrap';
import { useGetMyLoansQuery } from '../slices/loansApiSlice';
import { useGetBooksQuery } from '../slices/booksApiSlice'; // <-- 1. Import hook to get books
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';

const MemberDashboardScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: loans, isLoading: loadingLoans, error: errorLoans } = useGetMyLoansQuery();
  const { data: books, isLoading: loadingBooks, error: errorBooks } = useGetBooksQuery(); // <-- 2. Fetch all books

  // Function to calculate days remaining or overdue
  const calculateStatus = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { overdue: true, days: Math.abs(diffDays), fine: Math.abs(diffDays) * 10 };
    }
    return { overdue: false, days: diffDays, fine: 0 };
  };

  const activeLoans = loans?.filter(loan => loan.status === 'Active');
  // 3. Filter for available books
  const availableBooks = books?.filter(book => book.availableCopies > 0);

  return (
    <>
      <h1 className="mb-4">Welcome, {userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)}</h1>
      
      {/* Active Loans Card */}
      <Card className='card-modern mb-5'>
        <Card.Header as="h5">Your Active Loans</Card.Header>
        <Card.Body>
          {loadingLoans ? <Loader /> : errorLoans ? (
            <Message variant='danger'>{errorLoans?.data?.message || errorLoans.error}</Message>
          ) : activeLoans && activeLoans.length > 0 ? (
            <Table hover responsive className='table-modern'>
              <thead>
                <tr>
                  <th>BOOK TITLE</th>
                  <th>AUTHOR</th>
                  <th>DUE DATE</th>
                  <th>STATUS</th>
                  <th>FINE</th>
                </tr>
              </thead>
              <tbody>
                {activeLoans.map((loan) => {
                  const status = calculateStatus(loan.dueDate);
                  return (
                    <tr key={loan._id}>
                      <td>{loan.book.title}</td>
                      <td>{loan.book.author}</td>
                      <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                      <td>
                        {status.overdue ? (
                          <span className='text-danger fw-bold'>Overdue by {status.days} day(s)</span>
                        ) : (
                          <span className='text-success'>{status.days} day(s) remaining</span>
                        )}
                      </td>
                      <td>
                        <strong className={status.fine > 0 ? 'text-danger' : ''}>${status.fine.toFixed(2)}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <Alert variant='dark' className="border-0">You have no active loans. Time to borrow a new book!</Alert>
          )}
        </Card.Body>
      </Card>

      {/* --- NEW AVAILABLE BOOKS SECTION --- */}
      <Card className='card-modern'>
        <Card.Header as="h5">Available Books in the Library</Card.Header>
        <Card.Body>
          {loadingBooks ? <Loader /> : errorBooks ? (
            <Message variant='danger'>{errorBooks?.data?.message || errorBooks.error}</Message>
          ) : (
            <Table hover responsive className='table-modern'>
                <thead>
                    <tr>
                        <th>BOOK TITLE</th>
                        <th>AUTHOR</th>
                        <th>GENRE</th>
                        <th>COPIES AVAILABLE</th>
                    </tr>
                </thead>
                <tbody>
                    {availableBooks.map((book) => (
                        <tr key={book._id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre || 'N/A'}</td>
                            <td>{book.availableCopies}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default MemberDashboardScreen;