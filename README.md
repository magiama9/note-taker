# glowing-umbrella

Note Taking App built with Node and Express.

## About this App

![Functionality Demo](https://github.com/magiama9/glowing-umbrella/blob/master/demo/note-taker-demo.gif)

The app allows users to write, save, and delete notes that persist across sessions. Data storage functionality is currently handled entirely through JSON; a true database system is not employed.

This app was built as an exercise in back-end, server-side functionality. The goal was to take a pre-built front-end and connect it to a custom back end while ensuring complete functionality.

## Technical

Three HTTP methods are employed --- `GET, POST, and DELETE`. `/ and /api/notes` take `GET `requests. `/api/notes` also receives `POST` requests for new notes. `/api/notes/:id` receives `DELETE` requests for removing notes.

Notes are dynamically assigned an ID value that updates when new notes are added to storage. The ID value is used to display the active/selected note as well as to delete notes.

On the front-end, Bootstrap is employed as a CSS framework and component library.


## TO-DO

  * Allow editing of saved notes. This was not required functionality.

  * Improve front end design. Home page/landing page is currently redundant and forces an extra unncessary clickthrough

  * Implement true database storage system instead of JSON.