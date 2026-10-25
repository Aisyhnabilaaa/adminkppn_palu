import { useState } from 'react'

import { API_URL } from '../config'
import FormInputTKD from './FormInputTKD'
import TablePage from './TablePage'
import AlokasiPage from './AlokasiPage'

const TABS = [
  { id: 'form', label: 'Input Data TKD' },
  { id: 'table', label: 'Tabel TKD' },
  { id: 'alokasi', label: 'Input Data Alokasi' },
]

const AdminDashboard = () => {
  const [email, setEmail] = useState('')
  const [kode, setKode] = useState('')
  const [hasAccess, setHasAccess] = useState(
    () => localStorage.getItem('hasAccess') === 'true'
  )
  const [activeTab, setActiveTab] = useState('form')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage('') // reset pesan

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, kode }),
      });

      const data = await res.json();
      if (res.ok) {
        setHasAccess(true); // Set akses
        localStorage.setItem('hasAccess', 'true'); // Simpan di localStorage
        setMessage(''); // Kosongkan pesan
      } else {
        setMessage(data.message || 'Login gagal!');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Terjadi kesalahan saat login.');
    }
  }

  const handleLogout = () => {
    setHasAccess(false);
    localStorage.removeItem('hasAccess'); // Hapus akses dari localStorage
    // Tambahkan logika tambahan jika perlu, seperti mereset state lainnya
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {!hasAccess ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-center mb-4">Login Admin</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email Admin"
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
            <input
              type="password"
              value={kode}
              onChange={e => setKode(e.target.value)}
              placeholder="Kode Verifikasi"
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Masuk
            </button>
            {message && <p className="text-red-600 text-center">{message}</p>}
          </form>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Navbar/Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md font-semibold ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-white border'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tombol Logout */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          {/* Halaman Aktif */}
          {activeTab === 'form' && <FormInputTKD hideAccessCheck />}
          {activeTab === 'table' && <TablePage hideAccessCheck />}
          {activeTab === 'alokasi' && <AlokasiPage />}

        </div>
      )}
    </div>
  )
}

export default AdminDashboard
