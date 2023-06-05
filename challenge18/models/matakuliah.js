import { db } from './connect.js'

export default class matakuliah {

    static daftarMatkul(next) {
        const sql = 'SELECT * FROM matakuliah'
        db.all(sql, (err, rows) => {
            if (err) throw err
            next(rows)
        })
    }

    static cariMatkul(id_mk, next) {
        const sql = `SELECT * FROM matakuliah WHERE id_mk = ?`
        db.all(sql,[id_mk], (err, rows) => {
            if (err) throw err
            next(rows)
        })
    }

    static tambahMatkul(id_mk, nama_mk, sks, next) {
        const sql = 'INSERT INTO matakuliah (id_mk, nama_mk, sks) VALUES (?, ?, ?)'
        db.run(sql, [id_mk, nama_mk, sks], err => {
            if (err) {
                console.error(err.message)
            } else {
                console.log('Mata kuliah telah ditambahkan ke database\n')
            }
            next()
        })
    }

    static hapusMatkul(id_mk, next) {
        const sql = 'DELETE FROM matakuliah WHERE id_mk = ? '
        db.run(sql, [id_mk], err => {
            if (err) {
                console.error(err.message)
            } else {
                console.log(`Data matakuliah ${id_mk}, telah dihapus.\n`)
            }
            next()
        })
    }

}