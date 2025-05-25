import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TabelAlokasi from './TableAlokasi'; // pastikan path benar

const AlokasiPage = () => {
  const currentYear = new Date().getFullYear();
  const [tahun, setTahun] = useState(String(currentYear));
  const [data, setData] = useState([]);
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

  const yearOptions = Array.from({ length: 5 }, (_, i) => String(currentYear - 3 + i));

  const parseNumber = (value) => {
    if (typeof value !== 'string') return value;
    const clean = value.replace(/,/g, '.');
    const parsed = parseFloat(clean);
    return isNaN(parsed) ? 0 : parsed;
  };

  const fetchChart = async (year) => {
    try {
      const res = await axios.get(`https://charttkd-production.up.railway.app/api/alokasi/grafik?tahun=${year}`, {
        headers: { 'x-api-key': import.meta.env.VITE_ADMIN_API_KEY }
      });

      const order = [
        "Provinsi Sulawesi Tengah",
        "Kota Palu",
        "Kabupaten Sigi",
        "Kabupaten Donggala",
        "Kabupaten Parigi Moutong"
      ];

      const parsedData = res.data.map(item => ({
        ...item,
        dbh: parseNumber(item.dbh),
        dau: parseNumber(item.dau),
        dakFisik: parseNumber(item.dakFisik),
        dakNonfisik: parseNumber(item.dakNonfisik),
        danaDesa: parseNumber(item.danaDesa),
        infis: parseNumber(item.infis),
        total: parseNumber(item.total)
      })).sort((a, b) => order.indexOf(a.daerah) - order.indexOf(b.daerah));

      console.log("Response dari server:", res.data);
      console.log("Parsed data:", parsedData);

      setData(parsedData);
    } catch (err) {
      console.error('Gagal ambil data chart', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://charttkd-production.up.railway.app/api/alokasi/create',
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
      fetchChart(tahun);
    } catch (err) {
      console.error('Gagal mengirim data', err);
      alert('Gagal mengirim data');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`https://charttkd-production.up.railway.app/api/alokasi/${id}`, {
        headers: {
          'x-api-key': import.meta.env.ADMIN_API_KEY
        }        
      });
      alert("Data berhasil dihapus.");
      // Update state setelah delete berhasil
    } catch (error) {
      console.error("Gagal menghapus data", error);
      alert("Gagal menghapus data.");
    }
  };
  

  useEffect(() => {
    console.log("Fetching data untuk tahun:", tahun);
    fetchChart(tahun);
  }, [tahun]);


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
        <option value="Provinsi Sulawesi Tengah">Provinsi Sulawesi Tengah</option>
        <option value="Kota Palu">Kota Palu</option>
        <option value="Kabupaten Sigi">Kabupaten Sigi</option>
        <option value="Kabupaten Donggala">Kabupaten Donggala</option>
        <option value="Kabupaten Parigi Moutong">Kabupaten Parigi Moutong</option>
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

        {/* ✅ Ini seharusnya bagian yang muncul */}
        <TabelAlokasi data={data} onDelete={handleDelete} />

      </div>
    </div>
  );
};

export default AlokasiPage;
