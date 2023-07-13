# CometLabs Project

You can visit the deployed Server here: `http://ec2-13-233-85-227.ap-south-1.compute.amazonaws.com:3000`

## Available Routes
| path | type | body |
|--|--|--|
| /auth/signup | `POST` | `{ name: string; email: string; password: string }` |
| /auth/login | `POST` | `{ email: string; password: string }` |
| /problem/new | `POST` | `{ name: string; description: string }` |
| /problem/update | `PUT` | `{ name?: string; description?: string; activeTestCases?: string; id: string }` |
| /problem/delete | `DELETE` | `{ id: string }` |
| /problem/test_case | `POST` | `{ id: string; input: string; output: string; timeLimit: Number }` |
| /problem/check | `POST` | `{ problemId: Number; source: string; compilerId: Number }` |

## Documentation
`/auth/signup`: signs up the any user given their name, email and password
`/auth/login`: logs a user in with the given credentials ie.. email and password
`/problem/new`: Creates a new problem (required role: `admin`)
`/problem/update`: Updates a problem with the provided information (required role: `admin`)
`/problem/delete`: Deletes a problem given it's id (required role: `admin`)
`/problem/test_case`: Adds a given test case to the problem id (required role: `admin`)
`/problem/check`: evaluates a given piece of code with the provided information (required role: `user`)

## Example
```HTTP
POST /problem/new
authroization: <JWT_TOKEN_ADMIN>
{ "name": "multiplies by 2", "description": "Given an integer through the stdin it prints the times 2 of that integer. EXAMPLE: STDIN: 2 STDOUT: 4" }
```

```HTTP
DELETE /problem/delete
authroization: <JWT_TOKEN_ADMIN>
{ "id": "<sphere id of the problem>" }
```

```HTTP
PUT /problem/update
authroization: <JWT_TOKEN_ADMIN>
{ "id": "<sphere id of the problem>", "name": "test problem updated" }
```


```HTTP
POST /problem/check
authroization: <JWT_TOKEN_ADMIN_OR_USER>
{ "problemId": <sphere id of the problem>, "source": "source code of user for example: print(int(input())*2)", "compilerId": <compiler id of the language which you are using in the source code for example the compiler id of python3.x is 116> }
```

```HTTP
POST /auth/signup
{ "name": "John Doe", "email": "johndoe@doe.com", "password": "password123" }
```

```HTTP
POST /auth/login
{ "email": "johndoe@doe.com", "password": "password123" }
```


## To run the clusters using Docker Compose

Step 1: Populate the environment file
```sh
# ./.env
PROBLEMS_API=<SPHERE KEY FOR THE PROBLEMS API>
SPHERE_BASE_PROBLEM_URL=https://<SPHERE USER ID>.problems.sphere-engine.com/api/v4
PORT=<THE PORT WHERE YOU WANT THE SERVER TO LIVE>
MONGO_URI=<MONGO DATABASE URI>
JWT_SECRET=<THE JWT SECRET WHICH WILL BE USED TO SIGN USER INFORMATION>
```

Step 2: Run the docker cluster
```bash
docker-compose up --build
```
Step 3:
Visit the running instance of the application in your network on port 3000

`NOTE: The environment file is mailed to hi@cometlabs.in by ohayouarmaan@gmail.com`
