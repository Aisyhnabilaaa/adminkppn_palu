// LoginForm.jsx
import React, { useState } from 'react';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [kode, setKode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, kode }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      onLogin(); // misalnya redirect ke dashboard
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Admin" />
      <input value={kode} onChange={e => setKode(e.target.value)} placeholder="Kode Verifikasi" />
      <button type="submit">Login</button>
    </form>
  );
}
