import './AdminPanel.scss';

interface Props {
  isAdmin: boolean;
}

export default function AdminPanel({ isAdmin }: Props) {
  return (
    <div className="admin">
      {
        isAdmin ? (
          <h1>Admin Panel</h1>
        ) : (
          <h2>Sorry, you do not have the permissions to view this page.</h2>
        )
      }
    </div>
  );
}