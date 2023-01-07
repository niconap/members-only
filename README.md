# Members only

You can view this project live by clicking [here](https://members-only-685y.onrender.com/membersonly). Using a dummy account can be done by using the following credentials:
- Username: dummy
- Password: Password

## What is it?
This project is a website where users can post messages. Only when users are logged in and when they are a member of the website can they view the authors of the messages and the dates that they were posted on. If the user is not a member, the user can not create messages nor view who wrote the already existing messages. Users can become a member by entering a secret passcode.

## Motivation
This project is part of the The Odin Project curriculum (Node.js course). In this project I practiced with authentication in Node.js and setting up a Node.js backend in general. 

## Tools used
For this project I used pug for the view templates, Node.js to run the code and a few npm packages:
- express
- async
- dotenv
- express-validator
- mongoose
- passport
- nodemon
See the `package.json` file for a full list of all dependencies.

All the data is stored in a MongoDB database. Some data in the database is encrypted using bcrypt (which is part of the project). The instructions for the project can be found [here](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/members-only).

## How does it work?
Messages are displayed on the homepage of the website, but a non-member can't see who wrote those messages. To become a member, the non-member has to create an account and then join the club by entering their username and a secret passcode. Once they've done that, they'll become a member! There's also an admin user, they can delete messages from other people if they want to. Any member can become an admin if they know the passcode.

## API documentation
The API does not send data in JSON format, instead it renders the webpages.

### GET requests
`/signup/` renders the signup page.

`/join/` renders the join page where users need to enter a secret code to become a member.

`/login/` renders the login page.

`/logout/` logs out the user and redirects them to `/`.

`/message/create/` renders the page for creating messages.

`/message/:id/delete/` renders the page for deleting messages.

`/admin/` renders the page to enter the secret code for becoming an admin.

`/user/:id/` will render a user's account page.

### POST requests
All data needs to be provided in the body of the HTTP request.

`/signup/` creates an account. Data needs to be provided in the following format:
```json
{
  "first_name": "Sample",
  "last_name": "Sample",
  "user_name": "sample",
  "password": "Sample"
}
```

`/join/` changes the user's status to become a member. The join code needs to be provided in the following format:
```json
{
  "passcode": "12345..."
}
```

`/login/` logs the user in using passport. The credentials need to be provided in the following format:
```json
{
  "username": "sample",
  "password": "sample"
}
```

`/message/create/` adds a new message to the database. The content needs to be provided in the following format:
```json
{
  "title": "Sample title",
  "text": "Sample content"
}
```

`/message/:id/delete/` deletes a message from the database. The message id needs to be provided in the following format:
```json
{
  "messageid": "12345..."
}
```

`/admin/` changes the user's status to become an admin. The passcode needs to be provided in the same format as the '/join/' POST request.

#### Notes
Updating messages or user info is not possible as that was not stated in the project description. This functionality might be added later.
The `/message/:id/delete/` POST request should have been a DELETE request.
