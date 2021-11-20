const jsonServer = require('json-server')
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
let db = require('./db.json');
const fs = require('fs');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;
server.use(cors());
server.use(bodyParser.json());

server.get('/employees', (req, res) => {
    res.status(200).json(db.employees);
});

server.get('/employees/:id', (req, res) => {
    res.status(200).json(db.employees.find(employee => employee.id === req.params.id));
});

server.delete('/employees/:id', (req, res) => {
    deleteEmployee(req.params.id)
    saveDB();
    res.status(200).json();
});

server.post('/employees/:id', (req, res) => {
    updateEmployee(req.body)
    saveDB()
    res.status(200).json();
});

server.put('/employees', (req, res) => {
    addEmployee(req.body);
    saveDB();
    res.status(200).json();
});

server.put('/reviews/pending', (req, res) => {
    addPendingReview(req.body);
    saveDB();
    res.status(200).json();
});

server.post('/reviews/pending', (req, res) => {
    updatePendingReview(req.body);
    saveDB();
    res.status(200).json();
});

server.get('/reviews/pending', (req, res) => {
    res.status(200).json(db.reviews.pending);
});

server.get('/reviews/pending/:employeeId', (req, res) => {
    res.status(200).json(db.reviews.pending.filter(review => review.from === req.params.employeeId));
});

server.get('/reviews/submitted', (req, res) => {
    res.status(200).json(db.reviews.submitted);
});

server.put('/reviews/submit', (req, res) => {
    addSubmittedReview(req.body);
    saveDB();
    res.status(200).json();
});

function saveDB() {
    fs.writeFile("db.json", JSON.stringify(db, null, "\t"), 'utf8', function (err) {
        if (err) {
            // eslint-disable-next-line no-console
            return console.log(err);
        }
    });
}

function deleteEmployee(employeeId) {
    db.employees = db.employees.filter(employee => employee.id !== employeeId);
    db.reviews.submitted = db.reviews.submitted.filter(review => review.to !== employeeId && review.from !== employeeId);
    db.reviews.pending = db.reviews.pending.filter(review => review.to !== employeeId && review.from !== employeeId);
}

function updateEmployee(data) {
    const index = db.employees.findIndex(employee => employee.id === data.id);
    db.employees = db.employees.filter(employee => employee.id !== data.id);
    db.employees.splice(index, 0, data);
}

function addEmployee(data) {
    data.id = (Math.random()*1000).toString();
    db.employees.push(data);
}

function addPendingReview(data) {
    if (!db.reviews.pending.find(review => review.to === data.to && review.from === data.from)) {
        db.reviews.pending.push(data);
    }
}

function updatePendingReview(data) {
    const index = db.reviews.pending.findIndex(review => review.to === data.to && review.from === data.from);
    db.reviews.pending = db.employees.filter(review => review.to === data.to && review.from === data.from);
    db.reviews.pending.splice(index, 0, data);
}
function addSubmittedReview(data) {
    db.reviews.submitted.push(data);
    db.reviews.pending = db.reviews.pending.filter(review => (review.from !== data.from && review.to !== data.to));
}

server.use(middlewares);
server.use(router);
server.listen(port);