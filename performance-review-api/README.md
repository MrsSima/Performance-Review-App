# Perfomance Review Input App
This is a very simple JSON server for performance review input app.

Routes served: 
```
GET /employees - get list of employees
GET /employees/:id - get employee by ID
DELETE /employees/:id - delete employee by ID
POST /employees/:id - updates employee by id
PUT /employees - add new employee
GET /reviews/pending - get list of pending reviews
PUT /reviews/pending - assign review
GET /reviews/pending/:employeeId - get list of pending reviews for employeeId
GET /reviews/submitted - get list of submitted reviews
PUT /reviews/submit - submit a review
```
Default DB (db.json) content is employee list with empty pending and submitted review lists.

## Server setup
Dependencies installation
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn start
```
Starts on port 3001

## Frontend setup
To run the frontend side, please check the UI folder (next to API);
