# PoweredPoint

PoweredPoint is a web application that generates Microsoft PowerPoint presentations based on user prompts or uploaded documents. The application uses advanced NLP techniques, including LangChain and RAG (Retrieval-Augmented Generation), to create contextually relevant presentations.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Contributors](#contributors)
- [License](#license)

## Introduction
PoweredPoint allows users to generate PowerPoint presentations effortlessly. By leveraging AI-driven text processing and retrieval techniques, it can create presentations based on direct user input or by analyzing the content of uploaded documents. The backend is powered by Flask, with a React-based frontend providing a user-friendly interface.

## Features
- **AI-Powered Presentation Generation**: Generate presentations from user prompts using advanced NLP models.
- **RAG Integration**: Enhance presentations with contextual information from uploaded PDF or text files.
- **File Upload Support**: Upload documents to serve as the basis for generated slides.
- **Interactive Frontend**: A responsive React-based UI for seamless user interaction.

## Installation

To get started with PoweredPoint, follow these steps:

1. **Backend Setup**:
    ```bash
    python app.py
    ```
   This command runs the Flask backend server.

2. **Frontend Setup**:
    ```bash
    cd frontend/my-react-app
    npm install
    npm run dev
    ```
   This will start the React development server.

## Usage
Once the application is running:

- **Generate PowerPoint from a Prompt**: Enter a prompt or query in the text box and submit it to generate a PowerPoint presentation based on the input.
- **Use RAG for Enhanced Context**: Upload a PDF or text file to enable the system to use the content as a reference for generating more contextually accurate presentations.

## Dependencies
The project uses the following main dependencies:

### Backend (Python):
- Flask
- python-dotenv
- langchain
- pymongo
- python-pptx

### Frontend (JavaScript):
- React
- Axios
- React Router
- react-loader-spinner

## Configuration
Ensure you have the required environment variables set up, such as API keys and database connection strings. These can be configured in a `.env` file in the backend directory.
Alternatively, you can use locally hosted LLMs on LMStudio / Ollama , as well as locally hosted vector databases such as ChromaDB

## Contributors
- **Ethan** - *Lead Developer*

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
