const readline = require('readline')
const sqlite3 = require('sqlite3').verbose()
const Table = require('cli-table')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const db = new sqlite3.Database('universitas.db')


class UniversitasApp {
    startApp() {
        console.log('============================================================================================================')
        console.log('Welcome to Universitas Pendidikan Indonesia')
        console.log('Jl. Setiabudhi No. 255')
        console.log('============================================================================================================')
        this.login()
    }

    login() {
        const self = this;
        rl.question('Username: ', function (getusername) {
            const sqlUsername = `SELECT * FROM user WHERE username = ?`
            db.all(sqlUsername, [getusername], (err, username) => {
                if (err) throw err
                if (username.length > 0) {
                    rl.question('Password: ', function (getpassword) {
                        const sqlPassword = `SELECT * FROM user WHERE password = ?`
                        db.all(sqlPassword, [getpassword], (err, password) => {
                            if (err) throw err
                            if (password.length > 0) {
                                console.log(`Welcome, ${getusername}. Your access level is ${username[0].role}`)
                                self.displayMenu()
                            } else {
                                console.log('Invalid password')
                                self.login()
                            }
                        })
                    })
                } else {
                    console.log('Invalid username')
                    self.login()
                }
            })
        })
    }

    displayMenu() {
        console.log('\nSilahkan pilih opsi dibawah ini:')
        console.log('[1] Mahasiswa')
        console.log('[2] Jurusan')
        console.log('[3] Dosen')
        console.log('[4] Mata Kuliah')
        console.log('[5] Kontrak')
        console.log('[6] Keluar')
        console.log('\n============================================================================================================')

        rl.question('\nMasukkan nomor opsi yang dipilih: ', (input) => {
            const optionIndex = parseInt(input)
            switch (optionIndex) {
                case 1:
                    console.log('\n============================================================================================================')
                    this.displayMahasiswaMenu()
                    break
                case 2:
                    console.log('\n============================================================================================================')
                    this.displayJurusanMenu()
                    break
                case 3:
                    console.log('\n============================================================================================================')
                    this.displayDosenMenu()
                    break
                case 4:
                    console.log('\n============================================================================================================')
                    this.displayMataKuliahMenu()
                    break
                case 5:
                    console.log('\n============================================================================================================')
                    this.displayKontrakMenu()
                    break
                case 6:
                    console.log('\n============================================================================================================')
                    this.exitApp()
                    break
                default:
                    console.log('\n============================================================================================================')
                    console.log('Opsi yang dimasukkan tidak valid.\n')
                    this.displayMenu()
                    break
            }
        })
    }

    displayMahasiswaMenu() {
        const mahasiswaMenu = new MahasiswaMainMenu(this.displayMenu.bind(this))
        mahasiswaMenu.displayMahasiswaMenu()
    }

    displayJurusanMenu() {
        const jurusanMenu = new JurusanMainMenu(this.displayMenu.bind(this))
        jurusanMenu.displayJurusanMenu()
    }

    displayDosenMenu() {
        const dosenMenu = new DosenMainMenu(this.displayMenu.bind(this))
        dosenMenu.displayDosenMenu()
    }

    displayMataKuliahMenu() {
        const MataKuliahMenu = new MataKuliahMainMenu(this.displayMenu.bind(this))
        MataKuliahMenu.displayMataKuliahMenu()
    }

    displayKontrakMenu() {
        const KontrakMenu = new KontrakMainMenu(this.displayMenu.bind(this))
        KontrakMenu.displayKontrakMenu()
    }

    exitApp() {
        console.log('Anda kelah keluar.')
        this.startApp()
    }
}

class MahasiswaMainMenu {
    constructor(displayMenu) {
        this.displayMenu = displayMenu
    }

    displayMahasiswaMenu() {
        console.log('\n-- Menu Mahasiswa --')
        console.log('[1] Daftar Mahasiswa')
        console.log('[2] Cari Mahasiswa')
        console.log('[3] Tambah Mahasiswa')
        console.log('[4] Hapus Mahasiswa')
        console.log('[5] Kembali')
        console.log('\n============================================================================================================')

        rl.question('\nMasukkan nomor opsi yang dipilih: ', (input) => {
            const optionIndex = parseInt(input)

            switch (optionIndex) {
                case 1:
                    console.log('\n============================================================================================================')
                    this.displayDaftarMahasiswa()
                    break
                case 2:
                    console.log('\n============================================================================================================')
                    this.displayCariMahasiswa()
                    break
                case 3:
                    console.log('\n============================================================================================================')
                    this.displayTambahMahasiswa()
                    break
                case 4:
                    console.log('\n============================================================================================================')
                    this.displayHapusMahasiswa()
                    break
                case 5:
                    console.log('\n============================================================================================================')
                    this.displayMenu()
                    break
                default:
                    console.log('\n============================================================================================================')
                    console.log('Opsi yang dimasukkan tidak valid.\n')
                    this.displayMahasiswaMenu()
                    break
            }
        })
    }

    displayDaftarMahasiswa() {
        const query = `
            SELECT m.nim, m.nama_mhs, m.tgl_lahir, m.alamat_mhs, m.id_jurusan, j.nama_jurusan
            FROM mahasiswa m
            INNER JOIN jurusan j ON m.id_jurusan = j.id_jurusan
        `

        db.all(query, [], (error, rows) => {
            if (error) {
                console.error('Error executing query: ' + error.stack)
                return
            }

            console.log('Daftar Mahasiswa:')
            const table = new Table({
                head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'ID Jurusan', 'Nama Jurusan'],
                colWidths: [15, 20, 15, 30, 15, 20]
            })

            rows.forEach((row) => {
                table.push([row.nim, row.nama_mhs, row.tgl_lahir, row.alamat_mhs, row.id_jurusan, row.nama_jurusan])
            })

            console.log(table.toString())
            console.log('')

            this.displayMahasiswaMenu()
        })
    }

    displayCariMahasiswa() {
        rl.question('\nMasukkan NIM Mahasiswa yang ingin dicari: ', (nim) => {
            const query = `
        SELECT m.nim, m.nama_mhs, m.tgl_lahir, m.alamat_mhs, m.id_jurusan, j.nama_jurusan
        FROM mahasiswa m
        INNER JOIN jurusan j ON m.id_jurusan = j.id_jurusan
        WHERE m.nim = ?
      `

            db.get(query, [nim], (error, isi) => {
                if (error) {
                    console.error('Error executing query: ' + error.stack)
                    return
                }

                if (isi) {
                    console.log('\n============================================================================================================\n')
                    console.log(`Detail Mahasiswa dengan NIM : ${nim}`)
                    console.log(`NIM     : ${isi.nim}`)
                    console.log(`Nama    : ${isi.nama_mhs}`)
                    console.log(`Alamat  : ${isi.alamat_mhs}`)
                    console.log(`Jurusan : ${isi.id_jurusan}`)
                } else {
                    console.log('\n============================================================================================================\n')
                    console.log(`Mahasiswa dengan NIM ${nim}, tidak terdaftar.`)
                }

                console.log('')
                this.displayMahasiswaMenu()
            })
        })
    }

    displayTambahMahasiswa() {
        console.log('\n-- Tambah Mahasiswa --')
        rl.question('NIM: ', (nim) => {
            rl.question('Nama: ', (nama) => {
                rl.question('Tanggal Lahir (YYYY-MM-DD): ', (tglLahir) => {
                    rl.question('Alamat: ', (alamat) => {
                        //Tampilkan Kode Jurusan
                        const table = new Table({
                            head: ['ID Jurusan', 'Nama Jurusan'],
                            colWidths: [12, 30]
                        })
                        db.all('SELECT id_jurusan, nama_jurusan FROM jurusan', [], (error, rows) => {
                            if (error) {
                                console.error('Error executing query: ' + error.stack)
                                return
                            }
                            rows.forEach(row => {
                                table.push([row.id_jurusan, row.nama_jurusan])
                            })
                            console.log(table.toString())
                            console.log()

                            rl.question('Kode Jurusan: ', (idJurusan) => {
                                const query = 'INSERT INTO mahasiswa(nim, nama_mhs, tgl_lahir, alamat_mhs, id_jurusan) VALUES (?, ?, ?, ?, ?)'
                                db.run(query, [nim, nama, tglLahir, alamat, idJurusan], (error) => {
                                    if (error) {
                                        console.error('Error executing query: ' + error.stack)
                                        return
                                    }

                                    console.log('Mahasiswa berhasil ditambahkan.\n')
                                    this.displayDaftarMahasiswa()
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    displayHapusMahasiswa() {
        rl.question('\nMasukkan NIM Mahasiswa yang ingin dihapus: ', (nim) => {
            const querySelect = 'SELECT * FROM mahasiswa WHERE nim = ?'
            db.get(querySelect, [nim], (error, row) => {
                if (error) {
                    console.error('Error executing query: ' + error.stack)
                    return
                }

                if (row) {
                    const queryDelete = 'DELETE FROM mahasiswa WHERE nim = ?'
                    db.run(queryDelete, [nim], (error) => {
                        if (error) {
                            console.error('Error executing query: ' + error.stack)
                            return
                        }

                        console.log(`Data Mahasiswa ${nim}, telah dihapus\n`)
                        this.displayMahasiswaMenu()
                    })
                } else {
                    console.log('Mahasiswa dengan NIM tersebut tidak ditemukan.\n')
                    this.displayMahasiswaMenu()
                }
            })
        })
    }
}

class JurusanMainMenu {
    constructor(displayMenu) {
        this.displayMenu = displayMenu
    }

    displayJurusanMenu() {
        console.log('\n-- Menu Jurusan --')
        console.log('[1] Daftar Jurusan')
        console.log('[2] Cari Jurusan')
        console.log('[3] Tambah Jurusan')
        console.log('[4] Hapus Jurusan')
        console.log('[5] Kembali')
        console.log('\n============================================================================================================')

        rl.question('\nMasukkan nomor opsi yang dipilih: ', (input) => {
            const optionIndex = parseInt(input)

            switch (optionIndex) {
                case 1:
                    console.log('\n============================================================================================================')
                    this.tampilJurusan(() => {
                        console.log('\nJurusan Menu:')
                        this.displayJurusanMenu()
                    })
                    break
                case 2:
                    console.log('\n============================================================================================================')
                    this.displayCariJurusan()
                    break
                case 3:
                    console.log('\n============================================================================================================')
                    this.displayTambahJurusan()
                    break
                case 4:
                    console.log('\n============================================================================================================')
                    this.displayHapusJurusan()
                    break
                case 5:
                    console.log('\n============================================================================================================')
                    this.displayMenu()
                    break
                default:
                    console.log('\n============================================================================================================')
                    console.log('Opsi yang dimasukkan tidak valid.\n')
                    this.displayJurusanMenu()
                    break
            }
        })
    }

    tampilJurusan(next) {
        const query = `
            SELECT * FROM jurusan
        `

        db.all(query, [], (error, rows) => {
            if (error) {
                console.error('Error executing query: ' + error.stack)
                return
            }

            const table = new Table({
                head: ['Kode Jurusan', 'Nama Jurusan'],
                colWidths: [12, 20]
            })

            rows.forEach((row) => {
                table.push([row.id_jurusan, row.nama_jurusan])
            })

            console.log(table.toString())
            console.log('')
            next()
        })
    }

    displayDaftarJurusan() {
        console.log('\n============================================================================================================')
        this.tampilJurusan(() => {
            this.displayJurusanMenu()
        })
    }

    displayCariJurusan() {
        rl.question('\nMasukkan KODE Jurusan : ', (id_jurusan) => {
            const query = `
        SELECT * FROM jurusan
        WHERE id_jurusan = ?
      `

            db.get(query, [id_jurusan], (error, isi) => {
                if (error) {
                    console.error('Error executing query: ' + error.stack)
                    return
                }

                if (isi) {
                    console.log('\n============================================================================================================\n')
                    console.log(`Detail Jurusan dengan kode : '${id_jurusan}'`)
                    console.log(`Kode Jurusan   : ${isi.id_jurusan}`)
                    console.log(`Nama    : ${isi.nama_jurusan}`)
                } else {
                    console.log('\n============================================================================================================\n')
                    console.log(`jurusan dengan kode ${id_jurusan}, tidak terdaftar.`)
                }

                console.log('')
                this.displayJurusanMenu()
            })
        })
    }

    displayTambahJurusan() {
        console.log('\n-- Tambah Jurusan --')
        console.log('\nLengkapi data dibawah ini :')
        this.tampilJurusan(() => {
            rl.question('Kode Jurusan : ', (id_jurusan) => {
                rl.question('Nama Jurusan : ', (nama_jurusan) => {
                    const query = 'INSERT INTO jurusan(id_jurusan, nama_jurusan) VALUES (?, ?)'
                    db.run(query, [id_jurusan, nama_jurusan], (error) => {
                        if (error) {
                            console.error('Error executing query: ' + error.stack)
                            return
                        }
                        console.log('Jurusan telah ditambahkan ke database.\n')
                        this.displayJurusanMenu()
                    })
                })
            })
        })
    }


    displayHapusJurusan() {
        rl.question('\nMasukkan Kode Jurusan yang ingin dihapus: ', (id_jurusan) => {
            const querySelect = 'SELECT * FROM jurusan WHERE id_jurusan = ?'
            db.get(querySelect, [id_jurusan], (error, row) => {
                if (error) {
                    console.error('Error executing query: ' + error.stack)
                    return
                }

                if (row) {
                    const queryDelete = 'DELETE FROM jurusan WHERE id_jurusan = ?'
                    db.run(queryDelete, [id_jurusan], (error) => {
                        if (error) {
                            console.error('Error executing query: ' + error.stack)
                            return
                        }

                        console.log(`Data Jurusan ${id_jurusan}, telah dihapus\n`)
                        this.displayJurusanMenu()
                    })
                } else {
                    console.log('Kode Jurusan tersebut tidak ditemukan.\n')
                    this.displayJurusanMenu()
                }
            })
        })
    }
}

class DosenMainMenu {
    constructor(displayMenu) {
        this.displayMenu = displayMenu
    }

    displayDosenMenu() {
        console.log('\n-- Menu Dosen --')
        console.log('[1] Daftar Dosen')
        console.log('[2] Cari Dosen')
        console.log('[3] Tambah Dosen')
        console.log('[4] Hapus Dosen')
        console.log('[5] Kembali')
        console.log('\n============================================================================================================')

        rl.question('\nMasukkan nomor opsi yang dipilih: ', (input) => {
            const optionIndex = parseInt(input)

            switch (optionIndex) {
                case 1:
                    console.log('\n============================================================================================================')
                    this.displayDaftarDosen()
                    break
                case 2:
                    console.log('\n============================================================================================================')
                    this.displayCariDosen()
                    break
                case 3:
                    console.log('\n============================================================================================================')
                    this.displayTambahDosen()
                    break
                case 4:
                    console.log('\n============================================================================================================')
                    this.displayHapusDosen()
                    break
                case 5:
                    console.log('\n============================================================================================================')
                    this.displayMenu()
                    break
                default:
                    console.log('\n============================================================================================================')
                    console.log('Opsi yang dimasukkan tidak valid.\n')
                    this.displayDosenMenu()
                    break
            }
        })
    }

    displayDaftarDosen() {
        const query = `
            SELECT * FROM dosen
        `

        db.all(query, [], (error, rows) => {
            if (error) {
                console.error('Error executing query: ' + error.stack)
                return
            }

            console.log('Daftar Dosen:')
            const table = new Table({
                head: ['NIP', 'Nama Dosen'],
                colWidths: [10, 20]
            })

            rows.forEach((row) => {
                table.push([row.nip, row.nama_dosen])
            })

            console.log(table.toString())
            console.log('')

            this.displayDosenMenu()
        })
    }

    displayCariDosen() {
        rl.question('\nMasukkan KODE Jurusan : ', (nip) => {
            const query = `
        SELECT * FROM dosen
        WHERE nip = ?
      `

            db.get(query, [nip], (error, isi) => {
                if (error) {
                    console.error('Error executing query: ' + error.stack)
                    return
                }

                if (isi) {
                    console.log('\n============================================================================================================\n')
                    console.log(`Detail Dosen dengan kode : '${nip}'`)
                    console.log(`NIP Dosen  : ${isi.nip}`)
                    console.log(`Nama Dosen : ${isi.nama_dosen}`)
                } else {
                    console.log('\n============================================================================================================\n')
                    console.log(`Dosen dengan NIP ${nip}, tidak terdaftar.`)
                }

                console.log('')
                this.displayDosenMenu()
            })
        })
    }

    displayTambahDosen() {
        console.log('\n-- Tambah Dosen --')
        console.log('\nLengkapi data dibawah ini :')
        rl.question('NIP Dosen : ', (nip) => {
            rl.question('Nama Dosen : ', (nama_dosen) => {
                const query = 'INSERT INTO dosen(nip, nama_dosen) VALUES (?, ?)'
                db.run(query, [nip, nama_dosen], (error) => {
                    if (error) {
                        console.error('Error executing query: ' + error.stack)
                        return
                    }
                    console.log('Dosen telah ditambahkan ke database.\n')
                    this.displayDosenMenu()
                })
            })
        })

    }


    displayHapusDosen() {
        rl.question('\nMasukkan NIP Dosen yang ingin dihapus: ', (nip) => {
            const querySelect = 'SELECT * FROM dosen WHERE nip = ?'
            db.get(querySelect, [nip], (error, row) => {
                if (error) {
                    console.error('Error executing query: ' + error.stack)
                    return
                }

                if (row) {
                    const queryDelete = 'DELETE FROM dosen WHERE nip = ?'
                    db.run(queryDelete, [nip], (error) => {
                        if (error) {
                            console.error('Error executing query: ' + error.stack)
                            return
                        }

                        console.log(`Data Dosen ${nip}, telah dihapus\n`)
                        this.displayDosenMenu()
                    })
                } else {
                    console.log('NIP Dosen tersebut tidak ditemukan.\n')
                    this.displayDosenMenu()
                }
            })
        })
    }
}

class MataKuliahMainMenu {
    constructor(displayMenu) {
        this.displayMenu = displayMenu
    }

    displayMataKuliahMenu() {
        console.log('\n-- Menu Mata Kuliah --')
        console.log('[1] Daftar Mata Kuliah')
        console.log('[2] Cari Mata Kuliah')
        console.log('[3] Tambah Mata Kuliah')
        console.log('[4] Hapus Mata Kuliah')
        console.log('[5] Kembali')
        console.log('\n============================================================================================================')

        rl.question('\nMasukkan nomor opsi yang dipilih: ', (input) => {
            const optionIndex = parseInt(input)

            switch (optionIndex) {
                case 1:
                    console.log('\n============================================================================================================')
                    this.displayDaftarMataKuliah()
                    break
                case 2:
                    console.log('\n============================================================================================================')
                    this.displayCariMataKuliah()
                    break
                case 3:
                    console.log('\n============================================================================================================')
                    this.displayTambahMataKuliah()
                    break
                case 4:
                    console.log('\n============================================================================================================')
                    this.displayHapusMataKuliah()
                    break
                case 5:
                    console.log('\n============================================================================================================')
                    this.displayMenu()
                    break
                default:
                    console.log('\n============================================================================================================')
                    console.log('Opsi yang dimasukkan tidak valid.\n')
                    this.displayMataKuliahMenu()
                    break
            }
        })
    }

    displayDaftarMataKuliah() {
        const query = `
            SELECT * FROM matakuliah
        `

        db.all(query, [], (error, rows) => {
            if (error) {
                console.error('Error executing query: ' + error.stack)
                return
            }

            console.log('Daftar Mata Kuliah:')
            const table = new Table({
                head: ['Kode Mata Kuliah', 'Nama Mata Kuliah', 'SKS'],
                colWidths: [10, 20, 5]
            })

            rows.forEach((row) => {
                table.push([row.id_mk, row.nama_mk, row.sks])
            })

            console.log(table.toString())
            console.log('')

            this.displayMataKuliahMenu()
        })
    }

    displayCariMataKuliah() {
        rl.question('\nMasukkan KODE Mata Kuliah : ', (nip) => {
            const query = `
        SELECT * FROM matakuliah
        WHERE id_mk = ?
      `

            db.get(query, [id_mk], (error, isi) => {
                if (error) {
                    console.error('Error executing query: ' + error.stack)
                    return
                }

                if (isi) {
                    console.log('\n============================================================================================================\n')
                    console.log(`Detail Mata Kuliah dengan kode : '${id_mk}'`)
                    console.log(`Kode Mata Kuliah  : ${isi.id_mk}`)
                    console.log(`Nama Mata Kuliah : ${isi.nama_mk}`)
                    console.log(`SKS : ${isi.sks}`)
                } else {
                    console.log('\n============================================================================================================\n')
                    console.log(`MataKuliah dengan Kode ${nip}, tidak terdaftar.`)
                }

                console.log('')
                this.displayMataKuliahMenu()
            })
        })
    }

    displayTambahMataKuliah() {
        console.log('\n-- Tambah Mata Kuliah --')
        console.log('\nLengkapi data dibawah ini :')
        rl.question('Kode Mata Kuliah : ', (id_mk) => {
            rl.question('Nama Dosen : ', (nama_mk) => {
                rl.question('SKS : ', (sks) => {
                    const query = 'INSERT INTO matakuliah(id_mk, nama_mk, sks) VALUES (?, ?, ?)'
                    db.run(query, [id_mk, nama_mk, sks], (error) => {
                        if (error) {
                            console.error('Error executing query: ' + error.stack)
                            return
                        }
                        console.log('MataKuliah telah ditambahkan ke database.\n')
                        this.displayMataKuliahMenu()
                    })
                })
            })
        })
    }

    displayHapusMataKuliah() {
        rl.question('\nMasukkan Kode MataKuliah yang ingin dihapus: ', (id_mk) => {
            const querySelect = 'SELECT * FROM matakuliah WHERE id_mk = ?'
            db.get(querySelect, [id_mk], (error, row) => {
                if (error) {
                    console.error('Error executing query: ' + error.stack)
                    return
                }

                if (row) {
                    const queryDelete = 'DELETE FROM matakuliah WHERE id_mk = ?'
                    db.run(queryDelete, [id_mk], (error) => {
                        if (error) {
                            console.error('Error executing query: ' + error.stack)
                            return
                        }

                        console.log(`Data MataKuliah ${id_mk}, telah dihapus\n`)
                        this.displayMataKuliahMenu()
                    })
                } else {
                    console.log('Kode MataKuliah tersebut tidak ditemukan.\n')
                    this.displayMataKuliahMenu()
                }
            })
        })
    }
}

class KontrakMainMenu {
    constructor(displayMenu) {
        this.displayMenu = displayMenu
    }

    displayKontrakMenu() {
        console.log('\n-- Menu Kontrak --')
        console.log('[1] Daftar Kontrak')
        console.log('[2] Cari Kontrak')
        console.log('[3] Tambah Kontrak')
        console.log('[4] Hapus Kontrak')
        console.log('[5] Update Nilai')
        console.log('[6] Kembali')
        console.log('\n============================================================================================================')

        rl.question('\nMasukkan nomor opsi yang dipilih: ', (input) => {
            const optionIndex = parseInt(input)

            switch (optionIndex) {
                case 1:
                    console.log('\n============================================================================================================')
                    this.displayDaftarKontrak()
                    break
                case 2:
                    console.log('\n============================================================================================================')
                    this.displayCariKontrak()
                    break
                case 3:
                    console.log('\n============================================================================================================')
                    this.displayTambahKontrak()
                    break
                case 4:
                    console.log('\n============================================================================================================')
                    this.displayHapusKontrak()
                    break
                case 5:
                    console.log('\n============================================================================================================')
                    this.displayUpdateKontrak()
                    break
                case 6:
                    console.log('\n============================================================================================================')
                    this.displayMenu()
                    break
                default:
                    console.log('\n============================================================================================================')
                    console.log('Opsi yang dimasukkan tidak valid.\n')
                    this.displayKontrakMenu()
                    break
            }
        })
    }

    tampilKontrak(next) {
        const query = `
        SELECT kontrak.id_kontrak, mahasiswa.nim, mahasiswa.nama_mhs, matakuliah.nama_mk, dosen.nama_dosen, kontrak.nilai
        FROM kontrak 
        INNER JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
        INNER JOIN matakuliah ON kontrak.id_mk = matakuliah.id_mk
        INNER JOIN dosen ON kontrak.nip = dosen.nip
    `

        db.all(query, [], (error, rows) => {
            if (error) {
                console.error('Error executing query: ' + error.stack)
                return
            }

            const table = new Table({
                head: ['ID', 'NIM', 'Nama', 'Mata kuliah', 'Dosen', 'Nilai'],
                colWidths: [5, 20, 20, 20, 20, 14]
            })

            rows.forEach((row) => {
                const formatRow = ([row.id_kontrak || '', row.nim || '', row.nama_mhs || '', row.nama_mk || '', row.nama_dosen || '', row.nilai || ''])
                table.push(formatRow)
            })

            console.log(table.toString())
            console.log('')
            next()
        })
    }

    tampilMataKuliah(next) {
        const query = `
        SELECT * FROM matakuliah
        `
        db.all(query, [], (error, rows) => {
            if (error) {
                console.error('Error executing query: ' + error.stack)
                return
            }

            const table = new Table({
                head: ['Kode Matkul', 'Nama Matkul', 'SKS'],
                colWidths: [20, 20, 10]
            })

            rows.forEach((row) => {
                table.push([row.id_mk, row.nama_mk, row.sks])
            })

            console.log(table.toString())
            console.log('')
            next()
        })
    }

    tampilDosen(next) {
        const query = `
        SELECT * FROM dosen
        `
        db.all(query, [], (error, rows) => {
            if (error) {
                console.error('Error executing query: ' + error.stack)
                return
            }

            const table = new Table({
                head: ['NIP', 'Nama Dosen'],
                colWidths: [10, 20]
            })

            rows.forEach((row) => {
                table.push([row.nip, row.nama_dosen])
            })

            console.log(table.toString())
            console.log('')
            next()
        })
    }

    tampilMhs(nim, next) {
        const query = `
        SELECT kontrak.nim, kontrak.id_kontrak, matakuliah.nama_mk, kontrak.nilai
        FROM kontrak
        INNER JOIN matakuliah ON kontrak.id_mk = matakuliah.id_mk
        INNER JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
        WHERE mahasiswa.nim = ?
        `
        db.all(query, [nim], (error, rows) => {
            if (error) {
                console.error('Error executing query: ' + error.stack)
                return
            }

            const table = new Table({
                head: ['ID', 'Mata Kuliah', 'Nilai'],
                colWidths: [10, 20, 10]
            })

            rows.forEach((row) => {
                // table.push([row.id_kontrak, row.nama_mk, row.nilai])
                const tes = ([row.id_kontrak, row.nama_mk, row.nilai || ''])
                table.push(tes)
            })

            console.log(table.toString())
            console.log('')
            next()
        })
    }

    displayDaftarKontrak() {
        this.tampilKontrak(() => {
            this.displayKontrakMenu()
        })
    }

    displayCariKontrak() {
        this.tampilKontrak(() => {
            rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
                const query = `
                SELECT * FROM kontrak
                WHERE nim = ?
            `;
                db.all(query, [nim], (error, rows) => {
                    if (error) {
                        console.error('Error executing query: ' + error.stack);
                        return;
                    }

                    if (rows.length > 0) {
                        const table = new Table({
                            head: ['ID', 'NIM', 'Kode Mata kuliah', 'NIP', 'Nilai'],
                            colWidths: [5, 20, 20, 20, 10]
                        });

                        rows.forEach((row) => {
                            const rowData = [row.id_kontrak, row.nim, row.id_mk, row.nip, row.nilai || ''];
                            table.push(rowData);
                        });

                        console.log(table.toString());
                        console.log('');

                        this.displayKontrakMenu();
                    } else {
                        console.log('\n============================================================================================================\n');
                        console.log(`Mahasiswa dengan nim ${nim}, tidak terdaftar.`);
                        this.displayKontrakMenu()
                    }
                })
            })
        })
    }


    displayTambahKontrak() {
        console.log('\n-- Tambah Kontrak --')
        console.log('\nLengkapi data dibawah ini :')
        this.tampilKontrak(() => {
            rl.question('Masukan NIM : ', (nim) => {
                this.tampilMataKuliah(() => {
                    rl.question('Masukan Kode Matakuliah : ', (id_mk) => {
                        this.tampilDosen(() => {
                            rl.question('masukan NIP dosen : ', (nip) => {
                                const query = 'INSERT INTO kontrak(nim, id_mk, nip) VALUES (?, ?, ?)'
                                db.run(query, [nim, id_mk, nip], (error) => {
                                    if (error) {
                                        console.error('Error executing query: ' + error.stack)
                                        return
                                    }
                                    this.tampilKontrak(() => {
                                        console.log('Kontrak telah ditambahkan.\n')
                                        this.displayKontrakMenu()
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    displayHapusKontrak() {
        rl.question('\nMasukkan ID Kontrak yang ingin dihapus: ', (id_kontrak) => {
            const querySelect = 'SELECT * FROM kontrak WHERE id_kontrak = ?'
            db.get(querySelect, [id_kontrak], (error, row) => {
                if (error) {
                    console.error('Error executing query: ' + error.stack)
                    return
                }

                if (row) {
                    const queryDelete = 'DELETE FROM kontrak WHERE id_kontrak = ?'
                    db.run(queryDelete, [id_kontrak], (error) => {
                        if (error) {
                            console.error('Error executing query: ' + error.stack)
                            return
                        }

                        console.log(`Data kontrak dengan ID ${id_kontrak}, telah dihapus\n`)
                        console.log('\n============================================================================================================\n')
                        this.displayKontrakMenu()
                    })
                } else {
                    console.log('Kode Kontrak tersebut tidak ditemukan.\n')
                    this.displayKontrakMenu()
                }
            })
        })
    }
    displayUpdateKontrak() {
        console.log('\n-- Update Nilai Kontrak --')
        this.tampilKontrak(() => {
            rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
                console.log('\n============================================================================================================\n')
                console.log(`Detai mahasiswa dengan nim '${nim}' :`)
                this.tampilMhs(nim, () => {
                    rl.question('Masukkan ID yang ingin dirubah nilainya : ', (id_kontrak) => {
                        rl.question('Tulis Nilai Baru : ', (nilai) => {
                            const query = 'UPDATE kontrak SET nilai = ? WHERE id_kontrak = ?'
                            db.run(query, [nilai, id_kontrak], (error) => {
                                if (error) {
                                    console.error('Error executing query: ' + error.stack)
                                    return
                                }
                                console.log('Nilai kontrak telah diperbarui.\n')
                                this.displayKontrakMenu()
                            })
                        })
                    })
                })
            })
        })
    }
}


const universitasApp = new UniversitasApp()
universitasApp.startApp()