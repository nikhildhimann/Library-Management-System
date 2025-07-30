import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetBookDetailsQuery, useUpdateBookMutation } from '../../slices/booksApiSlice';

const BookEditScreen = () => {
  const { id: bookId } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [image, setImage] = useState('');
  const [copies, setCopies] = useState(0);

  const { data: book, isLoading, refetch, error } = useGetBookDetailsQuery(bookId);
  const [updateBook, { isLoading: loadingUpdate }] = useUpdateBookMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setIsbn(book.isbn);
      setImage(book.image);
      setCopies(book.copies);
    }
  }, [book]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateBook({ bookId, title, author, isbn, image, copies }).unwrap();
      toast.success('Book updated successfully');
      refetch();
      navigate('/admin/booklist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/booklist' className='btn btn-outline-light my-3'>
        Go Back
      </Link>
      <div className="form-container">
        <h1>Edit Book</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title' className='my-3'><Form.Label>Title</Form.Label><Form.Control className="form-control-modern" type='text' value={title} onChange={(e) => setTitle(e.target.value)}></Form.Control></Form.Group>
            <Form.Group controlId='author' className='my-3'><Form.Label>Author</Form.Label><Form.Control className="form-control-modern" type='text' value={author} onChange={(e) => setAuthor(e.target.value)}></Form.Control></Form.Group>
            <Form.Group controlId='isbn' className='my-3'><Form.Label>ISBN</Form.Label><Form.Control className="form-control-modern" type='text' value={isbn} onChange={(e) => setIsbn(e.target.value)}></Form.Control></Form.Group>
            <Form.Group controlId='image' className='my-3'><Form.Label>Image URL</Form.Label><Form.Control className="form-control-modern" type='text' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control></Form.Group>
            <Form.Group controlId='copies' className='my-3'><Form.Label>Copies</Form.Label><Form.Control className="form-control-modern" type='number' value={copies} onChange={(e) => setCopies(e.target.value)}></Form.Control></Form.Group>
            <Button type='submit' className='btn-modern w-100 my-2 py-2'>Update</Button>
          </Form>
        )}
      </div>
    </>
  );
};

export default BookEditScreen;