import Table from "react-bootstrap/Table";
import UsersRow from "./UsersRow";
import { useGetUsersQuery } from "./usersApiSlice";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

export default function Userslist() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 360000, // 360s <- change to prod
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content = <>nothing</>;

  if (isError) {
    content = (
      <p className="errmsg">
        error: {error?.data?.message || JSON.stringify(error)}
      </p>
    );
  }

  if (isLoading) {
    content = <Spinner />;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <UsersRow key={userId} userId={userId} />)
      : null;

    content = (
      <>
        <h2>Users</h2>
        <Button as={Link} to={"/users/new"}>
          + Add new User
        </Button>
        <hr />
        <Table hover striped>
          <thead>
            <tr>
              <td>
                <b>Name:</b>
              </td>
              <td>
                <b>User Name:</b>
              </td>
              <td>
                <b>Job Title:</b>
              </td>
              <td>
                <b>Active:</b>
              </td>
              {/* <td>
                <b>Roles:</b>
              </td> */}
              <td>
                <b>Actions:</b>
              </td>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </Table>
      </>
    );
  }

  return content;
}
