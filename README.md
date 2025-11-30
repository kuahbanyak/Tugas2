# Tugas Praktik 2 - Sistem Pemesanan Bahan Ajar UT
## Aplikasi Berbasis Vue.js

### 📋 Deskripsi Proyek
Aplikasi website sederhana untuk pemesanan dan pengelolaan Bahan Ajar di Universitas Terbuka menggunakan Vue.js framework.

### 🗂️ Struktur Proyek
```
/Tugas2/
├── index.html              ← Halaman utama dengan navigasi menu
├── stok.html               ← Halaman 1: Stok Bahan Ajar (WAJIB)
├── tracking.html           ← Halaman 2: Tracking DO (WAJIB)
├── dataBahanAjar.js        ← File dummy data (template/referensi)
├── css/
│   └── style.css           ← Styling untuk semua halaman
└── js/
    ├── stok-app.js         ← Logika Vue untuk stok.html
    └── tracking-app.js     ← Logika Vue untuk tracking.html
```

### 🚀 Cara Menjalankan Aplikasi

1. **Buka file `index.html`** di browser (Chrome, Firefox, Edge, dll.)
2. Pilih menu yang ingin diakses:
   - **Stok Bahan Ajar** - Untuk mengelola stok
   - **Tracking DO** - Untuk melacak pengiriman

### ✨ Fitur-Fitur Implementasi

#### 1. Halaman Stok Bahan Ajar (`stok.html`)

**Fitur Utama:**
- ✅ **Tampilan Daftar Stok** dalam bentuk tabel dengan kolom:
  - Kode MK / Nama MK
  - Kategori Mata Kuliah
  - UT-Daerah
  - Lokasi Rak
  - Jumlah Stok
  - Safety Stock
  - Status (Aman/Menipis/Kosong)
  - Catatan (HTML)
  - Aksi (Edit)

- ✅ **Filter Data:**
  - Filter berdasarkan UT-Daerah (dropdown)
  - Filter berdasarkan Kategori (dependent - muncul setelah pilih UT-Daerah)
  - Filter Stok Menipis (checkbox) - menampilkan qty < safety
  - Filter Stok Kosong (checkbox) - menampilkan qty = 0
  - Tombol Reset Filter

- ✅ **Sort Data:**
  - Sort berdasarkan Judul (A-Z / Z-A)
  - Sort berdasarkan Stok (Rendah-Tinggi / Tinggi-Rendah)
  - Sort berdasarkan Harga (Rendah-Tinggi / Tinggi-Rendah)

- ✅ **Status Visual:**
  - 🟢 **Aman** (hijau) - stok >= safety stock
  - 🟠 **Menipis** (orange) - stok < safety stock
  - 🔴 **Kosong** (merah) - stok = 0

- ✅ **Edit Stok:**
  - Dapat mengedit qty dan safety stock
  - Tombol Save dan Cancel untuk konfirmasi

- ✅ **Tambah Bahan Ajar Baru:**
  - Form lengkap dengan validasi
  - Validasi duplikasi kode MK
  - Validasi semua field required
  - Reset form setelah submit

- ✅ **Vue.js Computed Property:**
  - Filter menggunakan computed property (tidak recompute setiap kali)
  - Dependent options (kategori muncul setelah pilih UT-Daerah)

#### 2. Halaman Tracking Delivery Order (`tracking.html`)

**Fitur Utama:**
- ✅ **Form Input DO Baru:**
  - Nomor DO auto-generate (format: DO{tahun}-{sequence})
    - Contoh: DO2025-0001, DO2025-0002, dst.
  - NIM (input manual, validasi angka)
  - Nama (input manual)
  - Ekspedisi (dropdown: JNE Regular/Express)
  - Paket Bahan Ajar (dropdown)
  - Detail paket muncul otomatis setelah memilih
  - Tanggal Kirim (default hari ini, bisa diubah)
  - Total Harga (otomatis dari paket)

- ✅ **Tampilan Daftar DO:**
  - Card-based layout untuk setiap DO
  - Status badge dengan warna berbeda
  - Informasi lengkap: NIM, Nama, Ekspedisi, Paket, Tanggal, Total
  - Timeline perjalanan paket (jika ada)

- ✅ **Timeline Tracking:**
  - Visual timeline dengan marker
  - Menampilkan waktu dan keterangan setiap step

### 🔧 Teknologi yang Digunakan

- **Vue.js 2.6.14** (CDN) - Framework JavaScript
- **HTML5** - Struktur halaman
- **CSS3** - Styling dan animasi
- **Vanilla JavaScript** - Logic tambahan

### 📊 Data Dummy

Data disimpan dalam variabel `data` di setiap file Vue app:
- **stok-app.js**: Data stok bahan ajar
- **tracking-app.js**: Data tracking DO


