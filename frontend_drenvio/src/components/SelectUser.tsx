import { Result } from "../types/product"
import { User } from "../types/user"

interface SelectUserProps {
usersFilter: Result<User>,
usersLoading: boolean,
usersError: string | null
userLogin: string,
setUserLogin: (value: string) => void
}
const SelectUser: React.FC<SelectUserProps> = ({ usersFilter, usersError, usersLoading, userLogin, setUserLogin}) => {




if (usersLoading) {
    return <p>Cargando...</p>
  }

  if (usersError) {
    return <p>Error al cargar los</p>
  }

  return (
    <div>
    <label className="block mb-2">Seleccionar Usuario</label>
    <select 
    value={userLogin}
    onChange={(e) => setUserLogin(e.target.value)}
    className="border p-2 w-full mb-4 rounded">
      <option value="">Seleccione un usuario</option>
      {
        usersFilter.map((user) => (
          <option key={user._id} value={user._id}>{user.nombre}</option>
        ))
      }
    </select>
  </div>
  )
}

export default SelectUser