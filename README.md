# Todo App

A small full-stack todo app. You can see, add, tick off, edit and delete todos, and they are stored in a MongoDB database.

- **Backend:** Express 5, TypeScript, mongoose (`backend/`)
- **Frontend:** React 19, Vite, TypeScript, SWR (`frontend/`)

## Requirements

- Node.js 22 or newer
- A MongoDB database: a local MongoDB or a free cluster on MongoDB Atlas

## Getting started

1. Clone the repository and open the folder:

   ```bash
   git clone https://github.com/RukiDV/ToDo_App_Recap_7.git
   cd ToDo_App_Recap_7
   ```

2. Install the dependencies in both parts:

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   cd ..
   ```

3. Create the file `backend/.env` from the example:

   ```bash
   cp backend/.env.example backend/.env
   ```

   Open `backend/.env` and put in your own connection string as `MONGODB_URI`. Use the database name `todos`:

   - Local: `mongodb://127.0.0.1:27017/todos`
   - Atlas: `mongodb+srv://<user>:<password>@<cluster-host>/todos?retryWrites=true&w=majority`

   `PORT` is optional and defaults to `3001`. Never commit `backend/.env`: it contains your connection string.

4. Start the backend. Leave it running:

   ```bash
   cd backend
   npm run dev
   ```

   It prints that it is connected to the database and that the API is running on port 3001.

5. Start the frontend in a second terminal:

   ```bash
   cd frontend
   npm run dev
   ```

6. Open the app:

   - App: http://localhost:5173
   - API health check: http://localhost:3001/api/health (answers `{ "status": "ok" }`)

## Checks

```bash
cd backend && npm run typecheck
cd frontend && npm run check
cd frontend && npm run build
```

## API

All endpoints, status codes and error messages are described in [`docs/api-contract.md`](docs/api-contract.md).

## Project description

The description of the recap project (user stories, review checklist) is in [`docs/project-description.md`](docs/project-description.md).

## Troubleshooting

- **The backend stops at start or says "connection refused":** check `MONGODB_URI` in `backend/.env`. With Atlas, also check that your current IP address is allowed under "Network Access", and that the password has no special characters that need URL encoding.
- **The browser says "blocked by CORS policy":** the backend is not running, or the frontend does not run on `http://localhost:5173`. The backend only allows that address.
- **The page shows "Could not load the todos":** the backend is not running. Start it and press "Try again".

## Where I would add an owner for each todo

There is no user in this project yet. When a todo gets an owner, this is where I would add it:

- **Backend:** I would add an `owner` field (the id of a user) to the schema in `backend/src/models/Todo.ts` and to the types in `backend/src/types.ts`. A middleware in `app.ts`, before the todos router, would find out who is making the request and put the user id on the request. The routes would then use it: `GET` only finds the todos of this owner, `POST` saves the owner on the new todo, and `PUT` and `DELETE` look for the todo by `id` **and** owner, so nobody can change or delete the todos of someone else (they get a 404).
- **Frontend:** All calls to the API are in `frontend/src/api.ts`, so the user's token would be added there in one place, as an `Authorization` header. The app would also need a login form and a place that remembers the current user. The components would not have to change.
