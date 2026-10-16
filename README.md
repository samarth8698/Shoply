# 🛍️ Shoply — Full Stack E-Commerce Application

Shoply is a full-stack e-commerce web application developed using React.js, Java Spring Boot, Spring Security, JWT, Spring Data JPA, and MySQL.

The application provides an online shopping experience with product browsing, category-based filtering, user authentication, shopping cart management, wishlist, online payment integration, order management, product reviews, and an administrative dashboard.

## 🌐 Live Demo

**Live Website:** https://shoply-zeta-two.vercel.app

**GitHub Repository:** https://github.com/samarth8698/Shoply

---

## 📌 Table of Contents

* Project Overview
* Features
* Technology Stack
* Project Architecture
* Project Structure
* Frontend
* Backend
* Database
* Payment Integration
* Installation and Setup
* Deployment
* Developer

---

## 🚀 Project Overview

Shoply is designed using a three-tier application architecture.

The application consists of three main components:

1. **Frontend:** React.js provides the user interface.
2. **Backend:** Spring Boot handles application logic and REST APIs.
3. **Database:** MySQL stores application data.

The frontend communicates with the backend through REST APIs. The backend processes requests, manages application operations, and interacts with the database.

Razorpay is integrated to support online payment processing.

---

## ✨ Features

### 👤 User Authentication

* User Registration and Login
* JWT-Based Authentication
* Forgot Password
* OTP Verification
* Password Reset
* Change Password
* Protected Routes

### 🛍️ Shopping Features

* Browse Products
* View Product Details
* Browse Product Categories
* Category-Based Product Filtering
* Product Search
* Filter Products by Brand and Price
* Sort Products by Price
* Shopping Cart Management
* Wishlist Management
* Checkout System

### 💳 Payment and Orders

* Razorpay Payment Gateway Integration
* Online Payment Processing
* Payment Status Management
* Order Placement
* My Orders
* Order Tracking
* Order Cancellation

### ⭐ Product Reviews

* Submit Product Reviews
* Product Ratings
* Display Reviews and Ratings

### 👤 User Profile

* View Profile
* Edit Profile Information

### 🛠️ Admin Dashboard

* Dashboard Analytics
* Product Management
* Add, Edit, and Delete Products
* User Management
* Order Management
* Payment Management

---

## 🧰 Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* Tailwind CSS
* React Router
* Axios
* Lucide React

### Backend

* Java 17
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* REST APIs
* Maven

### Database

* MySQL

### Payment Gateway

* Razorpay

### Development and Deployment Tools

* Visual Studio Code
* Spring Tool Suite (STS)
* Git
* GitHub
* Vercel
* Render
* Railway

---

## 🏗️ Project Architecture

```text
                    SHOPLY E-COMMERCE
                            |
                            v
                    +---------------+
                    |   Frontend    |
                    |   React.js    |
                    |     Vite      |
                    +---------------+
                            |
                         REST APIs
                            |
                            v
                    +---------------+
                    |    Backend    |
                    |  Spring Boot  |
                    | Java 17       |
                    | Spring        |
                    | Security/JWT  |
                    +---------------+
                            |
                            v
                    +---------------+
                    |   Database    |
                    |     MySQL     |
                    +---------------+

                External Payment Gateway
                        Razorpay
```

### Application Workflow

1. Users interact with the React frontend.
2. The frontend sends requests to backend REST APIs.
3. The backend processes requests and applies business logic.
4. Spring Data JPA communicates with MySQL.
5. The backend returns responses to the frontend.
6. Razorpay handles the integrated payment flow.

---

## 📂 Project Structure

The repository contains frontend application files, the Spring Boot backend, database resources, and project documentation.

```text
Shoply/
│
├── Backend/
│   └── Shoply-Backend/
│       ├── src/
│       │   └── main/
│       │       ├── java/
│       │       └── resources/
│       └── pom.xml
│
├── Database/
│   └── shoply.sql
│
├── Frontend/
│   └── shopping/
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   │   └── admin/
│       │   ├── services/
│       │   └── ...
│       ├── package.json
│       └── vite.config.js
│
├── public/
│   └── images/
│
├── src/
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── index.html
└── README.md
```

**Note:** The tree summarizes the known repository layout. The exact contents of the backend and database directories should be verified against the current repository.

---

## 🎨 Frontend

The frontend provides the user interface and communicates with backend APIs.

### Technologies

* React.js
* Vite
* JavaScript
* Tailwind CSS
* React Router
* Axios
* Lucide React

### Responsibilities

* Display products and categories
* Search and filter products
* Navigate between application pages
* Manage cart and wishlist interactions
* Provide authentication interfaces
* Display order and payment information
* Provide the admin dashboard
* Communicate with backend REST APIs

### Run the Frontend Locally

**Prerequisites:** Node.js and npm.

Open a terminal in the directory containing the frontend's `package.json`.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite.

**Important:** Configure the frontend API base URL to point to the appropriate backend environment.

---

## ⚙️ Backend

The backend manages business logic, authentication, database operations, and API communication.

### Technologies

* Java 17
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* Hibernate
* Maven
* REST APIs

### Responsibilities

* User authentication and authorization
* Product management
* Product search and filtering support
* Order processing
* Wishlist operations
* User profile operations
* Product reviews and ratings
* Payment integration
* Administrative operations
* Database communication

### Run the Backend Locally

**Prerequisites:** Java JDK 17, Maven, and MySQL.

Open the Spring Boot backend project in Spring Tool Suite or navigate to the directory containing `pom.xml`.

Run the application using Maven:

```bash
mvn spring-boot:run
```

Alternatively, run the main Spring Boot application class from Spring Tool Suite.

Configure the required database connection and environment variables before starting the backend.

---

## 🗄️ Database

MySQL is used as the relational database for storing application data.

### Technologies

* MySQL
* Spring Data JPA
* Hibernate

### Database Responsibilities

The database stores and manages persistent application data, including:

* User Information
* Product Information
* Product Categories
* Orders
* Payment Information
* Wishlist Data
* Product Reviews and Ratings

The actual tables and relationships are defined by the application's database schema and entity mappings.

### Database Setup

1. Install and start MySQL.
2. Create the database required by the application.
3. Import the project's SQL file if it is included in the repository.
4. Configure the database connection in the Spring Boot application.
5. Start the backend and verify database connectivity.

### Database Configuration

Configure the appropriate database connection properties in the backend.

Example configuration:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

These are example placeholders. Use the actual configuration expected by your backend application.

**Security:** Never commit database passwords, JWT secrets, or Razorpay secret keys to GitHub.

---

## 💳 Payment Integration

Shoply integrates the Razorpay Payment Gateway to support online payments during checkout.

### Payment Features

* Razorpay Payment Gateway Integration
* Checkout Payment Flow
* Online Payment Processing
* Payment Status Management

Payment credentials must be configured securely for the intended environment.

Test and production payment credentials must be handled separately.

---

## ⚙️ Installation and Setup

### Prerequisites

Install the following tools:

* Git
* Node.js and npm
* Java JDK 17
* Maven
* MySQL

### Step 1: Clone the Repository

```bash
git clone https://github.com/samarth8698/Shoply.git
```

Navigate to the repository:

```bash
cd Shoply
```

### Step 2: Configure the Database

* Start MySQL.
* Create the required database.
* Import the SQL file if it is available in the repository.
* Configure the database connection in the backend.

### Step 3: Start the Backend

Open the Spring Boot backend project and configure the required application settings.

Run:

```bash
mvn spring-boot:run
```

### Step 4: Start the Frontend

Open a separate terminal in the directory containing the frontend's `package.json`.

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

### Step 5: Verify the Application

* Open the frontend URL.
* Confirm that the backend is running.
* Verify that products load correctly.
* Test category filtering and product search.
* Test authentication and shopping cart functionality.
* Test the payment flow using the configured Razorpay environment.

---

## ☁️ Deployment

The application uses the following deployment services.

| Component       | Technology    |
| --------------- | ------------- |
| Frontend        | Vercel        |
| Backend         | Render        |
| Database        | Railway MySQL |
| Version Control | GitHub        |
| Payment Gateway | Razorpay      |

### Live Application

https://shoply-zeta-two.vercel.app

---

## 👨‍💻 Developer

**Samarth Subhash Adhao**

**Project:** Shoply — Full Stack E-Commerce Application

**GitHub:** https://github.com/samarth8698

---

## 🎯 Project Objective

Shoply was developed to demonstrate practical full-stack development skills, including frontend development, REST API integration, backend programming, authentication, relational database management, and payment gateway integration.

The project demonstrates how frontend technologies, backend services, databases, and a payment gateway work together to create an e-commerce application.
