# Smartbrain - A face recognition app #



### Face Detection App with Clarifai ###
This web application utilizes Clarifai's Face Detection AI to identify faces in images. Users can create an account, input an image URL, and the app will search for faces in the provided images. All user data is securely stored in a PostgreSQL database, and the backend is powered by ExpressJS.

### Features ###
User Authentication: Secure user accounts with authentication to ensure a personalized experience.
Image Input: Users can input any image URL for face detection analysis.
Face Detection: Utilizes Clarifai's Face Detection AI to identify and locate faces in the provided images.
Database Storage: All user data and relevant information are stored in a PostgreSQL database for future reference.
Getting Started
To run the app locally, follow these steps:

Clone the repository:

```bash
git clone https://github.com/your-username/face-detection-app.git
```
Install dependencies:

```bash
cd face-detection-app
npm install
```
Set up the PostgreSQL database:

Create a PostgreSQL database and update the database configuration in config/db.js.
Set up Clarifai API Key:

Sign up for a Clarifai account and obtain an API key.
Update the API key in config/clarifai.js.
Run the application:

```bash
npm start
```
The app will be accessible at http://localhost:3000.

### Technologies Used Frontend: ###

HTML, CSS, JavaScript
React (or your preferred frontend library/framework)
### Backend: ###

Node.js with ExpressJS
PostgreSQL for database storage
AI Integration:

Clarifai for face detection

### Contributing ###
Feel free to contribute to the development of this project. Please follow the contribution guidelines when making changes.
