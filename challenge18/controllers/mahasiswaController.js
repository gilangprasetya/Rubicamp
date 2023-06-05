const MahasiswaView = require('../views/mahasiswaView')
const Mahasiswa = require('../models/mahasiswa')

class MahasiswaController {
  constructor(db, rl) {
    this.mahasiswaView = new MahasiswaView(rl)
    this.mahasiswaModel = new Mahasiswa(db)
  }

  displayMahasiswaMenu(callback) {
    this.mahasiswaModel.getAllMahasiswa((data) => {
      this.mahasiswaView.displayDaftarMahasiswa(data)
      this.mahasiswaView.displayMenu(callback)
    })
  }
}

module.exports = MahasiswaController
