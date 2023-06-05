import UserController from './login.js'
import { rl, line } from '../views/util.js'
import { menuMatkul, tableMatkul } from '../views/matakuliah.js'
import matakuliah from '../models/matakuliah.js'

export default class MatkulController {

    static menuMatkul() {
        menuMatkul()
        rl.question('Masukkan salah satu opsi diatas : ', function (getAnswer) {
            switch (getAnswer) {
                case '1':
                    MatkulController.daftarMatkul(() => {
                        MatkulController.menuMatkul()
                    })
                    break;
                case '2':
                    MatkulController.cariMatkul(() => {
                        MatkulController.menuMatkul()
                    })
                    break;
                case '3':
                    MatkulController.tambahMatkul(() => {
                        MatkulController.menuMatkul()
                    })
                    break;
                case '4':
                    MatkulController.hapusMatkul(() => {
                        MatkulController.menuMatkul()
                    })
                    break;
                case '5':
                    UserController.menuUtama()
                    break;
                default:
                    console.log('Opsi yang dimasukkan tidak ada')
                    MatkulController.menuMatkul()
            }
        })
    }

    static daftarMatkul(next) {
        matakuliah.daftarMatkul((data) => {
            tableMatkul(data)
            next()
        })
    }

    static cariMatkul(next) {
        rl.question('Masukkan Kode matakuliah : ', id_mk => {
            matakuliah.cariMatkul(id_mk, (rows) => {
                if (rows.length > 0) {
                    line()
                    console.log(`Detail Matakuliah dengan Kode matakuliah : ${id_mk}`);
                    console.log(`Kode Matakuliah : ${rows[0].id_mk}`);
                    console.log(`Nama Matakuliah : ${rows[0].nama_mk}`);
                    console.log(`SKS             : ${rows[0].sks}`)
                } else {
                    console.log(`matakuliah dengan kode matakuliah ${id_mk} tidak terdaftar`);
                }
                next()
            });
        });
    }

    static tambahMatkul(next) {
        console.log('Lengkapi data dibawah ini : ')
        MatkulController.daftarMatkul(() => {
            rl.question('kode mk : ', id_mk => {
                rl.question('Nama Matakuliah : ', nama_mk => {
                    rl.question('SKS : ', sks => {
                        matakuliah.tambahMatkul(id_mk, nama_mk, sks, () => {
                            MatkulController.daftarMatkul(() => {
                                next()
                            })
                        })
                    });
                })
            });
        });
    }

    static hapusMatkul(next) {
        rl.question('Masukkan id matakuliah : ', id_mk => {
            line()
            matakuliah.hapusMatkul(id_mk, () => {
                next()
            })
        })
    }
}