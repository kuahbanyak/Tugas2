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
        pengirimanList: [
            {kode: "REG", nama: "JNE Regular"},
            {kode: "EXP", nama: "JNE Express"}
        ],
        paket: [
            {
                kode: "PAKET-UT-001",
                nama: "PAKET IPS Dasar",
                isi: ["EKMA4116", "EKMA4115"],
                harga: 120000
            },
            {
                kode: "PAKET-UT-002",
                nama: "PAKET IPA Dasar",
                isi: ["BIOL4201", "FISIP4001"],
                harga: 140000
            },
            {
                kode: "PAKET-UT-003",
                nama: "PAKET PGSD Semester 1",
                isi: ["PDGK4101", "MKDU4110"],
                harga: 115000
            },
            {
                kode: "PAKET-UT-004",
                nama: "PAKET Hukum Dasar",
                isi: ["HKUM4101"],
                harga: 75000
            }
        ],
        tracking: {
            "DO2025-0001": {
                nim: "123456789",
                nama: "Rina Wulandari",
                status: "Dalam Perjalanan",
                ekspedisi: "JNE Regular",
                tanggalKirim: "2025-08-25",
                paket: "PAKET-UT-001",
                total: 120000,
                perjalanan: [
                    {
                        waktu: "2025-08-25 10:12:20",
                        keterangan: "Penerimaan di Loket: TANGSEL"
                    },
                    {
                        waktu: "2025-08-25 14:07:56",
                        keterangan: "Tiba di Hub: JAKSEL"
                    },
                    {
                        waktu: "2025-08-26 08:44:01",
                        keterangan: "Diteruskan ke Kantor Tujuan"
                    }
                ]
            },
            "DO2025-0002": {
                nim: "987654321",
                nama: "Ahmad Hidayat",
                status: "Terkirim",
                ekspedisi: "JNE Express",
                tanggalKirim: "2025-08-20",
                paket: "PAKET-UT-003",
                total: 115000,
                perjalanan: [
                    {
                        waktu: "2025-08-20 09:30:15",
                        keterangan: "Penerimaan di Loket: BANDUNG"
                    },
                    {
                        waktu: "2025-08-20 15:45:30",
                        keterangan: "Dalam proses sortir"
                    },
                    {
                        waktu: "2025-08-21 08:20:10",
                        keterangan: "Paket dalam perjalanan"
                    },
                    {
                        waktu: "2025-08-21 16:35:00",
                        keterangan: "Paket telah diterima oleh: Ahmad Hidayat"
                    }
                ]
            }
        },
        // Form DO Baru
        formDO: {
            nim: '',
            nama: '',
            ekspedisi: '',
            paketKode: '',
            tanggalKirim: ''
        },
        errorsDO: {},
        paketTerpilih: null
    },
    computed: {
        // Generate nomor DO baru otomatis
        nomorDOBaru() {
            const tahun = new Date().getFullYear();
            const doKeys = Object.keys(this.tracking);

            if (doKeys.length === 0) {
                return `DO${tahun}-0001`;
            }

            // Ambil nomor terakhir
            const lastDO = doKeys[doKeys.length - 1];
            const lastNum = parseInt(lastDO.split('-')[1]);
            const newNum = (lastNum + 1).toString().padStart(4, '0');

            return `DO${tahun}-${newNum}`;
        },

        // Total harga dari paket yang dipilih
        totalHarga() {
            if (this.paketTerpilih) {
                return this.paketTerpilih.harga;
            }
            return 0;
        }
    },
    methods: {
        // Update detail paket ketika dipilih
        updateDetailPaket() {
            if (this.formDO.paketKode) {
                this.paketTerpilih = this.paket.find(p => p.kode === this.formDO.paketKode);
            } else {
                this.paketTerpilih = null;
            }
        },

        // Validasi form DO
        validateFormDO() {
            this.errorsDO = {};
            let valid = true;

            if (!this.formDO.nim || this.formDO.nim.trim() === '') {
                this.errorsDO.nim = 'NIM harus diisi';
                valid = false;
            } else if (!/^\d+$/.test(this.formDO.nim)) {
                this.errorsDO.nim = 'NIM harus berupa angka';
                valid = false;
            }

            if (!this.formDO.nama || this.formDO.nama.trim() === '') {
                this.errorsDO.nama = 'Nama harus diisi';
                valid = false;
            }

            if (!this.formDO.ekspedisi) {
                this.errorsDO.ekspedisi = 'Ekspedisi harus dipilih';
                valid = false;
            }

            if (!this.formDO.paketKode) {
                this.errorsDO.paketKode = 'Paket harus dipilih';
                valid = false;
            }

            if (!this.formDO.tanggalKirim) {
                this.errorsDO.tanggalKirim = 'Tanggal kirim harus diisi';
                valid = false;
            }

            return valid;
        },

        // Buat DO baru
        buatDOBaru() {
            if (this.validateFormDO()) {
                const nomorDO = this.nomorDOBaru;
                const now = new Date();
                const waktuSekarang = now.getFullYear() + '-' +
                    String(now.getMonth() + 1).padStart(2, '0') + '-' +
                    String(now.getDate()).padStart(2, '0') + ' ' +
                    String(now.getHours()).padStart(2, '0') + ':' +
                    String(now.getMinutes()).padStart(2, '0') + ':' +
                    String(now.getSeconds()).padStart(2, '0');

                // Tambah tracking baru
                this.$set(this.tracking, nomorDO, {
                    nim: this.formDO.nim,
                    nama: this.formDO.nama,
                    status: "Dalam Proses",
                    ekspedisi: this.formDO.ekspedisi,
                    tanggalKirim: this.formDO.tanggalKirim,
                    paket: this.formDO.paketKode,
                    total: this.totalHarga,
                    perjalanan: [
                        {
                            waktu: waktuSekarang,
                            keterangan: "DO berhasil dibuat"
                        }
                    ]
                });

                alert(`Delivery Order ${nomorDO} berhasil dibuat!`);
                this.resetFormDO();
            }
        },

        // Reset form DO
        resetFormDO() {
            this.formDO = {
                nim: '',
                nama: '',
                ekspedisi: '',
                paketKode: '',
                tanggalKirim: ''
            };
            this.paketTerpilih = null;
            this.errorsDO = {};
        },

        // Get status class untuk badge
        getStatusClass(status) {
            const statusLower = status.toLowerCase();
            if (statusLower.includes('proses')) {
                return 'proses';
            } else if (statusLower.includes('perjalanan')) {
                return 'perjalanan';
            } else if (statusLower.includes('terkirim') || statusLower.includes('selesai')) {
                return 'selesai';
            } else {
                return 'default';
            }
        },

        // Format rupiah
        formatRupiah(angka) {
            return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    },
    mounted() {
        // Set tanggal hari ini sebagai default
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        this.formDO.tanggalKirim = `${yyyy}-${mm}-${dd}`;
    }
});

