import { Result } from "../types/product";
import { User } from "../types/user";
import { Form, Spinner, Alert } from "react-bootstrap";

interface SelectUserProps {
  usersFilter: Result<User>;
  usersLoading: boolean;
  usersError: string | null;
  userLogin: string;
  setUserLogin: (value: string) => void;
}

const SelectUser: React.FC<SelectUserProps> = ({ usersFilter, usersError, usersLoading, userLogin, setUserLogin }) => {
  if (usersLoading) {
    return <Spinner animation="border" role="status" />;
  }

  if (usersError) {
    return <Alert variant="danger">Error al cargar los usuarios</Alert>;
  }

  return (
    <div className="container">
    <Form.Group controlId="selectUser">
      <Form.Label className="fw-bold">Seleccionar Usuario</Form.Label>
      <Form.Select
        value={userLogin}
        onChange={(e) => setUserLogin(e.target.value)}
        className="mb-3"
      >
        <option value="">Seleccione un usuario</option>
        {usersFilter.map((user) => (
          <option key={user._id} value={user._id}>
            {user.nombre}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
    </div>
  );
};

export default SelectUser;
