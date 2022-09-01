export const jwtKey = "jwt";
export const userKey = "user";

export function saveJwt(value) {
  saveToStorage(jwtKey, value);
}

export function getJwt() {
  return getFromStorage(jwtKey);
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function getUsername() {
  const user = getFromStorage(userKey);

  if (user) {
    return user.username;
  }

  return null;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
}
