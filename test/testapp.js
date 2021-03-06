/* you'll want to sudo npm install -g mocha  then just run mocha */

var request = require('supertest');
var app = require('../app.js');

describe('GET /', function() {
    it('should return 200 OK', function(done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
});

describe('GET /test.html', function() {
    it('should return 200 OK', function(done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
});
describe('GET /random-url', function() {
    it('should return 404', function(done) {
        request(app)
            .get('/garbage')
            .expect(404, done);
    });
});