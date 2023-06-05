import { db } from './connect.js'

export default class kontrak {

    static daftarKontrak(next) {
        const query = `
        SELECT kontrak.id_kontrak, mahasiswa.nim, mahasiswa.nama_mhs, matakuliah.nama_mk, dosen.nama_dosen, kontrak.nilai
        FROM kontrak 
        INNER JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
        INNER JOIN matakuliah ON kontrak.id_mk = matakuliah.id_mk
        INNER JOIN dosen ON kontrak.nip = dosen.nip
    `
        db.all(query, [], (err, rows) => {
            if (err) throw err
            next(rows)
        })
    }

    static cariKontrak(nim, next) {
        const query = `
                SELECT * FROM kontrak
                WHERE nim = ?
            `
        db.all(query, [nim], (err, rows) => {
            if (err) throw err
            next(rows)
        })
    }

    static tambahKontrak(nim, id_mk, nip, next) {
        const query = 'INSERT INTO kontrak(nim, id_mk, nip) VALUES (?, ?, ?)'
        db.run(query, [nim, id_mk, nip], err => {
            if (err) {
                console.error(err.message)
            } else {
                console.log('Kontrak telah ditambahkan.\n')
            }
            next()
        })
    }

    static hapusKontrak(id_kontrak, next) {
        const queryDelete = 'DELETE FROM kontrak WHERE id_kontrak = ?'
        db.run(queryDelete, [id_kontrak], err => {
            if (err) {
                console.error(err.message)
            } else {
                console.log(`Data kontrak dengan ID ${id_kontrak}, telah dihapus\n`)
            }
            next()
        })
    }

    static updateKontrak(nilai, id_kontrak, next) {
        const query = 'UPDATE kontrak SET nilai = ? WHERE id_kontrak = ?'
        db.run(query, [nilai, id_kontrak], err => {
            if (err) {
                console.error(err.message)
            } else {
                console.log('Nilai kontrak telah diperbarui.\n')
            }
            next()
        })
    }

    static tampilMhsNilai(nim, next) {
        const query = `
        SELECT kontrak.nim, kontrak.id_kontrak, matakuliah.nama_mk, kontrak.nilai
        FROM kontrak
        INNER JOIN matakuliah ON kontrak.id_mk = matakuliah.id_mk
        INNER JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
        WHERE mahasiswa.nim = ?
        `
        db.all(query, [nim], (err, rows) => {
            if (err) {
                console.error(err.message)
            } else {
                console.log('salahni')
            }
            next(rows)
        })
    }

}