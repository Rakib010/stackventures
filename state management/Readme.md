### ✅ Beginner-Level: Core Understanding

#### 1. What is Redux and why is it used?

Redux is a **state management library** for JavaScript applications, especially useful with React. It provides a centralized store to manage the **global state** of an application.

**Why use Redux?**

- To manage complex state logic in a single place.
- To avoid prop drilling (passing props through many components).
- Makes state predictable and debuggable (using Redux DevTools).

---

#### 2. What are the three core principles of Redux?

1. **Single Source of Truth**: The entire app state is stored in a single object called the store.
2. **State is Read-Only**: You cannot modify state directly; you must dispatch actions.
3. **Changes are Made with Pure Functions**: Reducers are pure functions that take the current state and action, then return a new state.

---

#### 3. What are the main components of Redux?

- **Store**: Holds the state.
- **Actions**: Plain objects that describe what happened (must have a `type`).
- **Reducers**: Pure functions that return the new state based on the current state and action.

---

#### 4. What is the role of the Redux store? How do you create one?

The store is the **central container** for all app state.

**To create a store:**

```js
import { createStore } from 'redux';
const store = createStore(rootReducer);
```

With Redux Toolkit:

```js
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({ reducer: rootReducer });
```

---

#### 5. What is an action in Redux? Provide an example.

An action is a **plain object** with a `type` property that describes what happened.

**Example:**

```js
const incrementAction = { type: 'INCREMENT' };
```

---

#### 6. What is a reducer in Redux? Write a simple reducer function.

A reducer is a **pure function** that takes `state` and `action`, and returns the **next state**.

**Example:**

```js
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
};
```

---

#### 7. Explain the Redux data flow (unidirectional).

Redux follows a **one-way data flow**:

1. UI triggers `dispatch(action)`
2. Action goes to **Reducer**
3. Reducer returns a new state
4. UI re-renders based on the new state from **Store**

---

#### 8. What is an action creator? Why use them?

An action creator is a **function that returns an action object**.

**Example:**

```js
const increment = () => ({ type: 'INCREMENT' });
```

**Why use them?**

- Reusable
- Makes code cleaner and easier to test

---

#### 9. What is dispatch in Redux and how does it work?

`dispatch()` is a method used to **send an action** to the Redux store.

**Example:**

```js
store.dispatch({ type: 'INCREMENT' });
```

The store then passes the action to the reducer to calculate the new state.

---

#### 10. What is the difference between Redux and React Context API?

| Feature       | Redux                   | Context API         |
| ------------- | ----------------------- | ------------------- |
| Purpose       | State management        | Prop sharing        |
| Async Support | Yes (middleware)        | No built-in support |
| DevTools      | Yes                     | No                  |
| Boilerplate   | More (reduced with RTK) | Less                |

Use Redux for **complex state**, and Context for **simple, UI-related state**.

---

---

### 🟡 Intermediate-Level: Practical Usage & Toolkit

#### 1. What is Redux Toolkit and why is it recommended?

Redux Toolkit (RTK) is the **official, recommended way** to write Redux logic. It reduces boilerplate and simplifies Redux setup.

**Why RTK is recommended:**

- Easier to write reducers and actions using `createSlice()`
- Simplifies async logic with `createAsyncThunk()`
- Uses `Immer.js` under the hood for immutability
- Built-in development tools support

---

#### 2. What is a slice in Redux Toolkit? How does `createSlice()` work?

A slice is a portion of the Redux state along with the logic to manage it.

``** helps to:**

- Define the state
- Write reducer functions
- Automatically generate actions

**Example:**

```js
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});
```

---

#### 3. What is `createAsyncThunk` and when should you use it?

`createAsyncThunk` is used for **handling asynchronous operations** like API requests.

**When to use:**

- You need to fetch data or perform async tasks within Redux logic.

**Example:**

```js
export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (id) => {
    const response = await fetch(`/api/user/${id}`);
    return response.json();
  }
);
```

It automatically handles `pending`, `fulfilled`, and `rejected` actions.

---

#### 4. What is the difference between `useSelector` and `useDispatch`?

- `useSelector`: Used to read data from the Redux store.
- `useDispatch`: Used to send actions to the store.

**Example:**

```js
const count = useSelector((state) => state.counter);
const dispatch = useDispatch();
dispatch(increment());
```

---

#### 5. What are selectors in Redux? Why are they useful?

Selectors are **functions that extract and return specific parts of the state**.

**Benefits:**

- Cleaner code
- Avoid repetition
- Can be optimized with memoization (e.g., using `reselect`)

**Example:**

```js
const selectCounter = (state) => state.counter;
```

---

#### 6. Why should reducers be pure functions?

Reducers must:

- **Always return the same output** for the same input.
- **Avoid side effects** (no API calls, no random values).

**Benefits:**

- Makes testing easier
- Predictable and stable state updates

---

#### 7. What is immutability in Redux and why is it important?

Immutability means **never directly modifying the state**; always return a **new state object**.

**Why important?**

- Helps React detect changes for re-rendering
- Ensures predictable state updates
- Avoids unexpected bugs

Redux Toolkit handles this using `Immer.js` internally.

---

#### 8. How do you handle async operations in Redux (Thunk/Saga)?

- **Redux Thunk**: Allows writing functions that perform async calls and then dispatch actions.
- **Redux Saga**: Uses generator functions (`function*`) for complex async workflows.

**Thunk example:**

```js
const fetchData = () => async (dispatch) => {
  const res = await fetch('url');
  const data = await res.json();
  dispatch(setData(data));
};
```

---

#### 9. What is middleware in Redux? Give an example (e.g., logging, async).

Middleware is a function that sits between `dispatch` and the reducer. It can modify or log actions.

**Common middlewares:**

- `redux-thunk` – for async operations
- `redux-logger` – logs every action

**Logger example:**

```js
const logger = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  return next(action);
};
```

---

#### 10. How do you connect a React component to Redux using hooks or HOC?

**With hooks:**

```js
import { useSelector, useDispatch } from 'react-redux';

const MyComponent = () => {
  const value = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(increment())}>Click</button>;
};
```

**With connect() HOC (older way):**

```js
import { connect } from 'react-redux';

const MyComponent = ({ count, increment }) => (
  <button onClick={increment}>{count}</button>
);

const mapStateToProps = (state) => ({ count: state.counter });
const mapDispatchToProps = { increment };

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

---

### 🔴 Advanced-Level: Architecture, Performance, and Optimization

#### 1. Explain the complete Redux data flow from action to UI update.

1. A user interacts with the UI and triggers an event.
2. That event causes `dispatch(action)` to be called.
3. The action goes through any middleware (e.g., thunk, logger).
4. It reaches the reducer, which calculates the new state based on the current state and the action.
5. The store updates the state.
6. Components using `useSelector()` or `connect()` re-render with the new state.

---

#### 2. What is the role of Redux Thunk? How does it differ from Redux Saga?

- **Redux Thunk**: A middleware that lets action creators return functions instead of plain objects. Used for simple async logic.
- **Redux Saga**: Uses generator functions to handle complex async flows and side effects in a more structured way.

**Difference:**

| Thunk                   | Saga                          |
| ----------------------- | ----------------------------- |
| Simpler, uses functions | More complex, uses generators |
| Good for small apps     | Good for large/complex apps   |
| Less boilerplate        | More structured control       |

---

#### 3. Explain Redux middleware pipeline and how custom middleware works.

Redux middleware wraps the dispatch function and allows actions to be intercepted before reaching reducers.

**Custom middleware format:**

```js
const customMiddleware = store => next => action => {
  console.log('Action:', action);
  return next(action); // pass to next middleware or reducer
};
```

Middlewares are added during store setup:

```js
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware)
});
```

---

#### 4. What is Redux Saga and when should you use it over Thunk?

Redux Saga is a middleware that uses ES6 generator functions to handle side effects.

**When to use Saga:**

- You have complex async logic (e.g., retry, cancellation, sequence).
- You want to write testable async flows.

**Example:**

```js
function* fetchUserSaga(action) {
  try {
    const data = yield call(api.fetchUser, action.payload);
    yield put({ type: 'FETCH_SUCCESS', payload: data });
  } catch (e) {
    yield put({ type: 'FETCH_ERROR', message: e.message });
  }
}
```

---

#### 5. What is state normalization in Redux? Why is it useful?

Normalization means storing data in a flat structure (like a database).

**Why useful?**

- Easier updates
- Avoids deep nesting
- Reduces duplication

**Example:**

```js
state = {
  users: {
    byId: {
      1: { id: 1, name: 'Rakib' },
      2: { id: 2, name: 'Eras' }
    },
    allIds: [1, 2]
  }
};
```

---

#### 6. What is `reselect`? How does it help with memoization and performance?

`reselect` is a library that helps build **memoized selectors**.

**Benefits:**

- Prevents unnecessary recalculations
- Improves performance

**Example:**

```js
import { createSelector } from 'reselect';

const selectUsers = (state) => state.users;

const selectActiveUsers = createSelector(
  [selectUsers],
  (users) => users.filter((user) => user.active)
);
```

---

#### 7. What are the performance considerations when using Redux?

- Avoid unnecessary re-renders (use `reselect` or memoization)
- Normalize state
- Split state into logical slices
- Avoid deeply nested state structures
- Use Redux DevTools only in development

---

#### 8. How do you structure a large-scale Redux application?

- Use `feature-based` folders: each feature has its own slice
- Group actions, reducers, and selectors per feature
- Use Redux Toolkit for clean and modular code
- Split reducers with `combineReducers`
- Use selectors to access data

**Example structure:**

```
src/
  features/
    users/
      userSlice.js
      userSelectors.js
    products/
      productSlice.js
      productSelectors.js
```

---

#### 9. What are the drawbacks of using Redux? When should you avoid it?

**Drawbacks:**

- Extra boilerplate (less with Toolkit)
- Learning curve
- Overkill for small apps

**Avoid Redux when:**

- The app is small or has minimal shared state
- You only need to pass props down one or two levels
- Context API can handle your needs

---

#### 10. How does Redux handle SSR (Server-Side Rendering)?

- Create a **new Redux store for each request** on the server
- Preload data by dispatching actions before rendering
- Pass the store state to the client to rehydrate it

**Basic flow:**

1. Server creates store
2. Server dispatches async actions
3. Server renders the app with state
4. Client receives initial state and hydrates it into Redux store

---
### 🧠 Bonus Conceptual Questions

#### 1. What is a memory leak in state management?

A **memory leak** happens when memory that's no longer needed is not released. In state management, this often occurs if:

- You subscribe to a store or event but forget to unsubscribe
- Components are not unmounted properly

**Example:** If a component subscribes to store updates but is never removed, it keeps consuming memory.

**Prevention:**

- Use cleanup in `useEffect`
- Properly unsubscribe listeners

---

#### 2. What is prop drilling and how does Redux solve it?

**Prop drilling** is when data is passed through multiple intermediate components to reach a deeply nested component.

**Example:** App → Layout → Sidebar → Profile → Avatar (passing user data through each)

**How Redux helps:**

- With Redux, components access global state directly using `useSelector()` without having to pass props through all layers.

---

#### 3. What is the difference between local and global state? When to use each?

- **Local State**: Managed within a component using `useState`, for UI-specific data (e.g., modals, input fields)
- **Global State**: Shared across multiple components, managed using Redux or Context

**When to use:**

- Local: Form inputs, toggle states, etc.
- Global: User authentication, app-wide themes, shopping cart

---

#### 4. Explain Flux architecture. How is Redux inspired by Flux?

**Flux** is an architecture developed by Facebook for predictable state updates.

**Flux flow:**

1. View triggers **Action**
2. Action is sent to **Dispatcher**
3. Dispatcher notifies **Store**
4. Store updates state
5. View re-renders

**Redux vs Flux:**

- Redux uses a **single store** instead of multiple
- Redux removes dispatcher and replaces it with `dispatch()`
- Redux uses **pure functions (reducers)**

---

#### 5. What is the difference between uni-directional and bi-directional data flow?

- **Uni-directional (Redux)**: Data flows in one direction — from state to view to action to state.
  - Predictable and easier to debug
- **Bi-directional (like Angular's two-way binding)**: View and model update each other directly
  - Can cause unpredictable state and harder debugging

---

#### 6. How does Redux DevTools work and what features does it provide?

**Redux DevTools** is a browser extension that integrates with Redux store.

**Features:**

- Inspect all dispatched actions
- View state changes
- Time-travel debugging (go back to previous state)
- Revert actions
- Track performance

**How it works:**

- Middleware connects your store to the DevTools extension
- Listens to state updates and actions

**Setup:**

```js
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = configureStore({ reducer });
```

---
### 💻 Code-Based Challenges to Practice

#### 🔹 Implement a counter app using Redux Toolkit

1. Set up a `counterSlice`:

```js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    reset: (state) => { state.value = 0 },
  }
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

2. Add reducer to store:

```js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
```

3. Use it in a component:

```js
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './features/counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};
```

---

#### 🔹 Handle an async API call using createAsyncThunk

1. Create thunk:

```js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    return res.json();
  }
);
```

2. Create users slice:

```js
const usersSlice = createSlice({
  name: 'users',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default usersSlice.reducer;
```

---

#### 🔹 Debug code where state is mutated directly in a reducer

❌ Bad:

```js
case 'INCREMENT':
  state.count++  // Direct mutation if not using Immer
  return state;
```

✅ Good:

```js
case 'INCREMENT':
  return { ...state, count: state.count + 1 }
```

✅ Or use `createSlice()` which uses Immer internally.

---

#### 🔹 Refactor boilerplate vanilla Redux code using Redux Toolkit

Vanilla Redux:

```js
// actions.js
export const INCREMENT = 'INCREMENT';
export const increment = () => ({ type: INCREMENT });

// reducer.js
export const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT': return state + 1;
    default: return state;
  }
};
```

Redux Toolkit:

```js
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1
  }
});
```

---


