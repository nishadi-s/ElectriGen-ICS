const expect = require('chai').expect;
const OnlineRegistration = require('../lib/ors.js');

//Test Fixtures
const classData = {
  "enrollmentCapacity": 8,
  "reservations": [
    {
      "reservationCapacity": 4,
      "sequenceId": "1",
      "effectiveStartDate": "2017-12-01"
    },
    {
      "reservationCapacity": 1,
      "sequenceId": "2",
      "effectiveStartDate": "2017-12-08"
    },
  ],
  "currentEnrollment": {
    "effectiveDate": "2017-12-06",
    "reservedSeatsEnrolled": 1,
    "openSeatsEnrolled": 1
  }
}

const osr = new OnlineRegistration(classData);

describe('Online Registration System - Reserved Seaats', function() {
  it('should return the total sum of all reserved seats despite start date', function() {
    expect(osr.getTotalReservedSeats()).to.equal(5);
  });
  it('should return the total sum of all reserved seats that are available based on start date', function() {
    expect(osr.getEnabledReservedSeats()).to.equal(4);
  });
  it('should return the total sum of reserved seats available', function() {
    expect(osr.getReservedSeatsAvailable(classData.reservations, classData.currentEnrollment.reservedSeatsEnrolled, classData.currentEnrollment.effectiveDate)).to.equal(3);
  });
});

describe('Online Registration System - Open Seating', function() {
  it('should return the total sum of open seats within a course', function() {
    expect(osr.getTotalOpenSeats()).to.equal(3);
  });
  it('should return the total sum of open seats available', function() {
    expect(osr.getOpenSeatsAvailable(classData.enrollmentCapacity,classData.currentEnrollment.openSeatsEnrolled, classData.reservations)).to.equal(2);
  });
});

describe('Online Registration System - Course Enrollment Statistics', function() {
  it('should return an object containing the correct course enrollment statistics', function() {
    const obj = osr.showCourseEnrollment(classData);
    expect(obj.openSeatsAvailable).to.equal(2);
    expect(obj.reservedSeatsAvailable).to.equal(3);
  })
})