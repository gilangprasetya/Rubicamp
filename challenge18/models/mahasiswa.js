import { db } from "./connect.js"

export default class Mahasiswa {


    static daftarMahasiswa(next) {
        const sql = 'SELECT mahasiswa.nim, mahasiswa.nama_mhs, mahasiswa.tgl_lahir, mahasiswa.alamat_mhs, mahasiswa.id_jurusan, jurusan.nama_jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan ORDER BY nim;  '
        db.all(sql, (err, rows) => {
            if (err) {
                return console.log('Ambil data mahasiswa gagal !')
            }

            next(rows)
        })
    }

    static cariMahasiswa(nim, next) {
        db.all('SELECT * FROM mahasiswa WHERE nim = ?', (nim), (err, rows) => {

            if (err)
                return console.log('Cari data mahasiswa gagal !')
            next(rows)
        })
    }


    static tambahMahasiswa(nim, nama_mhs, tgl_lahir, alamat_mhs, id_jurusan, next) {
        db.run('INSERT INTO mahasiswa (nim, nama_mhs, tgl_lahir, alamat_mhs, id_jurusan) VALUES (?,?,?,?,?)',
            [nim, nama_mhs, tgl_lahir, alamat_mhs, id_jurusan],
            err => {
                if (err)
                    return console.log('Tambah data mahasiswa gagal !')

                console.log('Mahasiswa telah ditambahkan')
                next()
            })
    }

    static hapusMahasiswa(nim, next) {

        db.run("DELETE FROM mahasiswa WHERE nim = ?", [nim], err => {
            if (err)
                return console.log('Hapus Data Mahasiswa gagal !')

            console.log(`Data Mahasiswa ini "${nim}" telah di HAPUS`)
            next()
        })
    }

}