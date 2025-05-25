import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TabelAlokasi = ({ }) => {

    const [data, setData] = useState([]);
    const [tahun, setTahun] = useState(new Date().getFullYear());

    const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/alokasi/grafik?tahun=${tahun}`);
          console.log(res.data); // hanya untuk debug
          setData(res.data); // ini penting
        } catch (error) {
          console.error("Gagal mengambil data:", error);
          setData([]); // kosongkan data jika terjadi error
        }
      };
      
      
      

      useEffect(() => {
        console.log("Fetching data untuk tahun:", tahun);
        fetchData(); // hapus parameter
    }, [tahun]);
    

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3000/api/alokasi/${id}`, {
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



    return (
        <div className="overflow-x-auto p-4">
            <div className="mb-4">
                <label htmlFor="tahun" className="block mb-1 font-semibold">Pilih Tahun:</label>
                <input
                    id="tahun"
                    type="number"
                    value={tahun}
                    onChange={(e) => setTahun(e.target.value)}
                    placeholder="Tahun"
                    className="p-2 border rounded-md w-40"
                />
            </div>

            <h2 className="text-xl font-bold mb-4">Data Alokasi TKD</h2>
            <table className="min-w-full border text-sm text-left text-gray-500 shadow-md rounded-xl">
                <thead className="bg-blue-100 text-gray-700 text-xs uppercase">
                    <tr>
                        <th className="px-4 py-3">No</th>
                        <th className="px-4 py-3">Daerah</th>
                        <th className="px-4 py-3">DBH</th>
                        <th className="px-4 py-3">DAU</th>
                        <th className="px-4 py-3">DAK FISIK</th>
                        <th className="px-4 py-3">DAK NONFISIK</th>
                        <th className="px-4 py-3">DANA DESA</th>
                        <th className="px-4 py-3">INFIS</th>
                        <th className="px-4 py-3">TOTAL</th>
                        <th className="px-4 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="10" className="text-center py-4">Tidak ada data.</td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{item.daerah}</td>
                                <td className="px-4 py-2">{item.dbh}</td>
                                <td className="px-4 py-2">{item.dau}</td>
                                <td className="px-4 py-2">{item.dakFisik}</td>
                                <td className="px-4 py-2">{item.dakNonfisik}</td>
                                <td className="px-4 py-2">{item.danaDesa}</td>
                                <td className="px-4 py-2">{item.infis}</td>
                                <td className="px-4 py-2 font-semibold">{item.total}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Hapus
                                    </button>

                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TabelAlokasi;
