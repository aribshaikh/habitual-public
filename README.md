# Habitual

Wellness Journey Web application geared towards Muslim Youth and Young Adults

## Deployed Link
https://habituall.herokuapp.com/login
## Navigation

#### [Web application Description](https://github.com/csc309-fall-2021/team03/blob/main/README.md#web-application-description-1)

#### [How to Start](https://github.com/csc309-fall-2021/team03/blob/main/README.md#how-to-start-1)

#### [How to Use Habitual](https://github.com/csc309-fall-2021/team03/blob/main/README.md#how-to-start-1)

#### [Routes](https://github.com/csc309-fall-2021/team03/blob/main/README.md#how-to-start-1)
#### [Features for Users](https://github.com/csc309-fall-2021/team03/blob/main/README.md#features-for-users-1)

#### [Features for Admin](https://github.com/csc309-fall-2021/team03/blob/main/README.md#features-for-admin-1)

#### [Documentation](https://github.com/csc309-fall-2021/team03/blob/main/README.md#documentation-1)

#### [Built With](https://github.com/csc309-fall-2021/team03/blob/main/README.md#built-with-1)

#### [Authors](https://github.com/csc309-fall-2021/team03/blob/main/README.md#authors-1)

#### [Licensing Information](https://github.com/csc309-fall-2021/team03/blob/main/README.md#licensing-information-1)

## Web application Description

The web application, Habitual main focus will be on key emotions and bad habits the users share and how they can overcome them. This application is targeted towards the youth and its overall purpose is to give helpful suggestions on how to create a better lifestyle. Users will be able to take a weekly quiz on how they feel and have a personal dashboard where they can see their current emotions and get helpful tips. They’ll be able to see their progress since they have created their account. They’ll also have a forum where they’ll have the opportunity to share posts and comment on other users’ posts. The web application is intended to be a safe space where the youths can not only get help to better themselves but also help better others.

## How to Start

Clone it, first!

```
$ git clone https://github.com/csc309-fall-2021/team03.git
```

Install react and npm on your device, next.

Enter the project directory and run the following commands:

```
$ npm install
$ node server.js
```

cd to habitual folder and install the following

```
$ cd habitual
$ npm install
$ npm start
```

Open `http://localhost:3000`

**If you node server.js command is giving an error**

code: 'MODULE_NOT_FOUND',
requireStack: [ '/Users/danyal/test309/team03/server.js' ]

Run the following steps:
1. Delete the package-lock.json
2. In the root directory run: 
```
$ npm install
$ node server.js
```
**If the webpage does not open after 'npm start'**

Run the following commands:

```
$ export NODE_OPTIONS=--openssl-legacy-provider
$ npm start
```

Now post and read posts freely!

## How to use Habitual

## Routes

#### /users - GET Request
GET request that requests all the users from the database
- Request: GET
- URL: ``` /users/ ```
- Request Body: none
- Response body returns a list of all user objects

#### /users/getUsers/:id - GET Request
GET request that requests user based on user.\_id
- Request: GET
- URL: ``` /users/getUsers/:id ```
- Request Body: none
- Response: Body returns user object coressponed to user.\_id

#### /users/add - POST Request
POST request that sends a new users data to the server and saves it in the database
- Request body contains a user object from the data inputted into the frontend
```
  { "user": Name of User, 
    "username": Username of User, 
    "email": Email of User, 
    "password": Password of User }
```
- Response body returns an object with a message and the newUser object
```
  {{ "message": Message, 
     "newUser": { "user": Name of User, 
                  "username": Username of User, 
                  "email": Email of User, 
                  "password": Password of User} 
  }}
```
Example of POSTMAN Request
- Request: POST
- URL: ```/users/add ```
- Request Body Example:
```
  { "user": John Doe, 
    "username": johndoe, 
    "email": johndoe@gmail.com, 
    "password": john }
```
- Response Body Example
```
  { "message": "User added!",
    "newUser": { "username": "johndoe", 
                 "email", "johndoe@gmail.com", 
                 "password": "$2b$10$oKIdtGO4gqvM3RcahbXAD.toJulmfpsEVYvMQ1R/glZdMJNA.TmGG", 
                 "selectedHabits": [], 
                 "\_id": "61adbf11cc3d4d174953b6cb"}}
```


#### /users/login - POST Request
POST request that verifies user login credentials, and allows them to access the application
- Request body contains a user object from the data inputted into the frontend, which include username and password
```
  { "username": Username of User,
    "password": Password of User}
```
- Response body returns an object with a message and the current user logged in
```
  {{ "message": Message,
     "Log in successfull",  
     { "username": Username of User", "password": Password of User}
  }}
```
Example of POSTMAN Request
- Request: POST
- URL: ```/users/login```
- Request Body Example:
```
  { "username": "user", 
    "password": "user"}
```
- Response Body Example:
```
  { "message": "Login successfull!", 
  {"username": "user", "password": "user"}}
```

#### /users/logout - GET Request
GET request that requests to destroy the current session and logs out the user
Example of POSTMAN Request
- Request: POST
- URL: ```/users/logout```
- Request Body Example: none
- Response Body Example: none

#### /users/:id - DELETE Request
DELETE request that allows the admin to delete a user, based on user.\_id
- Response body returns user object coressponed to user.\_id

Example of POSTMAN Request
- Request: DELETE
- URL: ```/users/:id```
- Request Body Example: none
- Response Body Example: 
```
  { "message": Deleted User Susscessfuly!, 
    "user": {"username": "name of user", "email", "name of email", "password": "userpassword"}
```

#### /users/addHabit/:id - POST Request
POST request that allows a user to add a habit to their selected lists
- Request body contains a habit json object from the habits gallery selected at the frontend
```    
  { "habit": Name of Habit }
```
- Response body returns an object with the added habit, and the list of updated selectedHabits for the users. **Note if the user has already selected the requested habit, the duplicate habit will not be added. Only unique request bodies will be added to the users selected habits list, as this was done for UX purposes.
```
  {{ "habit": Name of Habit, "selectedHabits": {"habit": Name of Habit, ...} }}
```
Example of POSTMAN Request
- Request: POST
- URL: ```/users/addHabit/:id```
- Request Body Example:
```
  {"habit": "Sleep for 7-10 hours per day"}
```
- Response Body Example:
```
  { "message": "Habit added!", "habit": "Sleep for 7-10 hours per day"}, 
    "selectedHabits": [{"habit": "Sleep for 7-10 hours per day"}...]
```

#### /users/:id/:habit_id - DELETE Request
DELETE request allows the users are allowed to remove habits from the "Your Habits" list, based on user.\_id, and the specific habit.\_id
- No request body, this request is made from the User Profile Habits page
- Response body returns habit object coressponed to user.\_id
Example of POSTMAN request
- Request: DELETE
- URL: ```/users/:id/:habit_id```
- Request Body Example: none
- Response Body Example:
```
  { "message": Deleted Habit Susscessfuly!, 
    "user": "deletedhabit", user:}
```

#### /habits - GET Request
GET request that requests all the habits in the database
- No request body
- Response body returns a list of all habit objects
Example of POSTMAN request
- Request: GET
- URL: ```/habits/```
- Response Body Example with 200 OK response
```
  { name: "Physical Health", 
    habit1: "10000+ Steps per Day", 
    habit2: "work out 4+ days a week", 
    habit3: "Drink water daily"}
```

#### /habits/:id - DELETE Request
DELETE request that allows the admin to delete a habit category, based on the habit.\_id
- No request body
- Response body returns user object coressponed to user.\_id
Example of POSTMAN request
- Request: DELETE
- URL: ```/users/:id```
- Response Body
```
  { "message": Deleted User Susscessfuly!,
    "user": {"username": "name of user", "email", "name of email", "password": "userpassword"}
```

#### /habits/add - POST Request
POST request that sends a new habits data to the server and saves in the database, this is when an admin adds a new habit category with 3 associated habits as needed.
- Request body contains a habit object from the data inputted into the frontend
```
  { "user": Name of User, 
    "username": Username of User, 
    "email": Email of User, 
    "password": Password of User}
```
- Response body returns an object with a message and the newHabit object
```
   {{ "message": Message, "newUser": {"user": Name of User, "username": Username of User, "email": Email of User, "password": Password of User} }}
```
Example of POSTMAN Request
- Request: POST
- URL: ```/users/add```
- Request Body Example:
```
   { name: "TestHabitAdd", 
     habit1: "5 Steps per Day", 
     habit2: "work out 5+ days a week", 
     habit3:"Drink tea daily" }
```
- Response Body Example: 
```
    { "message": "Habit added!"}
```

#### /posts - GET Request
GET request that requests all the posts from the database
- Request: GET
- URL: ``` /posts/ ```
- Request Body: none
- Response body returns a list of all post objects

#### /posts/add - POST Request
POST request that sends a new post data to the server and saves it in the database
- Request body contains a post object from the data inputted into the frontend
```
  { "title": Title of post, 
    "username": Username of User, 
    "postContent": Post Content, 
    "category": Post Category,
    "private": Privacy of POst}
```

#### /posts/comment/:id - POST Request
POST request that send a new comment to the associated post with the id specified in the URL
- Request body contains 
```
  { "username": Username of User,
    "name": Name of User,
    "comment": Comment
  }
```

#### /posts/like/:id - POST Request
POST request that sends a user to the likedUsers for a specified post
- Request body contains a post object from the data inputted into the frontend
```
  { "username": Username of User }
```
## **Main Roles / Features for Users**

1. **Logging in as a user:**

`Username: user
Password: user`

1. **Adding posts publicly/ privately via community or profile page**
2. **Like own post Posts and/or others**
3. **Commenting on any public post**
4. **Adding habit reflection on the stress or time management page** 
5. Users can add/delete any of their habits categories from the habits gallery
6. Can view their own posts (public and private) on their reflect page.
7. **Users can take self-assessment which returns a short summary of how the user is doing**
8. Can view past self-assessments via 'assess' page. Users can see the date of the assessment and how they did

## **Main Roles / Features for Admin**

1. **Logging in as Admin:**

`Username: admin
Password: admin`

1. **Delete/Add habit categories**
2. Have a list of all users
3. **View a users profile**
4. **Delete a users account/post**

<!-- ## Main Roles / Features for Users

1. **Logging in as a user:**

```
Username: user
Password: user
```

2. **Adding posts publicly**

3. **Liking Posts**

4. **Commenting on a posts**

5. **Adding/removing habits**

6. **Taking self assessments**

## Main Roles / Features for Admin

1. **Logging in as Admin:**

```
Username: admin
Password: admin
```

2. **Delete/Add habit categories**

3. **View a users profile**

4. **Delete a users account/post**

5. **Please do not interact with the footer except for the log out button** -->

## Documentation

**Components**

- AddNewUser - Component to add a new user
- Answers - Component for quiz answers in the self assessment quiz
- Comments - Component for comments on posts
- CommunityPosts - Components for Posts
- Footer - Component that houses the footer
- Habits - Component for habits
- Login Box - Component to display Login Box
- Profile - Component to display User Profile
- WriteReflection - Component for users to add posts

**Screens**

- Login Screen
- Community Posts Screen
- Profile Screen
- Habit Gallery Screen
- Self Assessment Quiz Screens
- Admin View Screen

**Schemas**

- User
- Post
- Habit

### Built With

- React.js
- Node.js
- HTML
- CSS
- JavaScript

### Libraries Used

```
* axios - Promise based HTTP client for the browser and node.js Used to make requests from frontend to backend.
```

```
* bcrypt - A library to help you hash passwords.
```

```
* body-parser - Node.js body parsing middleware.
```

```
* connect-mongo - MongoDB session store for Connect and Express
```

```
* cookie-parser - Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
```

```
* cors - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
```

```
* dotenv - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
```

```
* express - Fast, unopinionated, minimalist web framework for node.
```

```
* express-session - Simple session middleware for express
```

```
* @material-ui - React components that implement Google's Material design
```

```
* mongoose - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
```

```
* validator - A library of string validators and sanitizers.
```

## Authors

Habitual was implemented by a group of Computer Science and Machine Learning students at the University of Toronto. This project was created for the course CSC309: Programming on the Web. The group members are listed below.

- Arib Shaikh

- Danyal Khan

- Sarah Eddeb

- Nima Hashi

## Licensing Information

Copyright © 2021 Habitual
