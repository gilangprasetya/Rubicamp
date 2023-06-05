import UserController from './login.js'
import { rl, line } from '../views/util.js'
import { menuDosen, tableDosen } from '../views/dosen.js'
import Dosen from '../models/dosen.js'

export default class DosenController {

    static menuDosen() {
        menuDosen()
        rl.question('Masukkan salah satu opsi diatas : ', function (getAnswer) {
            switch (getAnswer) {
                case '1':
                    DosenController.daftarDosen(() => {
                        DosenController.menuDosen()
                    })
                    break
                case '2':
                    DosenController.cariDosen(() => {
                        DosenController.menuDosen()
                    })
                    break
                case '3':
                    DosenController.tambahDosen(() => {
                        DosenController.menuDosen()
                    })
                    break
                case '4':
                    DosenController.hapusDosen(() => {
                        DosenController.menuDosen()
                    })
                    break
                case '5':
                    UserController.menuUtama()
                    break
                default:
                    console.log('Opsi yang dimasukkan tidak ada')
                    DosenController.menuDosen()
            }
        })
    }

    static daftarDosen(next) {
        Dosen.daftarDosen((data) => {
            tableDosen(data)
            next()
        })
    }

    static cariDosen(next) {
        rl.question('Masukkan nip dosen : ', nip => {
            Dosen.cariDosen(nip, (rows) => {
                if (rows.length > 0) {
                    line()
                    console.log(`Detail Jurusan dengan Kode '${rows[0].nip}' :`)
                    console.log(`nip            : ${rows[0].nip}`)
                    console.log(`Nama dosen     : ${rows[0].nama_dosen}`)
                } else {
                    console.log(`dosen dengan nip ${nip} tidak terdaftar`)
                }
                next()
            })
        })
    }

    static tambahDosen(next) {
        console.log('Lengkapi data dibawah ini : ')
        DosenController.daftarDosen(() => {
            rl.question('nip : ', nip => {
                rl.question('Nama Dosen : ', nama_dosen => {
                    Dosen.tambahDosen(nip, nama_dosen, () => {
                        DosenController.daftarDosen(() => {
                            next()
                        })
                    })
                })
            })
        })
    }

    static hapusDosen(next) {
        rl.question('Masukkan nip Dosen : ', nip => {
            Dosen.hapusDosen(nip, () => {
                next()
            })
        })
    }

}