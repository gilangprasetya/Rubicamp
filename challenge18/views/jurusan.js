import { line } from '../views/util.js';
import Table from 'cli-table';


export function menuJurusan(){
    line()
    console.log('Silahkan pilih opsi di bawah ini :')
    console.log('[1] Daftar Jurusan')
    console.log('[2] Cari Jurusan')
    console.log('[3] Tambah Jurusan')
    console.log('[4] Hapus Jurusan')
    console.log('[5] Kembali')
    line()
}


export function tableJurusan(data){
    let table = new Table({
        head: ['Kode Jurusan', 'Nama Jurusan']
    });

    data.forEach((jurusan) => {
        table.push(
            [jurusan.id_jurusan, jurusan.nama_jurusan]
        );
    })
    console.log(table.toString());

}