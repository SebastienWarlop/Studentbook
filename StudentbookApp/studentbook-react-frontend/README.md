# Getting Started with Lecturers frontend

## **Prerequisites**

`Dotenv`

To get the React frontend up and running, you'll need to create a **.env** file in you root project directory (on the same level as .gitignore). It's the same file we've created in the backend (with the database config). For the frontend, we only need to define the API_URL indicating where the backend is running.

```
API_URL=http://localhost:3000
```

## **Starting the frontend**

First you will need to start a backend Express server. Open your backend project in a seperate vscode window and make sure it's running (on same port you defined in API_URL in .env).

Run the following commands in a terminal (project root folder) to install all required node packages en get the server up and running:

```
> npm install

> npm start
```

This will start a React frontend running on http://localhost:8001.

