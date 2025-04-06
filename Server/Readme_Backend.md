# Setup Backend:

## Step 1 Installation

### For Local Installation:

1. You need to have NodeJS  installed in your system
2. `cd` to `Server` directory from root and install all the required packages using `npm i`
3. After installing create a `.env` folder in root of the ptoject 
4. in the `.env` file enter your mongodb url like this `MONGO_URI="mongodb+srv://your_mongodb_url`


### For Vercel (Production environment):

1. Open vercel website and import Your forked `TIFFIN_FUSION` repo
2. After that channge the root directory to server
3. And also add your env variables `key` will be `MONGO_URI` and `value` will be `your mongodb url`

## Step 2 Running The server:

You must start the server from root of the project.
After that  server will be running on port 3000

## Routes:
For Now authentication routes are defined:

1. Base route `/api/auth`
    * Registration `/api/auth/signup`
    * Login `/api/auth/login`


## Connecting with Frontend

In frontend there is a file named `Baselink.js` here add your server base `url` like `http://localhost:3000` or deployed url `https://url.vercel.app`

And your front end will be connected with the backend