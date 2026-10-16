# 🛒 Shoply Backend — E-Commerce REST API

Shoply Backend is a REST API application developed using Java and Spring Boot for an e-commerce platform. It manages authentication, products, orders, payments, reviews, user profiles, and wishlist operations.

The application follows a layered architecture with controllers, services, repositories, entities, and data transfer objects (DTOs).

🌐 Live Deployment

GitHub Repository :-  https://github.com/samarth8698/Shoply

Backend API :- https://shoply-backend-p6zl.onrender.com


🛍️ Products API :- [Shoply Products API](https://shoply-backend-p6zl.onrender.com/products)


## ✨ Features :-

🔐 1. Authentication and Security :-
                                    * User registration and login
                                    * JWT-based authentication
                                    * Spring Security integration
                                    * Token-based API access
                                    * Password change functionality
                                    * Forgot password workflow
                                    * OTP verification
                                    * Password reset functionality


📦 2. Product Management :-
                          * Retrieve product information
                          * Add new products
                          * Update product details
                          * Delete products
                          * Manage product descriptions, prices, images, and quantities


🛒 3. Order Management:-
                        * Create orders
                        * Retrieve order information
                        * View order details
                        * Update order information
                        * Cancel orders
                        * Store order data in the database


💳 4. Payment Integration :-
                            * Razorpay payment gateway integration
                            * Payment order processing
                            * Payment verification request handling
                            * Razorpay signature verification support
                            * Payment record management


⭐ 5. Reviews and Ratings :-
                            * Submit product reviews
                            * Retrieve product reviews
                            * Manage product ratings


👤 6. User Management :-
                        * Retrieve user information
                        * Manage user profile information
                        * Support user account operations


❤️ 7. Wishlist Management :-
                            * Add products to a wishlist
                            * Retrieve wishlist items
                            * Manage saved products


📧 8. Email Service :-
                    * Email service component
                    * Support for email-related application workflows

*Note: Actual email delivery depends on the configured email provider and deployment settings.*



🧰 Technologies Used :-

|   Technology    |                Purpose                     |
| --------------- | ------------------------------------------ |
| Java 17         | Backend programming language               |
| Spring Boot     | Application framework                      |
| Spring Web      | REST API development                       |
| Spring Security | Authentication and authorization           |
| JWT             | Token-based authentication                 |
| Spring Data JPA | Database access                            |
| Hibernate       | Object-relational mapping                  |
| MySQL           | Relational database                        |
| Maven           | Dependency management and build automation |
| Razorpay        | Online payment integration                 |
| Render          | Backend deployment                         |



📂 Project Structure :-

Shoply-Backend/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── shoply/
│   │   │           │
│   │   │           ├── ShoplyBackendApplication.java
│   │   │           │
│   │   │           ├── config/
│   │   │           │   ├── RazorpayConfig.java
│   │   │           │   └── SecurityConfig.java
│   │   │           │
│   │   │           ├── controller/
│   │   │           │   ├── AuthController.java
│   │   │           │   ├── OrderController.java
│   │   │           │   ├── PaymentController.java
│   │   │           │   ├── ProductController.java
│   │   │           │   ├── ReviewController.java
│   │   │           │   ├── UserController.java
│   │   │           │   └── WishlistController.java
│   │   │           │
│   │   │           ├── dto/
│   │   │           │   ├── AuthResponse.java
│   │   │           │   ├── ChangePasswordRequest.java
│   │   │           │   ├── ForgotPasswordRequest.java
│   │   │           │   ├── LoginRequest.java
│   │   │           │   ├── PaymentVerificationRequest.java
│   │   │           │   ├── ResetPasswordRequest.java
│   │   │           │   ├── SignupRequest.java
│   │   │           │   └── VerifyOtpRequest.java
│   │   │           │
│   │   │           ├── entity/
│   │   │           │   ├── Order.java
│   │   │           │   ├── Payment.java
│   │   │           │   ├── Product.java
│   │   │           │   ├── Review.java
│   │   │           │   ├── Role.java
│   │   │           │   ├── User.java
│   │   │           │   └── Wishlist.java
│   │   │           │
│   │   │           ├── repository/
│   │   │           │   ├── OrderRepository.java
│   │   │           │   ├── PaymentRepository.java
│   │   │           │   ├── ProductRepository.java
│   │   │           │   ├── ReviewRepository.java
│   │   │           │   ├── UserRepository.java
│   │   │           │   └── WishlistRepository.java
│   │   │           │
│   │   │           ├── security/
│   │   │           │   ├── CustomUserDetailsService.java
│   │   │           │   ├── JwtAuthenticationFilter.java
│   │   │           │   └── JwtService.java
│   │   │           │
│   │   │           ├── service/
│   │   │           │   ├── AuthService.java
│   │   │           │   ├── EmailService.java
│   │   │           │   ├── OrderService.java
│   │   │           │   ├── PaymentService.java
│   │   │           │   ├── ProductService.java
│   │   │           │   ├── ReviewService.java
│   │   │           │   ├── UserService.java
│   │   │           │   └── WishlistService.java
│   │   │           │
│   │   │           └── util/
│   │   │               └── RazorpaySignatureUtil.java
│   │   │
│   │   └── resources/
│   │       ├── static/
│   │       │   └── images/
│   │       │       └── Shoply-logo.png
│   │       ├── templates/
│   │       └── application.properties
│   │
│   └── test/
│
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md


 📁 Package Description :-

|          Package        |                     Description                    |
| ----------------------- | -------------------------------------------------- |
| config                  | Security and Razorpay configuration                |
| controller              | Handles HTTP requests and REST API endpoints       |
| dto                     | Defines request and response data objects          |
| entity                  | Represents database entities                       |
| repository              | Handles database access                            |
| security                | Provides JWT authentication components             |
| service                 | Contains application business logic                |
| util                    | Contains Razorpay signature verification utilities |
| resources/static/images | Stores static image resources                      |
| resources/templates     | Stores template resources                          |
| application.properties  | Contains application configuration                 |



⚙️ Prerequisites :-
                Before running the application, install :-
                                                          * JDK 17
                                                          * Apache Maven or use the included Maven Wrapper
                                                          * MySQL Server
                                                          * Git
                                                          * An IDE such as Spring Tool Suite, IntelliJ IDEA, or Eclipse

Verify Java:-
              java -version


Verify Maven:-
              mvn -version


🚀 Installation and Setup:-

Step 1: Clone the Repository :-
                              git clone https://github.com/samarth8698/Shoply.git


Step 2: Navigate to the Backend Directory :-
                                            cd Shoply/Backend/Shoply-Backend


Ensure this directory contains `pom.xml`.

Step 3: Create the Database :-
                            Create the MySQL database configured for the application.

Example:-
          sql:-
              CREATE DATABASE shoply;


Use the database name configured in your project if it differs from `shoply`.

Step 4: Configure Database Connection :-
      Open:-
            src/main/resources/application.properties


Configure the MySQL connection.

Example:-

properties :-
            spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/shoply}
            spring.datasource.username=${DB_USERNAME:root}
            spring.datasource.password=${DB_PASSWORD}
            spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver


These are example settings. Preserve any additional properties required by your existing application.

Configure JPA and Hibernate according to your project:-
        properties :-
              spring.jpa.hibernate.ddl-auto=update


Use appropriate database migration and schema management practices for production.

Step 5: Configure JWT and Razorpay :-
    Set the environment variables or configuration properties required by your existing code for:
              * JWT signing secret
              * Razorpay key ID
              * Razorpay key secret
              * Database credentials
              * Email service credentials, if email delivery is enabled

Security:-  Never publish real passwords, JWT secrets, Razorpay secrets, or email credentials in GitHub.

Step 6: Build the Application :-
                              Using Maven:-
                                            mvn clean install

On Windows, you can also use the included Maven Wrapper:-
                                                    mvnw.cmd clean install


Step 7: Run the Application :-
    Using Maven:-
               mvn spring-boot:run


Or on Windows:-
            mvnw.cmd spring-boot:run


The default Spring Boot port is usually `8080`, unless configured differently.
      Local base URL:-
                      http://localhost:8080


🔗 REST API Controllers :-
    The backend contains the following controller classes:

|     Controller     |              Responsibility                 |
| ------------------ | ------------------------------------------- |
| AuthController     | Authentication and account-related requests |
| ProductController  | Product-related requests                    |
| OrderController    | Order management                            |
| PaymentController  | Payment-related requests                    |
| ReviewController   | Product reviews and ratings                 |
| UserController     | User-related requests                       |
| WishlistController | Wishlist operations                         |

The exact HTTP methods, endpoint paths, request bodies, and response formats depend on the mappings defined in each controller.

Example API Request :-
          If the application exposes a product endpoint at `/products`, a request may look like:
                   http
                      GET /products


Use the actual `@RequestMapping`, `@GetMapping`, `@PostMapping`, `@PutMapping`, and `@DeleteMapping` annotations in the controller classes to document the exact API endpoints.



🗄️ Database :-
    Shoply uses MySQL as its relational database.
        The application uses Spring Data JPA and Hibernate to map Java entities to database tables.
              The entity package contains :-
                                            * User
                                            * Role
                                            * Product
                                            * Order
                                            * Payment
                                            * Review
                                            * Wishlist

Repository interfaces provide database access for the application's data entities.

Database connection settings should be configured using the properties required by the application.



💳 Razorpay Integration :-
    The backend includes Razorpay-related configuration and payment processing components.
        Relevant classes include:-
                                  * RazorpayConfig.java
                                  * PaymentController.java
                                  * PaymentService.java
                                  * PaymentVerificationRequest.java
                                  * RazorpaySignatureUtil.java


These components support payment integration and signature verification.
    For production use:-
                        * Keep the Razorpay key secret on the server.
                        * Verify payment signatures on the server.
                        * Validate payment status before marking an order as paid.
                        * Use the appropriate test or live credentials for the deployment environment.



🔒 Security :-
  The backend includes Spring Security and JWT-related components.
      Security-related classes include:-
                                    * SecurityConfig.java
                                    * CustomUserDetailsService.java
                                    * JwtAuthenticationFilter.java
                                    * JwtService.java


Recommended security practices:-

* Keep JWT signing secrets private.
* Store credentials in environment variables.
* Validate request data.
* Restrict protected operations to authorized users.
* Configure CORS for approved frontend origins.
* Use HTTPS in production.
* Never trust payment status supplied only by the client.



🚀 Deployment :-
  The Shoply backend is deployed on Render.
        Production Base URL :-
                                https://shoply-backend-p6zl.onrender.com


Deployment Checklist :-

1. Connect the GitHub repository to Render.
2. Select the backend service directory containing `pom.xml`.
3. Configure the Java and Maven build environment.
4. Configure the production database connection.
5. Add the required environment variables.
6. Configure the application to use the port provided by the hosting environment, where required.
7. Deploy the application.
8. Test the available API endpoints.

The precise build and start commands depend on the existing Render service configuration.



🔮 Future Enhancements :-

* Add Swagger/OpenAPI documentation.
* Improve automated unit and integration testing.
* Improve exception handling and request validation.
* Add structured logging and monitoring.
* Improve email delivery reliability.
* Improve database migration management.
* Expand API documentation with examples.



👨‍💻 Author :-
            *Samarth Subhash Adhao*
