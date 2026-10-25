import { useState } from 'react';
import axios from 'axios';
import TabelAlokasi from './TableAlokasi';
import { API_URL, DAERAH_ALOKASI } from '../config';

const AlokasiPage = () => {
  const currentYear = new Date().getFullYear();
  const [form, setForm] = useState({
    tahun: currentYear,
    daerah: '',
    dbh: '',
    dau: '',
    dakFisik: '',
    dakNonfisik: '',
    danaDesa: '',
    infis: ''
  });

  const parseNumber = (value) => {
    if (typeof value !== 'string') return value;
    const clean = value.replace(/,/g, '.');
    const parsed = parseFloat(clean);
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/alokasi/create`,
        {
          ...form,
          tahun: parseInt(form.tahun),
          dbh: parseNumber(form.dbh),
          dau: parseNumber(form.dau),
          dakFisik: parseNumber(form.dakFisik),
          dakNonfisik: parseNumber(form.dakNonfisik),
          danaDesa: parseNumber(form.danaDesa),
          infis: parseNumber(form.infis)
        },
        { headers: { 'x-api-key': import.meta.env.VITE_ADMIN_API_KEY } }
      );

      alert('Data berhasil dikirim');
    } catch (err) {
      console.error('Gagal mengirim data', err);
      alert('Gagal mengirim data');
    }
  };

  const labelMap = {
    tahun: 'Tahun Anggaran',
    daerah: 'Nama Daerah',
    dbh: 'Dana Bagi Hasil (DBH)',
    dau: 'Dana Alokasi Umum (DAU)',
    dakFisik: 'DAK Fisik',
    dakNonfisik: 'DAK Nonfisik',
    danaDesa: 'Dana Desa',
    infis: 'Insentif Fiskal (InFis)'
  };

  return (
    <div className="flex items-center justify-center">
      <div className="space-y-8 w-full max-w-full">
        <h1 className="text-2xl font-bold text-center">Input & Grafik Alokasi TKD</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(form).map(key => (
  <div key={key} className="flex flex-col">
    <label className="mb-1 font-medium">{labelMap[key]}</label>
    {key === 'daerah' ? (
      <select
        name="daerah"
        value={form.daerah}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      >
        <option value="">Pilih Daerah</option>
        {DAERAH_ALOKASI.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    ) : (
      <>
        <input
          type={key === 'tahun' ? 'number' : 'text'}
          step={key === 'tahun' ? undefined : 'any'}
          name={key}
          value={form[key]}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        {key !== 'tahun' && (
          <p className="text-sm text-gray-500 mt-1">
          (Contoh: 1234,56 benar) (contoh: 1,234,56 tidak valid).
          </p>
        )}
      </>
    )}
  </div>
))}


          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Simpan Data
          </button>
        </form>

        <TabelAlokasi />

      </div>
    </div>
  );
};

export default AlokasiPage;
