import { useAppSelector } from "@/redux/hooks";
import { AddUserModal } from "@/module/users/AddUserModal";
import UserCard from "@/module/users/UserCard"; // Make sure you have this component

export const User = () => {
  const users = useAppSelector((state) => state.user.users); // adjust according to your slice

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          👤 User Management
        </h1>
        <AddUserModal />
      </div>

      {/* User List */}
      <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-6 space-y-4">
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p className="text-gray-500 dark:text-gray-300 text-center">
            No users added yet.
          </p>
        )}
      </div>
    </div>
  );
};
