import { useEffect, useState } from "react";
import ListCard from "../components/ListCard";
import UserForm from "../components/UserForm";
import { deleteUser, getUserById, getUsers } from "../user.service";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  async function loadUsers() {
    try {
      const response = await getUsers();
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }
 
  async function handleDelete(id) {
    if (!id) return;

    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  }
  async function handleEdit(id) {
    try {
      const response = await getUserById(id);
      setSelectedUser(response.data.data);
    } catch (error) {
      console.error(error);
    }
}

  
  useEffect(() => {
    void (async () => {
      await loadUsers();
    })();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 font-mono">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-gray-100 p-6 text-slate-900 shadow-md">
        <h1 className="mb-5 text-center text-xl font-bold underline text-slate-900">
          Users List
        </h1>

        <UserForm
          key={selectedUser?._id ?? "new"}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          onSaved={loadUsers}
        />

        {users.length > 0 ? (
          users.map((user) => (
            <ListCard
              key={user._id}
              data={user}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p className="text-center text-slate-600">No users found.</p>
        )}
      </div>
    </div>
  );
}