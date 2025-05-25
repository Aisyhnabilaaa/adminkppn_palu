// GantiKodeForm.jsx
import React, { useState } from 'react';

export default function GantiKodeForm() {
  const [email, setEmail] = useState('bendumkppn@gmail.com');
  const [kodeLama, setKodeLama] = useState('');
  const [kodeBaru, setKodeBaru] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:9000/api/admin/ubah-kode', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, kodeLama, kodeBaru }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input value={email} readOnly />
      <input value={kodeLama} onChange={e => setKodeLama(e.target.value)} placeholder="Kode Lama" />
      <input value={kodeBaru} onChange={e => setKodeBaru(e.target.value)} placeholder="Kode Baru" />
      <button type="submit">Ubah Kode</button>
    </form>
  );
}
