import { useState, useEffect } from 'react'

import FormInputTKD from './FormInputTKD'
import TablePage from './TablePage'
import AlokasiPage from './AlokasiPage'

const AdminDashboard = () => {
  const [email, setEmail] = useState('')
  const [kode, setKode] = useState('')
  const [hasAccess, setHasAccess] = useState(false)
  const [activeTab, setActiveTab] = useState('form')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage('') // reset pesan

    try {
      const res = await fetch('http://localhost:3000/admin/login', {
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

  useEffect(() => {
    const access = localStorage.getItem('hasAccess');
    console.log('Access from localStorage:', access); // Log status yang diambil
    if (access === 'true') {
      setHasAccess(true);
    }
  }, []);



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
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-md font-semibold ${activeTab === 'form' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
            >
              Input Data TKD
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-4 py-2 rounded-md font-semibold ${activeTab === 'table' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
            >
              Tabel TKD
            </button>
            <button
              onClick={() => setActiveTab('alokasi')}
              className={`px-4 py-2 rounded-md font-semibold ${activeTab === 'alokasi' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
            >
              Input Data Alokasi
            </button>
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
          {activeTab === 'form' && <FormInputTKD hideAccessCheck={true} />}
          {activeTab === 'table' && <TablePage hideAccessCheck={true} />}
          {activeTab === 'alokasi' && <AlokasiPage />}

        </div>
      )}
    </div>
  )
}

export default AdminDashboard
