# Members only

This project is a website where users can post messages. Only when users are logged in and when they are a member of the website can they view the authors of the messages and the dates that they were posted on. If the user is not a member, the user can not create messages nor view who wrote the already existing messages. Users can become a member by entering a secret passcode.

### Motivation

This project is part of the The Odin Project curriculum (Node.js course). In this project I practiced with authentication in Node.js and setting up a Node.js backend in general. 

### Things used

For this project I used pug for the view templates, Node.js to run the code and a few npm packages:
- express
- async
- dotenv
- express-validator
- mongoose
- passport
- nodemon

All the data is stored in a MongoDB database. Some data in that database is encrypted (which is part of the project). The instructions for the project can be found [here](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/members-only).

### How does it work?

Messages are displayed on the homepage of the website, but a non-member can't see who wrote those messages. To become a member, the non-member has to create an account and then join the club by entering their username and a secret passcode. Once they've done that, they'll become a member! There's also an admin user, they can delete messages from other people if they want to. 

You can view this project live by clicking [here](https://fathomless-plains-00201.herokuapp.com/membersonly).
