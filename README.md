# Peformance Review Input App
This is a dummy app for performance review. 

It has admin view and user view. 
Admin can read user's review and assign review to any user. 
User can see pending reviews and submit once finish.

To run the app, please run the server side and the frontend side.

## Running server side
Please, run the next commands in /performace-review-api folder
``` 
yarn install
yarn start
```
This will start the server on 3001 port. More detailed documentation can be found in API (/performance-review-api) folder.
## Running frontend side
Please, run the next commands in /performace-review-api folder
``` 
yarn install
yarn serve
```
(same as API)
This will start the server on 8080 port. More detailed documentation can be found in UI (/performance-review-ui) folder.
If 8080 is already in use, 8081 will be taken (etc.)

It's ready!
You can access the application by opening
``` 
http://localhost:8080
```
in your browser.

## Credentials
To run admin mode please use these credentials:
```
login: admin
password: 123456
```
To run user mode, please use these credentials:
```
login: <name> (ex. Michael Scott)
password: 123456
```

## TODOs and Assumptions
### Assumptions
- Employees amount is not too big (otherwise pagination needed, for both review lists and employee lists)
- Preferable view is desktop view (since this is app for work)
- App language is English
### TODOs
Things that are needed/good to have (though it's never the time to stop to improve)
- Application log
- Normal deployment procedures
- Backend side validation with userfriendly errors
- Explain failure on login (wrong password/login)
- Login/Save Employee by 'enter' click (or drop employee edit by 'esc' click)
- Restrict editing more than one employee once
- Pagination (with flexible amount of items on the page, storing preferred amount in local storage)
- Mobile view
- Language switch
- Dark/Light mode switch
- Search for employee/review in Admin mode
- Make employees in Admin mode draggable 
- Mark submitted reviews as read/unread 
- Proper ID system (ulid) for employees and reviews
- Userfriendly validation for review submit: scroll to the failed field
- Add 'reminder' button on the pending review (to sent an email to remind)
- Add dates/timeperiod to reviews - both target timeperiod and submitted timestamp
