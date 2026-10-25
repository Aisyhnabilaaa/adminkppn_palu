// Alamat backend. Bisa diganti lewat VITE_API_URL tanpa mengubah kode.
export const API_URL =
  import.meta.env.VITE_API_URL || 'https://charttkd-production.up.railway.app'

// Nama daerah persis seperti yang disimpan backend untuk data TKD
export const DAERAH_TKD = [
  'Sulawesi Tengah',
  'Kota Palu',
  'Parigi Moutong',
  'Kabupaten Sigi',
  'Kabupaten Donggala',
]

// Nama daerah untuk data alokasi (penamaannya berbeda dengan data TKD)
export const DAERAH_ALOKASI = [
  'Provinsi Sulawesi Tengah',
  'Kota Palu',
  'Kabupaten Sigi',
  'Kabupaten Donggala',
  'Kabupaten Parigi Moutong',
]
