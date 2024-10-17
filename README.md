Node.js Backend Template with Swagger UI
========================================

Overview
--------

This is a simple Node.js backend template that provides a solid foundation for building RESTful APIs. It includes middleware setup, route structure, error handling, and Swagger UI documentation for ease of API exploration and testing.

Features
--------

-   **Express**: Fast, unopinionated, and minimalist web framework for Node.js.
-   **Swagger UI**: Auto-generated and interactive API documentation.
-   **Environment Configuration**: Easy-to-configure `.env` for environment variables.
-   **Error Handling**: Centralized error-handling mechanism.
-   **Database**: Database integration with MongoDB using `moongoose`.
-   **CORS**: Cross-Origin Resource Sharing enabled by default.

Getting Started
---------------

### Prerequisites

Before you begin, ensure you have the following installed on your system:

-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
    
    ```bash
    cd your-repo-name
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env` file in the root of the project and specify your environment variables:

    ```bash
    PORT=3000
    MONGODB_URI="your-mongo-db-uri"
    JWT_KEY="your-jwt-for-auth"
    PASSWORD_SEC="password-security-key-for-encrypting-user-password"
    ```

### Running the Application

To run the application, use:

    node index.js

The API will be running at `http://localhost:3000`.

### Swagger UI

This project uses [Swagger](https://swagger.io/) to automatically generate API documentation. To access the Swagger UI, run the application and navigate to:

bash

`http://localhost:3000/api/user`

You'll see an interactive interface where you can test your API endpoints.

### API Documentation Example

javascript


 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve all registered users in the system.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
*                    email:
*                       type:string
*                    password:
*                       type:string
*                    role:
*                       type:string
*                    permission:
*                       type:string

Folder Structure
----------------

```bash

├── src
│   ├── routes          # Application routes
│   ├── models          # Database models
│   ├── middlewares     # Express middlewares for request validation and more
│   ├── config          # Configuration files (e.g., DB connections)
│   └── index.js          # Main application file
├── test                # Unit and integration tests
├── dist                # Local swagger renderer 
├── .env                # Environment variables
├── .gitignore
├── package.json
└── README.md
```

Dependencies
------------

-   [Express](https://expressjs.com/)
-   Swagger UI
-   [dotenv](https://github.com/motdotla/dotenv)
-   [CORS](https://github.com/expressjs/cors)
-   [JWT](https://github.com/auth0/node-jsonwebtoken)
-   [Crypto-JS](https://github.com/brix/crypto-js)

Contributing
------------

Feel free to contribute to the project by submitting a pull request or opening an issue.

License
-------

This project is licensed under the MIT License. See the <LICENSE> file for more details.