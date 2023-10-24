import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function Account() {
  return (
    <>
      <h3>Account</h3>

      <FloatingLabel
        controlId="floatingInput"
        label="Old Password"
        className="mb-1"
      >
        <Form.Control type="text" placeholder="" />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="New Password"
        className="mb-1"
      >
        <Form.Control type="text" placeholder="" />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Repin New Password"
        className="mb-1"
      >
        <Form.Control type="text" placeholder="" />
      </FloatingLabel>

      <Button variant="primary">Change Password</Button>
    </>
  );
}
