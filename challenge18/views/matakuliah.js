import { line } from './util.js'
import Table from 'cli-table'

export function menuMatkul() {
    line()
    console.log('\nSilahkan pilih opsi dibawah ini')
    console.log('[1] Daftar Mata Kuliah')
    console.log('[2] Cari Mata Kuliah')
    console.log('[3] Tambah Mata Kuliah')
    console.log('[4] Hapus Mata Kuliah')
    console.log('[5] Kembali')
    line()
}

export function tableMatkul(rows) {
    const table = new Table({
        head: ['id', 'nama matakuliah', 'SKS']
    })

    rows.forEach((sql) => {
        table.push([sql.id_mk, sql.nama_mk, sql.sks])
    })

    console.log(table.toString())
}