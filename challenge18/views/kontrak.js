import { line } from './util.js'
import Table from 'cli-table'

export function menuKontrak() {
    line();
    console.log('\nSilahkan pilih opsi dibawah ini');
    console.log('[1] Daftar Kontrak');
    console.log('[2] Cari Kontrak');
    console.log('[3] Tambah Kontrak');
    console.log('[4] Hapus Kontrak');
    console.log('[5] Update Nilai');
    console.log('[6] Kembali');
    line()
}
export function tableKontrak(rows) {
    const table = new Table({
        head: ['ID', 'NIM', 'Nama', 'Mata kuliah', 'Dosen', 'Nilai']
    })
    rows.forEach((row) => {
        const formatRow = ([row.id_kontrak, row.nim, row.nama_mhs, row.nama_mk, row.nama_dosen, row.nilai || ''])
        table.push(formatRow)
    })

    console.log(table.toString())
    console.log('')
}

export function cariKontrak(data){
    const table = new Table({
        head: ['ID', 'NIM', 'Kode Mata kuliah', 'NIP', 'Nilai']
    });

    data.forEach((row) => {
        const rowData = [row.id_kontrak, row.nim, row.id_mk, row.nip, row.nilai || ''];
        table.push(rowData);
    });

    console.log(table.toString());
    console.log('');
}

export function tableMhsNilai(rows) {
    const table = new Table({
        head: ['ID', 'Mata Kuliah', 'Nilai']
    })

    rows.forEach((row) => {
        // table.push([row.id_kontrak, row.nama_mk, row.nilai])
        const tes = ([row.id_kontrak, row.nama_mk, row.nilai || ''])
        table.push(tes)
    })

    console.log(table.toString())
    console.log('')
}