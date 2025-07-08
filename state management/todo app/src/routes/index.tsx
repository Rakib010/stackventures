import App from "@/App";
import { Task } from "@/pages/Task";
import { User } from "@/pages/User";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      /* {
        index: true,
        Component: Task,
      }, */
      {
        path: "task",
        Component: Task,
      },
      {
        path: "user",
        Component: User,
      },
    ],
  },
]);

export default router;
