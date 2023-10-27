import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import useAuth from "../../hooks/useAuth";

export default function Account() {

 const {roles} = useAuth()

  return (
    <>
      <h3>Account</h3>

      <hr/>
      roles: {JSON.stringify(roles)}
      <hr/>

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
not working <br/>
      <Button variant="primary">Change Password</Button>
    </>
  );
}
