const API = {
  baseUrl: 'https://localhost:59111/api/', // backend URL (adjust if your backend runs on a different port)

  async post(path, body) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const text = await res.text(); // 👈 read raw response

    let data = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('Invalid JSON from server:', text);
        throw new Error('Server returned invalid JSON');
      }
    }

    if (!res.ok) {
      // Pass backend error message to frontend
      throw data;
    }

    return data;
  },

  async get(path) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      credentials: 'include',
    });

    const text = await res.text();

    let data = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('Invalid JSON from server:', text);
        throw new Error('Server returned invalid JSON');
      }
    }

    if (!res.ok) {
      throw data;
    }

    return data;
  }
};

export default API;
