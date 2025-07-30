import { Table, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';

const MemberListScreen = () => {
  const { data: members, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('Member deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Members</h1>
      {loadingDelete && <Loader />}
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>JOINED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td>{member._id}</td>
                <td>{member.name}</td>
                <td><a href={`mailto:${member.email}`}>{member.email}</a></td>
                <td>{member.createdAt.substring(0, 10)}</td>
                <td>
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(member._id)}>
                    <FaTrash style={{ color: 'white' }} />
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

export default MemberListScreen;