const API_URL = 'http://localhost:8080/api/auth';

export async function register(data) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    return { error: 'Network error' };
  }
}

export async function login(data) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    return { error: 'Network error' };
  }
}
