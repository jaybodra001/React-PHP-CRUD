# React-PHP-CRUD

This is a simple user management system built with React for the frontend and PHP for the backend. It allows you to add, update, and list users.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js and npm (https://nodejs.org/)
- PHP and MySQL server (e.g., XAMPP, WAMP, or LAMP)
- A code editor (e.g., VSCode)

## Installation

### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. **Set up the database**:
    - Open your MySQL client (phpMyAdmin, MySQL Workbench, etc.)
    - Create a new database named `ReactPHP`
    - Run the following SQL script to create the `tbl_user` table:

    ```sql
    CREATE TABLE tbl_user (
        userid INT AUTO_INCREMENT PRIMARY KEY,
        uname VARCHAR(50) NOT NULL,
        uemail VARCHAR(50) NOT NULL,
        status TINYINT(1) NOT NULL
    );
    ```

3. **Configure the backend**:
    - Ensure the PHP backend files are placed in a directory accessible by your web server (e.g., `htdocs` for XAMPP).

4. **Backend files**:
    - `user.php` should be placed in `http://localhost/ReactWithPHP/api/user.php`.

### Frontend Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd your-repo-name/frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the React development server**:
    ```bash
    npm start
    ```

## Usage

1. **Access the application**:
    - Open your browser and navigate to `http://localhost:3000`

2. **Add a User**:
    - Fill out the form and submit to add a new user.

3. **Edit a User**:
    - Navigate to the user list, click on a user to edit their details.

4. **List Users**:
    - Navigate to the user list to see all users.

## API Endpoints

- **GET /api/user.php**: Fetch all users.
- **GET /api/user.php/{id}**: Fetch a single user by ID.
- **POST /api/user.php**: Add or update a user. Expected JSON payload:
    ```json
    {
        "id": "1",
        "username": "JohnDoe",
        "email": "john@example.com",
        "status": "1"
    }
    ```

## Troubleshooting

- Ensure the backend server (e.g., XAMPP) is running.
- Check the console for any errors and ensure all configurations are correctly set.
- Verify that the database connection details are correct.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add some awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
