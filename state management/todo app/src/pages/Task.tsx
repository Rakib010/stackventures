import { AddTaskModal } from "@/module/tasks/AddTaskModal";
import TaskCard from "@/module/tasks/TaskCard";
import { selectTasks } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/hooks";

export const Task = () => {
  const tasks = useAppSelector(selectTasks);

  return (
    <div className="mx-auto max-w-7xl px-5 mt-20">
      <div className="flex justify-around items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          All Tasks
        </h1>
        <AddTaskModal />
      </div>
      <div className="space-y-5 mt-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
