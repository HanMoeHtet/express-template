import MainLayout from '../layouts/main';

const UserListMail = (
  /** @type {{ users: { name: string}[]; }} */ { users }
) => {
  return (
    <MainLayout title="User List">
      <h2>Users:</h2>
      <ol>
        {users.map((user, index) => (
          <li style={{ color: 'green' }} key={index}>
            {user.name}
          </li>
        ))}
      </ol>
    </MainLayout>
  );
};

export default UserListMail;
