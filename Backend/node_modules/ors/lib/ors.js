/**
* @name OnlineRegistration
* @param {Object} classData
**/
function OnlineRegistration(classData) {
  this.classData = classData;
}

/**
* @name getTotalReservedSeats
* @paraam {Array} reservations
* @returns {Number} totalSum
**/
OnlineRegistration.prototype.getTotalReservedSeats = function(reservations = []) {
  let totalSum = 0;
  if (reservations.length === 0) {
    return getSumOfReservationCapacity(this.classData.reservations);
  } else {
    return getSumOfReservationCapacity(reservations);
  }


  function getSumOfReservationCapacity(reservations) {
    reservations.forEach((reservation) => {
      if (reservation.hasOwnProperty('reservationCapacity')) {
        totalSum += reservation.reservationCapacity;
      }
    });
    return totalSum;
  }
}

OnlineRegistration.prototype.getEnabledReservedSeats = function() {
  const currentDate = new Date(this.classData.currentEnrollment.effectiveDate);
  const enabledReservations = this.classData.reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.effectiveStartDate);
    return reservationDate <= currentDate;
  });
  return this.getTotalReservedSeats(enabledReservations);
}

OnlineRegistration.prototype.getReservedSeatsAvailable = function() {
  const totalSumOfReservedSeats = this.getEnabledReservedSeats();
  return totalSumOfReservedSeats - this.classData.currentEnrollment.reservedSeatsEnrolled;
}

OnlineRegistration.prototype.getTotalOpenSeats = function() {
  return this.classData.enrollmentCapacity - this.getTotalReservedSeats(this.classData.reservations);
}

OnlineRegistration.prototype.getOpenSeatsAvailable = function() {
  return this.getTotalOpenSeats() - this.classData.currentEnrollment.openSeatsEnrolled;
}

OnlineRegistration.prototype.showCourseEnrollment = function(classData) {
  const reservedSeatsAvailable = this.getReservedSeatsAvailable();
  const openSeatsAvailable = this.getOpenSeatsAvailable();
  return { reservedSeatsAvailable, openSeatsAvailable };
}



module.exports = OnlineRegistration;