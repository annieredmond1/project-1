var request = require('request'),
    expect = require('chai').expect;


    describe('project-1 homepage', function() {
      it('should have a HTTP of 200 - success', function(done) {
        request('https://aqueous-journey-5377.herokuapp.com/', function(err, res, body) {
          expect(res.statusCode).to.equal(200);
          // expect(res.statusCode).to.equal(300);
          done();
        });
      });
    });