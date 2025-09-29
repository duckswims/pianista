# Pianista Frontend

Pianista is an internal automated planning tool developed by VisionSpace Technologies GmbH that allows users to easily submit planning requests and solver tasks — and receive optimized, computed plans for complex systems.

The frontend is designed to make automated planning more intuitive, accessible, and user-friendly — turning complex backend computations into clear and actionable plans.


## Video Demonstration

[![YouTube Icon](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/-2txh0haYu0)


## Setup

1. Environment Setup
    Before running the project, configure your environment variables. Create a `.env` file in the root directory with the following:

    ```env
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