# MERN Authentication App

This is a full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack. The application incorporates robust authentication features enabling users to sign up, log in, and log out. It also ensures access to protected routes exclusively for authenticated users.

## Features

- **Authentication:** Allows users to sign up, log in, and log out securely.
- **Protected Routes:** Provides access to protected routes accessible only to authenticated users.
- **Front-end:** The front-end of the application is constructed with React, utilizing React Router for client-side routing.
- **Back-end:** The back-end is powered by Node.js and Express.
- **Database:** MongoDB serves as the database for storing application data.
- **Authentication Mechanism:** Implements authentication using JSON Web Tokens (JWT) for enhanced security.

## Local Setup

To run this application locally, follow these steps:

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the .env.example file to .env in root and client directory separately:
  ```bash
   cp .env.example .env
   ```
5. Open the .env file from root folder. Update the JWT_SECRET and MONGODB_URL with your local MongoDB connection string.
   ```bash
    #JWT_SECRET
   JWT_SECRET = "Your JWT secret key"
   
    # MongoDB Connection URL
   DATABASE_URL="mongodb://your-mongodb-url"
   ```
6.Open the .env file from client folder and update the VITE_FIREBASE_API_KEY with your Firebase API key.
  ```bash
    #VITE_FIREBASE_API_KEY
   VITE_FIREBASE_API_KEY = "Your Firebase API key"
   ```
7. Run the back-end server in the root directory.
   ```bash
   npm run dev
   ```
9. Run the front-end React app in the client directory.
   ```bash
   npm run dev
   ```

## Usage

Once the application is running, users can:

- Sign up for a new account.
- Log in using their credentials.
- Access protected routes available only for authenticated users. Where they can:
  - Update user details
  - Delete Acount
  - Sign Out

## Tech Stack

- **Front-end:** React, React Router
- **Back-end:** Node.js, Express, MongoDB
- **Authentication:** JSON Web Tokens (JWT)


## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.


