import React from 'react';
import Swal from 'sweetalert2';

const PinVerification = () => {
  Swal.fire({
    title: 'Confirm as Showroom Manager',
    input: 'password',
    inputAttributes: {
      autocapitalize: 'off',
    },
    showCancelButton: true,
    confirmButtonText: 'Verify',
    cancelButtonText: 'Cancel',
    inputValidator: (value) => {
      if (!value) {
        return 'Enter Correct PIN';
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Simulate incorrect PIN for demonstration
      const correctPin = '1234'; // Your correct PIN number
      const enteredPin = result.value;
      if (enteredPin === correctPin) {
        console.log('PIN verified:', enteredPin);
        Swal.fire({
          title: 'PIN Verified',
          icon: 'success',
          text: 'Welcome to Sales records!',
        }).then(() => {
          window.location.href = '/viewInvoice'; // Redirect to the target page
        });
      } else {
        Swal.fire({
          title: 'Incorrect PIN',
          icon: 'error',
          text: 'The entered PIN is incorrect. Please try again.',
        }).then(() => {
          window.location.href = '/Dashboard'; // Redirect to the Dashboard
        });
      }
    }
  });
};

export default PinVerification;
