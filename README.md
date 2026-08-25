# Assesment-Uncounted-Solar-Gigawatts
Web GIS Demo Applicattion

UNCOUTED SOLAR GIGAWATTS – APPLICATION
=======================================

1. OVERVIEW
-----------

This project contains a React frontend application and a Node.js/Express
backend application.

The application is containerized using Docker and Docker Compose so that
the frontend and backend can be built and run together.

Project Structure:

Assesment-Uncounted-Solar-Gigawatts/
│
├── docker-compose.yml
├── .env.example
├── README.txt
│
├── uncounted-solar-gigawatts/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .dockerignore
│   ├── .env.example
│   └── ...
│
└── uncounted-solar-gigawatts-server/
    ├── Dockerfile
    ├── .dockerignore
    ├── .env.example
    └── ...


2. REQUIREMENTS
---------------

The following software is required:

- Docker Desktop
- Git

Docker Desktop should be installed and running before starting the
application.

No separate Node.js installation is required to run the application
through Docker.


3. ENVIRONMENT CONFIGURATION
----------------------------

The application uses environment variables for configuration.

Environment example files are provided as:

    .env.example

    uncounted-solar-gigawatts/.env.example

    uncounted-solar-gigawatts-server/.env.example


4. ROOT ENVIRONMENT FILE
------------------------

Create a .env file in the project root directory:

    Assesment-Uncounted-Solar-Gigawatts/.env in the same directory where docker-compose.yml is present.

Add the following:

    VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY (Will be shared in email)
    VITE_API_URL=/api

Replace YOUR_GOOGLE_MAPS_API_KEY with a valid Google Maps API key.


5. FRONTEND ENVIRONMENT FILE
----------------------------

Create:

    uncounted-solar-gigawatts/.env (It will be needed if you run app with npm)

Add:

    VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
    VITE_API_URL=/api

Replace YOUR_GOOGLE_MAPS_API_KEY with a valid Google Maps API key.


6. BACKEND ENVIRONMENT FILE
---------------------------

Create:

    uncounted-solar-gigawatts-server/.env (needed when running app with npm)

Add:

    PORT=5000


7. BUILDING THE APPLICATION
---------------------------

Open a terminal/PowerShell window in the project root directory:

    Assesment-Uncounted-Solar-Gigawatts

Run:

    docker compose build


8. STARTING THE APPLICATION
---------------------------

Start the application using:

    docker compose up

Alternatively, the application can be built and started in one command:

    docker compose up --build


9. ACCESSING THE APPLICATION
----------------------------

Once the containers have started successfully, open the following URL
in a web browser:

    http://localhost:3000

The React frontend is served through Nginx.


10. DOCKER SERVICES
-------------------

Docker Compose creates two services:

Frontend:

    Service: frontend
    Port: 3000

Backend:

    Service: backend
    Port: 5000

The frontend container uses Nginx to serve the built React application
and proxy API requests to the backend container.


11. STOPPING THE APPLICATION
----------------------------

To stop the running containers, press:

    Ctrl + C

Or run:

    docker compose down


12. REBUILDING THE APPLICATION
------------------------------

If source code or environment configuration is changed, rebuild the
containers using:

    docker compose down

    docker compose build --no-cache

    docker compose up

13. NOTES
---------

- The actual .env files should not be committed to Git.
- Use the provided .env.example files as templates.
- A valid Google Maps API key is required for the map functionality.
- Docker Desktop must be running before starting the application.
- Node.js is not required separately when running the application using
  Docker.


14. QUICK START
--------------

For a quick setup:

1. Clone the repository.

2. Navigate to the project directory:

       cd Assesment-Uncounted-Solar-Gigawatts

3. Create the required .env files using the provided .env.example files.

4. Add the Google Maps API key.

5. Make sure Docker Desktop is running.

6. Run:

       docker compose up --build

7. Open:

       http://localhost:3000

The application should now be available.