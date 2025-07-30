import { Spinner } from 'react-bootstrap';

const Loader = ({ size = '100px' }) => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: size,
        height: size,
        margin: 'auto',
        display: 'block',
      }}
    ></Spinner>
  );
};

export default Loader;