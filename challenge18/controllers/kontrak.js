import UserController from './login.js'
import { rl, line } from '../views/util.js'
import { menuKontrak, tableKontrak, cariKontrak, tableMhsNilai } from '../views/kontrak.js'
import kontrak from '../models/kontrak.js'
import matakuliah from '../models/matakuliah.js'
import { tableMatkul } from '../views/matakuliah.js'
import Dosen from '../models/dosen.js'
import { tableDosen } from '../views/dosen.js'

export default class kontrakController {

    static menuKontrak() {
        menuKontrak()
        rl.question('Masukkan salah satu opsi diatas : ', function (getAnswer) {
            switch (getAnswer) {
                case '1':
                    kontrakController.daftarKontrak(() => {
                        kontrakController.menuKontrak()
                    })
                    break;
                case '2':
                    kontrakController.cariKontrak(() => {
                        kontrakController.menuKontrak()
                    })
                    break;
                case '3':
                    kontrakController.tambahKontrak(() => {
                        kontrakController.menuKontrak()
                    })
                    break;
                case '4':
                    kontrakController.hapusKontrak(() => {
                        kontrakController.menuKontrak()
                    })
                    break;
                case '5':
                    kontrakController.updateKontrak(() => {
                        kontrakController.menuKontrak()
                    })
                    break;
                case '6':
                    UserController.menuUtama()
                    break;
                default:

            }
        })
    }

    static daftarKontrak(next) {
        kontrak.daftarKontrak((data) => {
            tableKontrak(data)
            next()
        })
    }

    static cariKontrak(next) {
        kontrak.daftarKontrak((data) => {
            tableKontrak(data)
            rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
                kontrak.cariKontrak(nim, (data) => {
                    if (data.length > 0) {
                        console.log(`daftar kontrak mahasiswa dengan nim ${nim} adalah :`)
                        cariKontrak(data)
                    } else {
                        console.log(`kontrak dengan nim : ${nim} tidak terdaftar`)
                    }
                    next()
                })
            })
        })
    }

    static tambahKontrak(next) {
        console.log('\nLengkapi data dibawah ini :')
        kontrak.daftarKontrak((data) => {
            tableKontrak(data)
            rl.question('Masukan NIM : ', (nim) => {
                kontrakController.tampilMatkul(() => {
                    rl.question('Masukan Kode Matakuliah : ', (id_mk) => {
                        kontrakController.tampilDosen(() => {
                            rl.question('masukan NIP dosen : ', (nip) => {
                                kontrak.tambahKontrak(nim, id_mk, nip, () => {
                                    kontrakController.daftarKontrak(() => {
                                        next()
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    static hapusKontrak(next) {
        rl.question('\nMasukkan ID Kontrak yang ingin dihapus: ', (id_kontrak) => {
            line()
            kontrak.hapusKontrak(id_kontrak, (rows) => {
                kontrakController.daftarKontrak(() => {
                    next(rows)
                })
            })
        })
    }

    static updateKontrak(next) {
        kontrakController.daftarKontrak(() => {
            rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
                kontrakController.tampilMhsNilai(nim, () => {
                    rl.question('Masukkan ID yang ingin dirubah nilainya : ', (id_kontrak) => {
                        rl.question('Tulis Nilai Baru : ', (nilai) => {
                            kontrak.updateKontrak(nilai, id_kontrak, () => {
                                kontrakController.daftarKontrak(() => {
                                    next()
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    static tampilMhsNilai(nim, next) {
        kontrak.tampilMhsNilai(nim, (data) => {
            tableMhsNilai(data)
            next()
        })
    }

    static tampilMatkul(next) {
        matakuliah.daftarMatkul((data) => {
            tableMatkul(data)
            next()
        })
    }

    static tampilDosen(next) {
        Dosen.daftarDosen((data) => {
            tableDosen(data)
            next()
        })
    }

}