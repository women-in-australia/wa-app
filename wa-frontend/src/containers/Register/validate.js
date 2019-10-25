const validate = (form, field, value) => {
  let validateStatus = 'success';
  let help = '';

  if (field === 'email') {
    const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    if (!regexp.test(value)) {
      validateStatus = 'error';
      help = 'Please enter a valid email.';
    }
  } else if (field === 'password') {
    if (value.length < 6) {
      validateStatus = 'error';
      help = 'Your password is too short.';
    }
  } else if (field === 'confirm') {
    if (value !== form.password.value) {
      validateStatus = 'error';
      help = 'Please confirm your password.';
    }
  } else if (field === 'name') {
    if (value.length === 0) {
      validateStatus = 'error';
      help = 'Please enter your full name.';
    }
  } else if (field === 'phoneNumber') {
    const regexp = /^[- \d]+$/;
    if (value.length === 0) {
      validateStatus = 'error';
      help = 'Please enter your phone number.';
    } else if (!regexp.test(value)) {
      validateStatus = 'error';
      help = 'Please enter a valid phone number.';
    }
  } else if (field === 'address') {
    if (value.length === 0) {
      validateStatus = 'error';
      help = 'Please enter your address.';
    }
  }

  return { validateStatus, help };
};

export default validate;