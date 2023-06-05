const Table = require('cli-table')

class MahasiswaView {
  constructor(rl) {
    this.rl = rl
  }

  displayMenu(callback) {
    console.log('\n-- Menu Mahasiswa --')
    console.log('[1] Daftar Mahasiswa')
    console.log('[2] Cari Mahasiswa')
    console.log('[3] Tambah Mahasiswa')
    console.log('[4] Hapus Mahasiswa')
    console.log('[5] Kembali')
    console.log('\n============================================================================================================')

    this.rl.question('\nMasukkan nomor opsi yang dipilih: ', (input) => {
      const optionIndex = parseInt(input)

      switch (optionIndex) {
        case 1:
          console.log('\n============================================================================================================')
          callback()
          break
        case 2:
          console.log('\n============================================================================================================')
          // Display Cari Mahasiswa
          break
        case 3:
          console.log('\n============================================================================================================')
          // Display Tambah Mahasiswa
          break
        case 4:
          console.log('\n============================================================================================================')
          // Display Hapus Mahasiswa
          break
        case 5:
          console.log('\n============================================================================================================')
          callback()
          break
        default:
          console.log('\n============================================================================================================')
          console.log('Opsi yang dimasukkan tidak valid.\n')
          this.displayMenu(callback)
          break
      }
    })
  }

  displayDaftarMahasiswa(data) {
    console.log('Daftar Mahasiswa:')
    const table = new Table({
      head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'ID Jurusan', 'Nama Jurusan'],
      colWidths: [15, 20, 15, 30, 15, 20],
    })

    data.forEach((row) => {
      table.push([row.nim, row.nama_mhs, row.tgl_lahir, row.alamat_mhs, row.id_jurusan, row.nama_jurusan])
    })

    console.log(table.toString())
    console.log('')
  }
}

module.exports = MahasiswaView
