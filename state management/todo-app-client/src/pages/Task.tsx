import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddTaskModal } from "@/module/tasks/AddTaskModal";
import TaskCard from "@/module/tasks/TaskCard";
import { useGetTaskQuery } from "@/redux/api/baseApi";
import type { ITask } from "@/types";
//import TaskCard from "@/module/tasks/TaskCard";


export const Task = () => {
  const { data, isLoading } = useGetTaskQuery(undefined, {
    pollingInterval: 1000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-5 mt-20">
      <div className="flex justify-around items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          All Tasks
        </h1>
        {/* Filter */}
        <Tabs defaultValue="All">
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="low">Low</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="high">High</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Add Task */}
        <AddTaskModal />
      </div>
      {/* show task */}
      <div className="space-y-5 mt-5">
        {!isLoading &&
          data?.tasks?.map((task: ITask) => (
            <TaskCard key={task.id} task={task} />
          ))}
      </div>
    </div>
  );
};
