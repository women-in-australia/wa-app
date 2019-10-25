export const roleToString = (role) => {
  if (!role) return '';

  const { rid } = role;
  
  if (rid === 1) return 'Contributor';
  else if (rid === 2) return 'Curator';
  else if (rid === 3) return 'Manager';

  return '';
};

export const capitalize = (string) => {
  return string && string[0].toUpperCase() + string.slice(1);
};

export const retrieveUserData = () => {
  const { token, userData } = JSON.parse(window.localStorage.getItem('userData')) || {};
  return { token, userData };
};

export const storeUserData = (data) => {
  window.localStorage.setItem('userData', JSON.stringify(data));
  return data;
};

export const clearUserData = () => {
  window.localStorage.removeItem('userData');
};