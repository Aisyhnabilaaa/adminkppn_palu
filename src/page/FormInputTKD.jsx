import { useState } from 'react'
import axios from 'axios'

const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY

const FormInputTKD = ({ hideAccessCheck = false }) => {

  const [apiKeyInput, setApiKeyInput] = useState('')
  const [hasAccess, setHasAccess] = useState(false)
  const [formData, setFormData] = useState({
    jenis_tkd: '',
    semula: '',
    menjadi: '',
    pencadangan: '',
    pagu: '',
    realisasi: '',
    tahun: '',
    daerah: ''
  })
  const [message, setMessage] = useState('')

  const handleAccessSubmit = e => {
    e.preventDefault()
    if (apiKeyInput === ADMIN_API_KEY) {
      if (!hideAccessCheck) setHasAccess(true)
    } else {
      setMessage('❌ Kode akses salah!')
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:3000/tkd/create', formData, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ADMIN_API_KEY
        }
      })

      setMessage('✅ Data berhasil disimpan!')
      setFormData({
        jenis_tkd: '',
        semula: '',
        menjadi: '',
        pencadangan: '',
        pagu: '',
        realisasi: '',
        tahun: '',
        daerah: ''
      })
    } catch (error) {
      console.error('❌ Gagal kirim data:', error)
      setMessage('❌ Terjadi kesalahan saat mengirim data')
    }
  }

  return (
    <div className=''>
      {!hasAccess && !hideAccessCheck ? (
        <>
          <h2 className='text-xl font-bold mb-4 text-center'>
            Masukkan Kode Akses Admin
          </h2>
          <form onSubmit={handleAccessSubmit} className='space-y-4'>
            <input
              type='password'
              placeholder='Kode Akses'
              value={apiKeyInput}
              onChange={e => setApiKeyInput(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded-lg'
              required
            />
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700'
            >
              Masuk
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className='text-xl font-bold mb-4 text-center'>
            Form Input Data TKD
          </h2>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>

            {/* Jenis TKD */}
            <div className='flex flex-col'>
              <label htmlFor='jenis_tkd' className='mb-1 font-medium'>Jenis TKD</label>
              <Input
                id='jenis_tkd'
                name='jenis_tkd'
                value={formData.jenis_tkd}
                onChange={handleChange}
                placeholder='Jenis TKD'
              />
            </div>

            {/* Semula */}
            <div className='flex flex-col'>
              <label htmlFor='semula' className='mb-1 font-medium'>Semula</label>
              <Input
                id='semula'
                name='semula'
                value={formData.semula}
                onChange={handleChange}
                placeholder='(Rp)'
                type='number'
              />
              <p className='text-gray-400'>contoh : 12345 (tanpa koma atau titik) </p>
            </div>

            {/* Menjadi */}
            <div className='flex flex-col'>
              <label htmlFor='menjadi' className='mb-1 font-medium'>Menjadi (Rp)</label>
              <Input
                id='menjadi'
                name='menjadi'
                value={formData.menjadi}
                onChange={handleChange}
                placeholder='(Rp)'
                type='number'
              />
              <p className='text-gray-400'>contoh : 12345 (tanpa koma atau titik) </p>
            </div>

            {/* Pencadangan */}
            <div className='flex flex-col'>
              <label htmlFor='pencadangan' className='mb-1 font-medium'>Pencadangan (Rp)</label>
              <Input
                id='pencadangan'
                name='pencadangan'
                value={formData.pencadangan}
                onChange={handleChange}
                placeholder='(Rp)'
                type='number'
              />
              <p className='text-gray-400'>contoh : 12345 (tanpa koma atau titik) </p>
            </div>

            {/* Pagu */}
            <div className='flex flex-col'>
              <label htmlFor='pagu' className='mb-1 font-medium'>Pagu (Rp)</label>
              <Input
                id='pagu'
                name='pagu'
                value={formData.pagu}
                onChange={handleChange}
                placeholder='(Rp)'
                type='number'
              />
              <p className='text-gray-400'>contoh : 12345 (tanpa koma atau titik) </p>
            </div>

            {/* Realisasi */}
            <div className='flex flex-col'>
              <label htmlFor='realisasi' className='mb-1 font-medium'>Realisasi (Rp)</label>
              <Input
                id='realisasi'
                name='realisasi'
                value={formData.realisasi}
                onChange={handleChange}
                placeholder='(Rp)'
                type='number'
              />
              <p className='text-gray-400'>contoh : 12345 (tanpa koma atau titik) </p>
            </div>

            {/* Tahun */}
            <div className='flex flex-col'>
              <label htmlFor='tahun' className='mb-1 font-medium'>Tahun</label>
              <Input
                id='tahun'
                name='tahun'
                value={formData.tahun}
                onChange={handleChange}
                placeholder='Tahun'
                type='number'
              />
            </div>

            {/* Daerah */}
            <div className='md:col-span-2 flex flex-col'>
              <label htmlFor='daerah' className='mb-1 font-medium'>Daerah</label>
              <select
                id='daerah'
                name='daerah'
                value={formData.daerah}
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 rounded-lg'
                required
              >
                <option value=''>Pilih Daerah</option>
                <option value='Sulawesi Tengah'>Sulawesi Tengah</option>
                <option value='Kota Palu'>Kota Palu</option>
                <option value='Parigi Moutong'>Parigi Moutong</option>
                <option value='Kabupaten Sigi'>Kabupaten Sigi</option>
                <option value='Kabupaten Donggala'>Kabupaten Donggala</option>
              </select>
            </div>

            {/* Tombol Submit */}
            <div className='md:col-span-2'>
              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700'
              >
                Simpan Data
              </button>
            </div>

          </form>

        </>
      )}

      {message && <p className='mt-4 text-center'>{message}</p>}
    </div>
  )
}

const Input = ({ name, value, onChange, placeholder, type = 'text' }) => (
  <input
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    required
    className='w-full p-2 border border-gray-300 rounded-lg'
  />
)

export default FormInputTKD