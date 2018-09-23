# BRSA
Bus Route Suggesting Application 

## Technologies used
1) Express (Framework)
2) MongoDB (Database)
3) JSON Web Tokens (Authentication)


## How to run and install
Before running the API for the first time install the node modules and set up the database.
### To install the node modules
```
npm install
```
### To populate database
```
node populateDB mongodb://127.0.0.1:27017/BRSA
```
### Start the server
```
npm start
```
To stop the server ctrl+C

## How to use the routes
The routes folder has a list of all the routes files for each model. All that has to be done is added the route to the end of any base URLs which are
      "http://localhost:8080/user"
      "http://localhost:8080/journey"
      "http://localhost:8080/busRoute"
      "http://localhost:8080/journeyRoute"
      "http://localhost:8080/busStop"     
Such as 
      "http://localhost:8080/user/create"
The "POST http://localhost:8080/login" route will return a JSON Web Token which is needed to access the routes with the authentication middleware function. Once the token is returned by that route, the token should be passed in the request with a header called "x-access-token".
