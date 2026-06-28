# 🛒 Shoply Backend

A backend REST API for the \*\*Shoply E-Commerce Application\*\* built using \*\*Spring Boot\*\*, \*\*Spring Data JPA\*\*, and \*\*MySQL\*\*. The application provides APIs for managing products, orders, and wishlists following a layered architecture.


## 🚀 Features


- Product Management

- Order Management

- Wishlist Management

- RESTful APIs

- Spring Data JPA

- MySQL Database Integration

- Exception Handling

- Layered Architecture



## 🛠️ Technologies Used

- Java 17

- Spring Boot

- Spring Data JPA

- Spring Web

- Hibernate

- Maven

- MySQL


## 📂 Project Structure

text

src

├── main

│   ├── java

│   │   └── com.shoply

│   │       ├── ShoplyBackendApplication.java

│   │       ├── config/

│   │       ├── controller/

│   │       │     ├── OrderController.java

│   │       │     ├── ProductController.java

│   │       │     └── WishlistController.java

│   │       ├── dto/

│   │       ├── entity/

│   │       │     ├── Order.java

│   │       │     ├── Product.java

│   │       │     └── Wishlist.java

│   │       ├── exception/

│   │       ├── repository/

│   │       │     ├── OrderRepository.java

│   │       │     ├── ProductRepository.java

│   │       │     └── WishlistRepository.java

│   │       ├── service/

│   │       │     ├── OrderService.java

│   │       │     ├── ProductService.java

│   │       │     └── WishlistService.java

│   │       └── util/

│   │

│   └── resources

│       ├── static/

│       ├── templates/

│       └── application.properties

│

└── test


## ⚙️ Database Configuration

Configure the database in:-

src/main/resources/application.properties


Example:-

properties:-

spring.datasource.url=jdbc:mysql://localhost:3306/shoply

spring.datasource.username=root

spring.datasource.password=YOUR\_PASSWORD

spring.jpa.hibernate.ddl-auto=update

spring.jpa.show-sql=true

server.port=8080


## ▶️ Running the Project

Clone the repository:-
bash

git clone https://github.com/samarth8698/Shoply.git


Navigate to the backend folder:-


bash

cd Backend/Shoply-Backend



Run using Maven:-

bash

mvn spring-boot:run


Or run:-

ShoplyBackendApplication.java


from Eclipse / STS.


## 📁 Architecture:-

text

Client

&#x20;  │

REST API

&#x20;  │

Controller

&#x20;  │

Service

&#x20;  │

Repository

&#x20;  │

MySQL Database


## 📌 Future Enhancements:-

- JWT Authentication

- Role-Based Authorization

- Payment Gateway Integration

- Product Search \& Filtering

- Image Upload

- Email Notifications


## 👨‍💻 Author:-

Samarth Adhao


GitHub:-
https://github.com/samarth8698
