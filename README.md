# Members only

This project will be a website with messages. Only when users are logged in and a member of the website can they view the authors of the messages. If the user is not a member, the user can not create messages nor view who wrote the already existing messages.

### Motivation

This project is part of the The Odin Project curriculum (Node.js course). In this project I'll practice with authentication in Node.js and setting up a Node.js backend in general. 

### Things used

For this project I used pug for the view templates, Node.js to run the code and a few packages:
- express
- async
- dotenv
- express-validator
- mongoose
- nodemon

All the data will be stored in a MongoDB Atlas database. Some data in that database will be encrypted (which is part of the project). The instructions for the project can be found [here](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/members-only).

### How does it work?

Messages are displayed on the homepage of the website, but a non-member can't see who wrote those messages. To become a member, the non-member has to create an account and then join the club by entering their username and a secret passcode. Once they've done that, they'll become a member! There's also an admin user, they can delete messages from other people if they want to. 