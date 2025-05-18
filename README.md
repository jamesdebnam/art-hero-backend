# art-hero-backend
The backend for ART HERO!!!! Make any art! Anywhere! Anytime!!!!

## Description
A simple Express.js backend server with SQLite database for storing and retrieving masterpieces. The API allows you to create and retrieve JSON data representing masterpieces. This project is built with TypeScript for improved type safety and developer experience.

## Installation
1. Clone the repository
2. Install dependencies:
```
npm install
```

## Usage

### Development
1. Run the TypeScript compiler in watch mode and start the server:
```
npm run dev
```
This will start the server using ts-node, which compiles and runs TypeScript code directly.

### Production
1. Build the TypeScript code:
```
npm run build
```
This will compile the TypeScript code to JavaScript in the `dist` directory.

2. Start the server:
```
npm start
```
The server will run on port 3000 by default. You can change this by setting the PORT environment variable.


## API Endpoints

### Create a Masterpiece
- **URL**: `/masterpiece`
- **Method**: `POST`
- **Body**: JSON object (any structure)
- **Response**: JSON object with the created masterpiece data and ID
- **Example**:
```
POST /masterpiece
{
  "title": "My Masterpiece",
  "description": "A beautiful piece of art",
  "colors": ["red", "blue", "green"]
}
```

### Get All Masterpieces
- **URL**: `/masterpiece`
- **Method**: `GET`
- **Response**: Array of all masterpieces
- **Example**:
```
GET /masterpiece
```

### Get a Specific Masterpiece
- **URL**: `/masterpiece/:id`
- **Method**: `GET`
- **URL Parameters**: `id` - The ID of the masterpiece
- **Response**: JSON object with the masterpiece data
- **Example**:
```
GET /masterpiece/1
```
