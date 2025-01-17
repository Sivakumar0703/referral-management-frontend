# Referral Management System Frontend

This document provides an overview of the referral management system frontend application.

## Technologies Used

* React - JavaScript library for building user interfaces
* Bootstrap - CSS framework for responsive design
* Redux Toolkit - JavaScript library for managing application state
* Packages Used
    * axios - Promise-based HTTP client for making API requests
    * react-router-dom - Routing library for navigating between UI components
    * redux-toolkit - Simplifies creating Redux reducers and actions
    * react-toastify - Library for creating pop-up notifications

## Deployed URL

https://dot-job-referral.netlify.app/

## Routes

The application has four main routes:

* Landing Page (`/`): The initial page of the application.
* Login (`/login`): Allows users to log in to the system.
* Signup (`/signup`): Allows users to create a new account.
* Homepage (`/home`): The main application dashboard, accessible only after successful login. This route is protected and requires authentication.

## Screenshots

Landing Page
![Landing Page](https://i.imgur.com/AzTXvtX.png)

Signup page
![Signup](https://i.imgur.com/URkEemz.png)

Login page
![Login](https://i.imgur.com/OjEemmk.png)

Homepage
![Homepage](https://i.imgur.com/ySa1Hbi.png)

Candidate Referral Form
![Referral Form](https://i.imgur.com/SC7YHJa.png)

## Responsive Design

The application is built with a responsive design to ensure it adapts to different screen sizes and devices.


## Getting Started (Local Development)

**Prerequisites:**

* Node.js and npm (or yarn) installed on your system.

**Steps:**

1. Clone the repository containing the frontend code.
2. Navigate to the project directory in your terminal.
3. Install the project dependencies:

   ```bash
   npm install
4. To run the application:

   ```bash
   npm run dev
