import { line } from './util.js';
import Table from 'cli-table';

export function menuDosen() {
    line();
    console.log('\nSilahkan pilih opsi dibawah ini');
    console.log('[1] Daftar Dosen');
    console.log('[2] Cari Dosen');
    console.log('[3] Tambah Dosen');
    console.log('[4] Hapus Dosen');
    console.log('[5] Kembali');
    line();
}

export function tableDosen(rows) {
    const table = new Table({
        head: ['NIP', 'Nama dosen']
    })

    rows.forEach((sql) => {
        table.push([sql.nip, sql.nama_dosen])
    })

    console.log(table.toString())
}