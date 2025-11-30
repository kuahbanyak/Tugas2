var app = new Vue({
    el: '#app',
    data: {
        upbjjList: [
            "Jakarta",
            "Surabaya",
            "Bandung",
            "Makassar",
            "Padang",
            "Denpasar",
            "Medan",
            "Semarang",
            "Yogyakarta",
            "Palembang"
        ],
        kategoriList: [
            "MK Wajib",
            "MK Pilihan",
            "Praktikum",
            "Problem-Based"
        ],
        stok: [
            {
                kode: "EKMA4116",
                judul: "Pengantar Manajemen",
                kategori: "MK Wajib",
                upbjj: "Jakarta",
                lokasiRak: "R1-A3",
                harga: 65000,
                qty: 28,
                safety: 20,
                catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
            },
            {
                kode: "EKMA4115",
                judul: "Pengantar Akuntansi",
                kategori: "MK Wajib",
                upbjj: "Jakarta",
                lokasiRak: "R1-A4",
                harga: 60000,
                qty: 7,
                safety: 15,
                catatanHTML: "<strong>Cover baru</strong>"
            },
            {
                kode: "BIOL4201",
                judul: "Biologi Umum (Praktikum)",
                kategori: "Praktikum",
                upbjj: "Surabaya",
                lokasiRak: "R3-B2",
                harga: 80000,
                qty: 12,
                safety: 10,
                catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
            },
            {
                kode: "FISIP4001",
                judul: "Dasar-Dasar Sosiologi",
                kategori: "MK Pilihan",
                upbjj: "Makassar",
                lokasiRak: "R2-C1",
                harga: 55000,
                qty: 2,
                safety: 8,
                catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
            },
            {
                kode: "PUST2131",
                judul: "Pengantar Ilmu Perpustakaan",
                kategori: "MK Pilihan",
                upbjj: "Bandung",
                lokasiRak: "R2-D5",
                harga: 45000,
                qty: 0,
                safety: 5,
                catatanHTML: "<strong style='color:red;'>URGENT: Stok habis!</strong>"
            },
            {
                kode: "PDGK4101",
                judul: "Keterampilan Berbahasa Indonesia SD",
                kategori: "MK Wajib",
                upbjj: "Padang",
                lokasiRak: "R4-A1",
                harga: 70000,
                qty: 35,
                safety: 25,
                catatanHTML: "Dilengkapi dengan <em>CD audio</em>"
            },
            {
                kode: "MKDU4110",
                judul: "Bahasa Indonesia",
                kategori: "MK Wajib",
                upbjj: "Denpasar",
                lokasiRak: "R1-B2",
                harga: 50000,
                qty: 15,
                safety: 20,
                catatanHTML: "Modul baru edisi 3"
            },
            {
                kode: "HKUM4101",
                judul: "Pengantar Hukum Indonesia",
                kategori: "MK Wajib",
                upbjj: "Medan",
                lokasiRak: "R5-C3",
                harga: 75000,
                qty: 3,
                safety: 10,
                catatanHTML: "<u>Perlu reorder</u> segera"
            }
        ],
        // Form untuk tambah bahan ajar baru
        formBaru: {
            kode: '',
            judul: '',
            kategori: '',
            upbjj: '',
            lokasiRak: '',
            harga: 0,
            qty: 0,
            safety: 0,
            catatanHTML: ''
        },
        errors: {},
        // Filter & Sort
        filter: {
            upbjj: '',
            kategori: '',
            stockMenipis: false,
            stockKosong: false
        },
        sortBy: '',
        // Edit stok
        editIndex: -1,
        editForm: {
            qty: 0,
            safety: 0
        }
    },
    computed: {
        kategoriListFiltered() {
            if (!this.filter.upbjj) {
                return [];
            }

            const kategoriSet = new Set();
            this.stok.forEach(item => {
                if (item.upbjj === this.filter.upbjj) {
                    kategoriSet.add(item.kategori);
                }
            });
            return Array.from(kategoriSet);
        },
        stokFiltered() {
            let hasil = this.stok;

            if (this.filter.upbjj) {
                hasil = hasil.filter(item => item.upbjj === this.filter.upbjj);
            }

            if (this.filter.kategori) {
                hasil = hasil.filter(item => item.kategori === this.filter.kategori);
            }


            if (this.filter.stockMenipis) {
                hasil = hasil.filter(item => item.qty < item.safety && item.qty > 0);
            }

            if (this.filter.stockKosong) {
                hasil = hasil.filter(item => item.qty === 0);
            }

            if (this.sortBy) {
                hasil = [...hasil];

                switch (this.sortBy) {
                    case 'judul':
                        hasil.sort((a, b) => a.judul.localeCompare(b.judul));
                        break;
                    case 'judul-desc':
                        hasil.sort((a, b) => b.judul.localeCompare(a.judul));
                        break;
                    case 'qty':
                        hasil.sort((a, b) => a.qty - b.qty);
                        break;
                    case 'qty-desc':
                        hasil.sort((a, b) => b.qty - a.qty);
                        break;
                    case 'harga':
                        hasil.sort((a, b) => a.harga - b.harga);
                        break;
                    case 'harga-desc':
                        hasil.sort((a, b) => b.harga - a.harga);
                        break;
                }
            }

            return hasil;
        },

        statistikStok() {
            let aman = 0;
            let menipis = 0;
            let kosong = 0;

            this.stok.forEach(item => {
                if (item.qty === 0) {
                    kosong++;
                } else if (item.qty < item.safety) {
                    menipis++;
                } else {
                    aman++;
                }
            });

            return {aman, menipis, kosong};
        }
    },
    methods: {
        validateForm() {
            this.errors = {};
            let valid = true;

            if (!this.formBaru.kode || this.formBaru.kode.trim() === '') {
                this.errors.kode = 'Kode MK harus diisi';
                valid = false;
            } else {
                // Cek duplikasi kode
                const exists = this.stok.find(item => item.kode === this.formBaru.kode);
                if (exists) {
                    this.errors.kode = 'Kode MK sudah ada';
                    valid = false;
                }
            }

            if (!this.formBaru.judul || this.formBaru.judul.trim() === '') {
                this.errors.judul = 'Judul harus diisi';
                valid = false;
            }

            if (!this.formBaru.kategori) {
                this.errors.kategori = 'Kategori harus dipilih';
                valid = false;
            }

            if (!this.formBaru.upbjj) {
                this.errors.upbjj = 'UT-Daerah harus dipilih';
                valid = false;
            }

            if (!this.formBaru.lokasiRak || this.formBaru.lokasiRak.trim() === '') {
                this.errors.lokasiRak = 'Lokasi Rak harus diisi';
                valid = false;
            }

            if (this.formBaru.harga < 0) {
                this.errors.harga = 'Harga tidak boleh negatif';
                valid = false;
            }

            if (this.formBaru.qty < 0) {
                this.errors.qty = 'Jumlah stok tidak boleh negatif';
                valid = false;
            }

            if (this.formBaru.safety < 0) {
                this.errors.safety = 'Safety stock tidak boleh negatif';
                valid = false;
            }

            return valid;
        },

        tambahBahanAjar() {
            if (this.validateForm()) {
                this.stok.push({
                    kode: this.formBaru.kode,
                    judul: this.formBaru.judul,
                    kategori: this.formBaru.kategori,
                    upbjj: this.formBaru.upbjj,
                    lokasiRak: this.formBaru.lokasiRak,
                    harga: this.formBaru.harga,
                    qty: this.formBaru.qty,
                    safety: this.formBaru.safety,
                    catatanHTML: this.formBaru.catatanHTML
                });

                alert('Bahan ajar berhasil ditambahkan!');
                this.resetForm();
            }
        },

        resetForm() {
            this.formBaru = {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                harga: 0,
                qty: 0,
                safety: 0,
                catatanHTML: ''
            };
            this.errors = {};
        },

        resetFilter() {
            this.filter = {
                upbjj: '',
                kategori: '',
                stockMenipis: false,
                stockKosong: false
            };
            this.sortBy = '';
        },

        editStok(index, item) {
            // Cari index asli di array stok
            const originalIndex = this.stok.findIndex(s => s.kode === item.kode);
            this.editIndex = originalIndex;
            this.editForm = {
                qty: item.qty,
                safety: item.safety
            };
        },

        saveEdit(displayIndex) {
            if (this.editForm.qty < 0 || this.editForm.safety < 0) {
                alert('Nilai tidak boleh negatif!');
                return;
            }

            this.stok[this.editIndex].qty = this.editForm.qty;
            this.stok[this.editIndex].safety = this.editForm.safety;
            this.cancelEdit();
            alert('Data berhasil diupdate!');
        },

        cancelEdit() {
            this.editIndex = -1;
            this.editForm = {qty: 0, safety: 0};
        },

        getStatusText(item) {
            if (item.qty === 0) {
                return 'Kosong';
            } else if (item.qty < item.safety) {
                return 'Menipis';
            } else {
                return 'Aman';
            }
        },

        getStatusIcon(item) {
            if (item.qty === 0) {
                return '🔴';
            } else if (item.qty < item.safety) {
                return '⚠️';
            } else {
                return '✅';
            }
        },

        getStatusClass(item) {
            if (item.qty === 0) {
                return 'status-kosong';
            } else if (item.qty < item.safety) {
                return 'status-menipis';
            } else {
                return 'status-aman';
            }
        },

        formatRupiah(angka) {
            return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    }
});

