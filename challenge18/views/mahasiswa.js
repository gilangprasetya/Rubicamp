import { line } from "./util.js"
import Table from 'cli-table';

export function menuMahasiswa() {
    line();
    console.log('\nSilahkan pilih opsi dibawah ini');
    console.log('[1] Daftar Mahasiswa');
    console.log('[2] Cari Mahasiswa');
    console.log('[3] Tambah Mahasiswa');
    console.log('[4] Hapus Mahasiswa');
    console.log('[5] Kembali');
    line()
}
export function tableMahasiswa(data) {
    const table = new Table({
        head: ['nim', 'Nama', 'Tanggal Lahir', 'alamat_mhs', 'Kode Jurusan', 'Nama Jurusan']
    });
    data.forEach((sql) => {
        const rowData = [sql.nim, sql.nama_mhs, sql.tgl_lahir, sql.alamat_mhs, sql.id_jurusan, sql.nama_jurusan]
        table.push(rowData)
    });
    console.log(table.toString())
    console.log('')
}