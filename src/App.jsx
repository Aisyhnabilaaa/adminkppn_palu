// App.jsx
import { Routes, Route } from "react-router-dom"

import AdminDashboard from "./page/AdminDashboard"
import AlokasiPage from "./page/AlokasiPage"
import FormInputTKD from "./page/FormInputTKD"
import AdminTKDTable from "./page/TablePage"
import TabelAlokasi from "./page/TableAlokasi"

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/tabel" element={<AdminTKDTable />} />
      <Route path="/form" element={<FormInputTKD />} />
      <Route path="/alokasi" element={<AlokasiPage />} />
      <Route path="/tabelalokasi" element={<TabelAlokasi />} />

    </Routes>
  )
}

export default App
