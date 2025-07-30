import { Card, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    // We reuse the form-container class for a consistent look
    <div className="form-container"> 
      <h1 className="text-center mb-4">User Profile</h1>
      
      {/* The main content area for the profile details */}
      <div className="p-4 rounded-3 card-modern">
        <Row className="mb-3">
          <Col sm={3}>
            <strong className="text-white">Name:</strong>
          </Col>
          <Col sm={9}>
            <p className="text-secondary mb-0">{userInfo.name}</p>
          </Col>
        </Row>
        <hr style={{ borderColor: 'var(--border-color)' }} />
        <Row className="mb-3">
          <Col sm={3}>
            <strong className="text-white">Email:</strong>
          </Col>
          <Col sm={9}>
            <p className="text-secondary mb-0">{userInfo.email}</p>
          </Col>
        </Row>
        <hr style={{ borderColor: 'var(--border-color)' }} />
        <Row>
          <Col sm={3}>
            <strong className="text-white">Role:</strong>
          </Col>
          <Col sm={9}>
            <p className="text-secondary mb-0">{userInfo.role}</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProfileScreen;