# SCHOOL MANAGEMENT SYSTEM

Welcome to the School Management System application! This application allows users to manage their students records by adding, viewing, editing, and deleting them.

## User Stories

1. **Sign Up**

   - **As a new user**, I want to sign up for an account so that I can start managing my students records.
   - **Acceptance Criteria**:
     - Enter a username and password.
     - Receive confirmation upon successful registration.
     - Receive an error message if the username is already taken.

2. **Sign In**

   - **As a registered user**, I want to sign in to my account so that I can access and manage my students records.
   - **Acceptance Criteria**:
     - Enter username and password.
     - Redirect to dashboard after successful login.
     - Receive an error message if credentials are incorrect.

3. **View students records**

   - **As a signed-in user**, I want to view my students records as a list starts with the students school then name so that I can see all the students I have added.
   - **Acceptance Criteria**:
     - See a list of students with details like School, Name, Phone number ,and age.

4. **Add New student**

   - **As a user**, I want to add a new student to my students records.
   - **Acceptance Criteria**:
     - Provide details like School, Name, Phone number ,and age.
     - Redirect to student list of records page after adding.

5. **Edit student Details**

   - **As a user**, I want to edit student details to update information or correct mistakes.
   - **Acceptance Criteria**:
     - Change details such as School, Name, Phone number ,and age.
     - Redirect to updated student list of records page after saving.

6. **Delete Student**
   - **As a user**, I want to delete a student from my student records if I no longer want to keep it.
   - **Acceptance Criteria**:
     - Remove a student record from the list.
     - Redirect to student list of records page after deletion.

- **User Registration and Authentication**: Users can sign up, sign in, and manage their own student records.
- **Student Management**: Users can add, view, edit, and delete students in their list of records.

### ER diagram

see image in images folder

### Wireframe

see image in images folder

### **_Screenshots_**:

see image in images folder

![Landing page]
![Sign-up page]
![Sign-in page]
![Home Page]
![Adding students]
![Show students]
![Update students]

### **_Technologies Used:_**

- Node.js: JavaScript runtime for server-side development.
- Express.js: Web framework for building the server.
- MongoDB: NoSQL database for storing user and movie data.
- Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
- EJS: Templating engine for rendering HTML views.
- bcrypt: Library for hashing passwords.

### **_Future Updates_**

- Advanced Filtering and Sorting:

  - "Adding more filtering and sorting options to help users manage their student records better."

- Personalized Recommendations:

  - "Implementing features to offer personalized student recommendations based on user preferences."
