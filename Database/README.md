# 🗄️ Shoply — Database

Shoply is an e-commerce application that uses MySQL as its relational database. The database stores and manages application data related to users, products, orders, payments, product reviews, and wishlists.

The database is accessed by the Shoply backend application using Spring Data JPA and Hibernate.

## 📌 Database Information

| Property         | Details                    |
| ---------------- | -------------------------- |
| Project Name     | Shoply                     |
| Database Type    | MySQL                      |
| ORM              | Hibernate                  |
| Data Access      | Spring Data JPA            |
| Database Purpose | E-commerce data management |

---

## ✨ Database Features

* Store user account information
* Manage user roles
* Store product details
* Maintain customer orders
* Store payment records
* Manage product reviews and ratings
* Maintain user wishlists
* Support relationships between application entities
* Provide persistent storage for the e-commerce application

---

## 🧰 Technologies Used

| Technology      | Purpose                         |
| --------------- | ------------------------------- |
| MySQL           | Relational database             |
| SQL             | Database queries and operations |
| Spring Data JPA | Database access                 |
| Hibernate       | Object-relational mapping       |
| Java            | Backend database integration    |

---

## 📂 Database Entities

The Shoply backend contains the following entity classes.

| Entity     | Purpose                            |
| ---------- | ---------------------------------- |
| `User`     | Stores user-related information    |
| `Role`     | Represents user roles              |
| `Product`  | Stores product information         |
| `Order`    | Represents customer orders         |
| `Payment`  | Stores payment-related information |
| `Review`   | Stores product reviews and ratings |
| `Wishlist` | Represents saved products          |

*Note: These entities are based on the Shoply backend structure. The exact database table names, columns, constraints, and relationships should be confirmed from the entity classes or SQL schema.*

---

## 🗂️ Database Structure

The database supports the following logical relationships, subject to the actual entity mappings:

* Users can place orders.
* Orders can have associated payment records.
* Products can be associated with reviews.
* Users can maintain wishlist items.
* User roles can support authorization.

The exact cardinality and foreign-key constraints depend on the entity annotations and database schema.

---

## ⚙️ Installation and Setup

### Prerequisites

Install:

* MySQL Server
* MySQL Workbench (optional)
* Java 17
* Spring Boot application dependencies

### Step 1: Start MySQL

Ensure that your MySQL server is running.

### Step 2: Create the Database

Open MySQL Workbench or a MySQL command-line client and execute:

```sql
CREATE DATABASE shoply;
```

If your backend uses a different database name, use the name configured in `application.properties`.

### Step 3: Select the Database

```sql
USE shoply;
```

### Step 4: Configure the Backend Connection

Open the backend configuration file:

```text
src/main/resources/application.properties
```

Configure the connection using the appropriate database credentials.

Example:

```properties
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/shoply}
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

These properties are examples. Preserve the configuration used by your existing project.

### Step 5: Create Database Tables

The tables may be created by Hibernate when the backend starts if automatic schema generation is enabled.

For example:

```properties
spring.jpa.hibernate.ddl-auto=update
```

Use this setting only if it matches your project configuration. For production databases, use an appropriate schema migration strategy and back up important data before making schema changes.

Alternatively, if your repository contains a SQL schema file, import that file to create the database tables.

---

## 🧾 SQL Operations

### Show Available Databases

```sql
SHOW DATABASES;
```

### Select the Shoply Database

```sql
USE shoply;
```

### Show Database Tables

```sql
SHOW TABLES;
```

### Describe a Table

Replace `table_name` with an actual table name:

```sql
DESCRIBE table_name;
```

### View Table Records

Replace `table_name` with an actual table name:

```sql
SELECT * FROM table_name;
```

---

## 🔗 Backend Integration

The Shoply backend connects to MySQL using Spring Data JPA and Hibernate.

Database operations are organized through repository interfaces and entity classes.

Relevant backend packages include:

* `entity` — Database entity classes
* `repository` — Data access interfaces
* `service` — Application business logic
* `controller` — REST API request handling

The database connection is configured through the backend's application properties and environment variables.

---

## 🔒 Database Security

* Never commit production database passwords to GitHub.
* Use environment variables for sensitive configuration.
* Restrict database access to authorized applications and users.
* Use strong database credentials.
* Avoid exposing the database publicly without appropriate access controls.
* Back up important data regularly.
* Use a migration strategy for production schema changes.

---

## 🚀 Deployment

The Shoply application uses a deployed backend and a MySQL database.

Backend API:-
https://shoply-backend-p6zl.onrender.com

Configure the production database connection through the backend's deployment environment.

Do not place production database credentials in this README.


👨‍💻 Author :-
            *Samarth Subhash Adhao*
