# Pianista Frontend

Pianista is VisionSpace’s internal automated planning tool that allows users to submit planning requests and solver tasks, and receive computed plans for complex systems.
This project provides a frontend interface built in React, making it easier to interact with the Pianista API, input parameters, and view results in a clear, structured way.

## Setup

1. Environment Setup
    Before running the project, configure your environment variables. Create a `.env` file in the root directory with the following:

    ```bash
    VITE_BASE_URL=https://planner-apim.azure-api.net
    VITE_API_KEY=YOUR_API_KEY_HERE
    ```


2. Installation

    ```bash
    npm install
    ```

3. Running the Development Server

    ```bash
    npm run dev
    ```