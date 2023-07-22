# Speed Typing Game

This project is a Speed Typing Game app that allows users to practice in Solo mode and to join rooms and play to see real-time progress of each player in the Multi Player mode. It uses Socket.IO for real-time communication.

## Getting Started

### Prerequisites

Before running the app, make sure you have the following installed on your machine:

- Node.js (at least version 14)
- npm (Node Package Manager)

### Installation

1. Clone the repository to your local machine:
   git clone https://github.com/ranjit534/SpeedTyping.git
   cd SpeedTyping
2. Install the dependencies for the client (React app):
   npm install
3. Install the dependencies for the server (Node.js server):
   cd server
   npm install
   cd ..
   
### Running the App

1. Start the Node.js server:
   cd server
   node server.js
   The server will run on http://localhost:5000.

2. Open a new terminal and start the React app:
   npm start
   The React app will run on http://localhost:3000.

    You can now open your browser and access the app at http://localhost:3000.

## Features

- Real-time communication using Socket.IO.
- Multiplayer rooms with real-time updates on user joining/leaving.
- Typing indicator when users are typing.

## Technologies Used

- React
- Socket.IO
- Node.js (for server)
- Express.js (for server)
- React Router

## Libraries Used

-random-words(npm library)

## Contributing

Contributions are welcome! If you find any bugs or have new features to add, please open an issue or submit a pull request.
