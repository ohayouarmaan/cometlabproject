# CometLabs Project

To run the clusters using Docker Compose

Step 1: Populate the environment file
```sh
# ./.env
PROBLEMS_API=<SPHERE KEY FOR THE PROBLEMS API>
SPHERE_BASE_PROBLEM_URL=https://<SPHERE USER ID>.problems.sphere-engine.com/api/v4
PORT=<THE PORT WHERE YOU WANT THE SERVER TO LIVE>
MONGO_URI=<MONGO DATABASE URI>
```

Step 2: Run the docker cluster
```bash
docker-compose up --build
```
Step 3:
Visit the running instance of the application in your network on port 3000

`NOTE: The environment file is mailed to hi@cometlabs.in by ohayouarmaan@gmail.com`