import { Container, Row, Col, Button, Card, Badge, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { useGetBooksQuery } from '../slices/booksApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { FaUsers, FaRegCalendarAlt, FaRegThumbsUp } from 'react-icons/fa';
import BlurText from "../components/design/BlurText"; // <-- IMPORT THE NEW COMPONENT

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: books, isLoading, error } = useGetBooksQuery();

  return (
    <>
      {/* Hero Section */}
      <div className='hero-section'>
        <div className="hero-content">
            <BlurText
              text="A Universe of Stories Awaits You"
              className='display-4 fw-bold'
              animateBy="words"
              delay={50}
            />
            
            <p className='lead text-secondary mt-3'>
                Your digital gateway to a world of knowledge and adventure. Browse our extensive collection, borrow with ease, and manage everything online.
            </p>
            <hr className='my-4' style={{borderColor: 'var(--border-color)'}}/>
            {userInfo ? (
                <LinkContainer to={userInfo.role.includes('Admin') ? '/admin/dashboard' : '/dashboard'}>
                <Button variant='light' size='lg'>Go to Your Dashboard</Button>
                </LinkContainer>
            ) : (
                <>
                <LinkContainer to='/login'>
                    <Button variant='light' size='lg' className='me-2'>Member & Admin Login</Button>
                </LinkContainer>
                <LinkContainer to='/register'>
                    <Button variant='outline-light' size='lg'>Become a Member</Button>
                </LinkContainer>
                </>
            )}
        </div>
      </div>

      {/* Featured Books Section */}
      <Container className='mt-5'>
        <h2 className='mb-4 text-center'>Fresh Off the Press: Our Featured Books</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <Row>
            {books?.slice(0, 4).map((book) => (
              <Col key={book._id} sm={12} md={6} lg={3} className='mb-4'>
                <Card className='h-100 book-card-modern'>
                  <Card.Img src={book.image} variant='top' style={{ height: '300px', objectFit: 'cover' }} />
                  <Card.Body className='d-flex flex-column'>
                    <Card.Title as='div' className='mb-2 flex-grow-1'>
                      <strong className= 'text-primary'>{book.title}</strong>
                    </Card.Title>
                    <Card.Subtitle className='mb-3 text-secondary'>
                      by {book.author}  
                    </Card.Subtitle>
                    <div>
                        <Badge pill bg='secondary' className='me-2'>{book.genre || 'Classic'}</Badge>
                        <Badge pill bg={book.availableCopies > 0 ? 'success' : 'danger'}>
                        {book.availableCopies > 0 ? `${book.availableCopies} Available` : 'On Loan'}
                        </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <constainer>
        <Row>
          <h2 className="text-center">Fresh Off the Press: Our Featured Books</h2>
        </Row>
      </constainer>
      
      {/* Why Our Library Section */}
      <Container className='mt-5 py-5'>
        <h2 className='text-center mb-5'>Why Our Library?</h2>
        <Row className='text-center'>
            <Col md={4}>
                <FaRegThumbsUp size={50} className='mb-3' style={{color: 'var(--accent-secondary)'}} />
                <h3>Curated Collection</h3>
                <p className="text-secondary">Our librarians meticulously select a diverse range of books, from timeless classics to modern bestsellers.</p>
            </Col>
            <Col md={4}>
                <FaUsers size={50} className='mb-3' style={{color: 'var(--accent-secondary)'}} />
                <h3>Community Focused</h3>
                <p className="text-secondary">We host events, reading clubs, and workshops to foster a vibrant community of readers and learners.</p>
            </Col>
            <Col md={4}>
                <FaRegCalendarAlt size={50} className='mb-3' style={{color: 'var(--accent-secondary)'}} />
                <h3>Simple & Modern</h3>
                <p className="text-secondary">Our powerful online system makes it effortless to manage your loans, track due dates, and discover new titles.</p>
            </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className='text-center mt-5 py-4 border-top' style={{borderColor: 'var(--border-color)'}}>
        <Container>
            <p className='mb-0 text-secondary'>&copy; {new Date().getFullYear()} Library Management System. A Full-Stack Project.</p>
        </Container>
      </footer>
    </>
  );
};

export default HomeScreen;