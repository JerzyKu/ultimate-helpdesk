import Table from "react-bootstrap/Table";
import UsersRow from "./UsersRow";
import { useGetUsersQuery } from "./usersApiSlice";

export default function Userslist() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 10000, // 10s <- change to prod
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
    content = <div>Loading...</div>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <UsersRow key={userId} userId={userId} />)
      : null;

    content = (
      <>
        <h2>Users</h2><hr/> {/*ul*/}
        <Table hover striped>
          <thead>
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td>
                <b>Roles</b>
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
