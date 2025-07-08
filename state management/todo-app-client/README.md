

## 🔁 Fetch all tasks from the API using RTK Query
- pollingInterval: re-fetch data every 1000ms (1 second) to keep UI in sync
- refetchOnFocus: re-fetch tasks when the browser tab regains focus
- refetchOnMountOrArgChange: re-fetch when the component mounts or `arg` changes
- refetchOnReconnect: re-fetch when internet reconnects (after being offline)

| Feature               | Purpose                                                              |
| --------------------- | -------------------------------------------------------------------- |
| `createApi`           | Sets up RTK Query for managing API calls                             |
| `baseQuery`           | Configures the base URL used for all requests                        |
| `getTask` query       | Fetches all tasks from `/tasks`, caches it with the `task` tag       |
| `createTask` mutation | Sends a POST request to create a task and invalidates the task cache |
| `providesTags`        | Tells RTK Query what data the query is caching                       |
| `invalidatesTags`     | Tells RTK Query which tags to refresh when mutation is successful    |
