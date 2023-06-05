import { db } from './connect.js';

export default class Dosen {

    static daftarDosen(next) {
        const sql = 'SELECT * FROM dosen';
        db.all(sql, (err, rows) => {
            if (err) {
                console.log('Ambil data DOSEN gagal !')
            }
            next(rows)
        })
    }

    static cariDosen(nip, next) {
        const sql = 'SELECT * FROM dosen WHERE nip = ?'
        db.all(sql, [nip], (err, rows) => {
            if (err) throw err
            next(rows)
        })
    }

    static tambahDosen(nip, nama_dosen, next) {
        const sql = 'INSERT INTO dosen (nip, nama_dosen) VALUES (?, ?)';
        db.run(sql, [nip, nama_dosen], err => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Dosen telah ditambahkan ke database');
            }
            next()
        })
    }

    static hapusDosen(nip, next) {
        const sql = 'DELETE FROM dosen WHERE nip = ? ';
        db.run(sql, [nip], err => {
            if (err) {
                console.error(err.message)
            } else {
                console.log(`Data Dosen ${nip}, telah dihapus.`)
            }
            next()
        })
    }

}