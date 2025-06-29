import { useAppDispatch } from "@/redux/hooks";
import { removeUser } from "@/redux/features/user/userSlice";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react"; // or your icon library
import type { IUser } from "@/types";

interface UserCardProps {
  user: IUser;
}

export default function UserCard({ user }: UserCardProps) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(removeUser(user.id));
  };

  return (
    <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        {user.name}
      </h2>

      <Button
        onClick={handleDelete}
        variant="link"
        className="p-0 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  );
}
