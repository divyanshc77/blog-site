# Blog Site
This is a [blogging website](https://cheap-blog-site.netlify.app/) where people can share their ideas.

## Prerequisites
Make sure you have [Nodejs](https://nodejs.org/en) Installed on your machine.

## Installation
To run this application locally, follow these steps:

* Clone the repository to your local machine using the following command:
 ```bash
git clone https://github.com/your-username/full-stack-blog-app.git
 ```
* Navigate to the project directory:
```bash
cd <name-of-your-folder>
```
* Install the required dependencies:
```bash
npm install
```

## Functionalities
* Registed yourself first if you don't have an account already. If you just want to test, you can the dummy credentials below directly to log in : 
   ```User name : aman```
   ```Password : aman```
* Login into your account
* After logging in, you can create your own posts to share with other people.
* Author (and author alone) can edit or delete a post he/she created later.
* You can like posts (but have to be logged in to do so).
* You can view your profile to see the list of posts you have created and liked
* It also has dark mode (although it might not work very well, work is still in progress, I messed up css).

## Technologies Used
This website uses the MERN stack, i.e Node, Express for the backend, [Mongodb](https://www.mongodb.com/) for the database and [React](https://react.dev/) for the frontend.

Authentication is done using JWT (using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken))

For uploading images I used [Cloudinary](https://cloudinary.com/).

## Deployment

The back end is deployed using [Render](https://render.com/) and the react application using [Netlify](https://www.netlify.com/)

# The site is hosted [here](https://cheap-blog-site.netlify.app/)
