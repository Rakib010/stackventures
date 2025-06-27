import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { ITask } from "@/types";
import { Trash2 } from "lucide-react";

interface IProps {
  task: ITask;
}

const TaskCard = ({ task }: IProps) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm w-full max-w-md space-y-4 transition-colors">
      {/* Header with title and actions */}
      <div className="flex justify-between items-center">
        {/* Left: Status + Title */}
        <div className="flex gap-2 items-center">
          <div
            className={cn("w-3 h-3 rounded-full", {
              "bg-green-500": task.priority === "Low",
              "bg-yellow-500": task.priority === "Medium",
              "bg-red-500": task.priority === "High",
            })}
          />
          <h1 className="text-lg font-medium text-gray-800 dark:text-white">
            {task?.title}
          </h1>
        </div>

        {/* Right: Delete + Checkbox */}
        <div className="flex gap-3 items-center">
          <Button
            variant="link"
            className="p-0 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Checkbox />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {task?.description}
      </p>
    </div>
  );
};

export default TaskCard;
