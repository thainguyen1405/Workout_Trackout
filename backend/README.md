# Backend/Server

### Technologies

This backend uses Express.js as the framework and MongoDB (temporarily) as the data base until FireBase gets set up

### Hosting

In order to use this backend there are some prereqs needed:
- Node.js
- npm
- MongoDB/MongoSh

Go to their websites and follow their installation instructions 

Before starting the backend you also need to create and set up a .env file in the backend directory:
- JWT_SECRET=<use a long hexadecimal string>
- JWT_EXPIRES_IN=<1d, ...>
- NODE_ENV=<testing or production>

After installing:
1. Ensure that you are in the backend/ directory `cd backend` 
2. Ensure that you have MongoDB started and using the correct db `mongosh`, then in the console `use xrcise` 
3. Install all the packages using npm `npm install` 
4. Start the server `npm start` 

The server will start on lost host port 5000 (unless specified otherwise in a .env)

### Endpoints 

When testing locally, the endpoints will all begin with 'http://localhost:5000/api'

There are also various routes that require a JWT token, so include in the request accordingly

user:
- '/user'
    - '/login', post
        - Take email and password in the request body
        - Return the user
    - '/register', post
        - Take email and password in the request body
        - Return the user
    - '/logout', post
        - Takes no body 
        - Clears the jwt token in the cookies
    - '/:userId', put
        - Takes the userId in the url string and whatever parameters in the body
        - Updates by userId and returns the updated user
    - '/:userId', get
        - Takes the userId in the url string
        - Returns the user by userId
    - '/:userId', delete
        - Takes the userId in the url string
        - Deletes the user by userId

profile:
- '/profile'
    - '/', get
        - Takes userId in search param
        - Returns the profile for the user
    - '/', post
        - Takes userId, displayName, avatarUrl, bio, homeLat, homeLng, gymName, privacy in the request body 
        - Returns the newly created profile for that user
    - '/:profileId', get
        - Takes the profileId in the url string 
        - Returns the given profile
    - '/:profileId', delete
        - Takes the profileId in the url string 
        - Deletes the profile for that given user
    - '/:profileId', put
        - Takes the profileId in the url string and whatever parameters in the body
        - Updates by profileId and returns the updated profile

preference: 
- '/preference'
    - '/', get
        - Takes in userId in search param 
        - Returns the preference for the user
    - '/:preferenceId', get
        - Takes in preferenceId in the url string
        - Returns the preference with the given id
    - '/', post
        - Takes in userId, types, goals, preferredTimes in the request body
        - Creates a new preference with the given parameters
    - '/:preferenceId', delete
        - Takes in preferenceId in the url string
        - Deletes the preference of the given id
    - '/:preferenceId', put
        - Takes in preferenceId in the url string and whatever parameters in the body
        - Updates by preferenceId and returns the updated preference

exercise:
- '/exercise'
    - '/', get
        - Takes in some optional search params that can be used to filter
        - Returns all exercised based on the filters (or lack thereof)
    - '/:exerciseId', get
        - Takes in the exerciseId in the url string
        - Returns the exercise with the given id
    - '/', post
        - Takes in name, category, equipment, primaryMuscles in the request body
        - Returns the newly created exercise with the given parameters
    - '/:exerciseId', delete
        - Takes in the exerciseId in the url string
        - Deletes the exercise by the given id
    - '/:exerciseId', put
        - Takes in the exerciseId in the url string and whatever parameters in the body
        - Updates by exerciseId and returns the updated exercise

partner: 
- partnerId refers to the id of the partner object, otherUserId is the id of the actual partner
- '/partner'
    - '/', get
        - Takes in the userId as a search parameter  
        - Returns all partners associated with that user
    - '/:partnerId', get
        - Takes in the partnerId as a url parameter
        - Returns the partner object
    - '/', post
        - Takes in userId, otherUserId, status in the request body
        - Returns the newly created partner object
    - '/:partnerId', delete
        - Takes in the partnerId as a url parameter
        - Deletes the partner object by the given id
    - '/:partnerId', put
        - Takes in the partnerId as a url parameter and whatever parameters in the body
        - Updates the partner object and returns the updated partner

activity: 
- '/activity'
    - '/', post 
        - Takes in userId, type, startedAt, endedAt, distance, movingTime, avgPace, isLive in the request body 
        - Returns the newly created activity object
    - '/:activityId', get 
        - Takes in the activityId as a url parameter
        - Returns the activity object with that id
    - '/', get 
        - Takes in the userId as a search parameter
        - Returns all activities associated with that user
    - '/:activityId', put 
        - Takes in activityId as a url parameter and whatever parameters
        - Updates the activity object by the given id and returns the updated activity
    - '/:activityId', delete 
        - Takes in activityId as a url parameter 
        - Deletes the activity object by the given id

media:
- '/media'
    - '/', post
        - Takes in userId, url, and type in the request body
        - Returns the newly created media object
    - '/:mediaId', get
        - Takes in the mediaId as a url parameter
        - Returns the media object with that id
    - '/', get
        - Takes in the userId as a search parameter
        - Returns all activities associated with that user
    - '/:mediaId', put
        - Takes in mediaId as a url parameter and whatever parameters
        - Updates the media object by the given id and returns the updated media
    - '/:mediaId', delete
        - Takes in mediaId as a url parameter
        - Deletes the media object by the given id

health:
- '/health'
    - '/', post
        - Takes no parameters 
        - Returns server uptime, timestamp, and overall health

template
- '/template'
    - '/', get
        - Takes userId in search param
        - Returns all workout templates for that user
    - '/:templateId', get
        - Takes the templateId in the url string 
        - Returns the template and all the exercises within it
    - '/', post
        - Takes userId, title, description, visibility in the request body
        - creates and returns new workout template
    - '/:templateId', put
        - Takes templateId in the url string and whatever parameters in the body
        - Updates the template and returns the updated version
    - '/:templateId', delete
        - Takes the templateId in the url string
        - Deletes the template and all exercises inside it
Template exercises 
- '/:templateId/exercise', post
    - Takes templateId  in the url string 
    - Takes exerciseId, orderIndex, defaultSets, defaultReps, defaultWeight in the request body
    - creates a new exercise entry inside the template
- '/exercise/:entryId', put
    - Takes the entryId in the url string and whatever parameters in the body
    - updates exercise entry inside the template 
- '/exercise/:entryId', delete
    - takes entryId in the url string
    - Deletes that exercise entry from the template 
