import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useGetBooksQuery, useCreateBookMutation, useDeleteBookMutation } from '../../slices/booksApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';

const BookListScreen = () => {
  const { data: books, isLoading, error, refetch } = useGetBooksQuery();
  const [createBook, { isLoading: loadingCreate }] = useCreateBookMutation();
  const [deleteBook, { isLoading: loadingDelete }] = useDeleteBookMutation();

  // --- State for the modals and form fields ---
  const [CreateModal, setCreateModal] = useState(false);
  const [EditModal, setEditModal] = useState(false);
  const [editBookId, setEditBookId] = useState(null); // Store the id of the book being edited
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [copies, setCopies] = useState(1);
  const [image, setImage]= useState('');

  // --- Handle opening and closing of modals ---
  const handleCreate = () => setCreateModal(true);
  const handleClose = () => {
    setCreateModal(false);
    setEditModal(false);
    setEditBookId(null); // Reset edit ID
    // Reset form fields when modal is closed
    setTitle('');
    setAuthor('');
    setIsbn('');
    setCopies(1);
    setImage('');
  };

  // --- Fetch book details for editing ---
  useEffect(() => {
    if (editBookId) {
      const bookToEdit = books.find((book) => book._id === editBookId);
      if (bookToEdit) {
        setTitle(bookToEdit.title);
        setAuthor(bookToEdit.author);
        setIsbn(bookToEdit.isbn);
        setCopies(bookToEdit.copies);
        setImage(bookToEdit.image);
      }
    }
  }, [editBookId, books]);

  // --- Handler to create a new book ---
  const createBookHandler = async (e) => {
    e.preventDefault();
    if (!title || !author || !isbn || copies < 1) {
      toast.error('Please fill all fields correctly.');
      return;
    }
    try {
      await createBook({ title, author, isbn, copies }).unwrap();
      refetch();
      toast.success('Book created successfully');
      handleClose(); // Close the modal on success
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const editBookHandler = async (e) => {
    e.preventDefault();
    if (!title || !author || !isbn || copies < 1) {
      toast.error('Please fill all fields correctly.');
      return;
    }
    try {
      await createBook({ title, author, isbn, copies }).unwrap();
      refetch();
      toast.success('Book created successfully');
      handleClose(); // Close the modal on success
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // --- Handler to start editing a book ---
  const EditBookHandler = (id) => {
    setEditBookId(id);
    setEditModal(true);
  };

  // --- Handler to delete a book ---
  const deleteBookHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        refetch();
        toast.success('Book deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center mb-3'>
        <Col><h1>Book Catalog</h1></Col>
        <Col className='text-end'>
          <Button className='btn-modern' onClick={handleCreate}>
            <FaPlus /> Create Book
          </Button>
        </Col>
      </Row>

      {/* --- Create Book Modal --- */}
      <Modal show={CreateModal} onHide={handleClose} centered>
        <div className="form-container">
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title>Add New Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={createBookHandler}>
              <Form.Group controlId='title' className='my-2'>
                <Form.Label>Title</Form.Label>
                <Form.Control className="form-control-modern" type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>
              <Form.Group controlId='author' className='my-2'>
                  <Form.Label>Author</Form.Label>
                <Form.Control className="form-control-modern" type='text' value={author} onChange={(e) => setAuthor(e.target.value)} />
              </Form.Group>
              <Form.Group controlId='isbn' className='my-2'>
                <Form.Label>ISBN</Form.Label>
                <Form.Control className="form-control-modern" type='text' value={isbn} onChange={(e) => setIsbn(e.target.value)} />
              </Form.Group>
              <Form.Group controlId='isbn' className='my-2'>
                <Form.Label>Image</Form.Label>
                <Form.Control className="form-control-modern" type='text' value={isbn} onChange={(e) => setImage(e.target.value)} />
              </Form.Group>
              <Form.Group controlId='copies' className='my-2'>
                <Form.Label>Copies</Form.Label>
                <Form.Control className="form-control-modern" type='number' value={copies} onChange={(e) => setCopies(e.target.value)} />
              </Form.Group>
              <Button type='submit' className='btn-modern w-100 mt-3' disabled={loadingCreate}>
                {loadingCreate ? 'Creating...' : 'Add Book'}
              </Button>
            </Form>
          </Modal.Body>
        </div>
      </Modal>

      {/* --- Edit Book Modal --- */}
      <Modal show={EditModal} onHide={handleClose} centered>
        <div className="form-container">
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title>Edit Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={editBookHandler}> {/* Reuse the createBookHandler for editing logic */}
              <Form.Group controlId='title' className='my-2'>
                <Form.Label>Title</Form.Label>
                <Form.Control className="form-control-modern" type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>
              <Form.Group controlId='author' className='my-2'>
                <Form.Label>Author</Form.Label>
                <Form.Control className="form-control-modern" type='text' value={author} onChange={(e) => setAuthor(e.target.value)} />
              </Form.Group>
              <Form.Group controlId='isbn' className='my-2'>
                <Form.Label>ISBN</Form.Label>
                <Form.Control className="form-control-modern" type='text' value={isbn} onChange={(e) => setIsbn(e.target.value)} />
              </Form.Group>
              <Form.Group controlId='copies' className='my-2'>
                <Form.Label>Copies</Form.Label>
                <Form.Control className="form-control-modern" type='number' value={copies} onChange={(e) => setCopies(e.target.value)} />
              </Form.Group>
              <Button type='submit' className='btn-modern w-100 mt-3' disabled={loadingCreate}>
                {loadingCreate ? 'Updating...' : 'Update Book'}
              </Button>
            </Form>
          </Modal.Body>
        </div>
      </Modal>

      {loadingDelete && <Loader />}
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
        <div className="p-4 rounded-3 card-modern">
          <Table hover responsive className='table-modern'>
            <thead><tr><th>ID</th><th>TITLE</th><th>AUTHOR</th><th>AVAILABLE</th><th></th></tr></thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book._id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.availableCopies} / {book.copies}</td>
                  <td>
                    {/* <LinkContainer to={`/admin/book/${book._id}/edit`}> */}

                    <Button variant='warning' className='btn-sm' onClick={() => EditBookHandler(book._id)}><FaEdit /></Button>
                    {/* </LinkContainer> */}
                    <Button variant='danger' className='btn-sm' onClick={() => deleteBookHandler(book._id)}><FaTrash /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default BookListScreen;