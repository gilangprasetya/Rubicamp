CREATE TABLE jurusan(
    id_jurusan VARCHAR(3) PRIMARY KEY NOT NULL,
    nama_jurusan VARCHAR(20) NOT NULL
);

CREATE TABLE mahasiswa(
    nim VARCHAR(3) PRIMARY KEY NOT NULL,
    nama_mhs VARCHAR(20) NOT NULL,
    alamat_mhs TEXT NOT NULL,
    umur_mhs VARCHAR(2) NOT NULL,
    id_jurusan VARCHAR(3) NOT NULL,
    FOREIGN KEY(id_jurusan) REFERENCES jurusan(id_jurusan)
);

CREATE TABLE matakuliah(
    id_mk VARCHAR(3) PRIMARY KEY NOT NULL,
    nama_mk VARCHAR(20) NOT NULL,
    sks INTEGER NOT NULL
);

CREATE TABLE dosen(
    id_dosen VARCHAR(3) PRIMARY KEY NOT NULL,
    nama_dosen VARCHAR(20) NOT NULL,
    id_mk VARCHAR(3) NOT NULL,
    FOREIGN KEY(id_mk) REFERENCES matakuliah(id_mk)
);

CREATE TABLE kontrak(
    nim VARCHAR(3) NOT NULL,
    id_dosen VARCHAR(3) NOT NULL,
    id_mk VARCHAR(3) NOT NULL,
    nilai VARCHAR(2) NOT NULL,
    FOREIGN KEY(nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY(id_dosen) REFERENCES dosen(id_dosen),
    FOREIGN KEY(id_mk) REFERENCES matakuliah(id_mk)
);

/*
1. menampilkan seluruh data mahasiswa beserta jurusannya.
SELECT * FROM mahasiswa JOIN jurusan USING(id_jurusan);

2. menampilkan mahasiswa yang memiliki umur dibawah 20 tahun.
SELECT * FROM mahasiswa WHERE umur_mhs < 20;

3. menampilkan mahasiswa yang memiliki nilai 'B' ke atas.
SELECT mahasiswa.nim, mahasiswa.nama_mhs FROM mahasiswa JOIN kontrak ON mahasiswa.nim = kontrak.nim WHERE kontrak.nilai = 'A' OR kontrak.nilai = 'B';

4. menampilkan mahasiswa yang memiliki jumlah SKS lebih dari 10.
SELECT mahasiswa.nim, mahasiswa.nama_mhs FROM mahasiswa JOIN kontrak ON mahasiswa.nim = kontrak.nim JOIN matakuliah ON kontrak.id_mk = matakuliah.id_mk GROUP BY mahasiswa.nim, mahasiswa.nama_mhs HAVING SUM(matakuliah.sks) > 10;

5. menampilkan mahasiswa yang mengontrak mata kuliah 'data mining'
SELECT mahasiswa.nim, mahasiswa.nama_mhs FROM mahasiswa JOIN kontrak ON mahasiswa.nim - kontrak.nim JOIN matakuliah ON kontrak.id_mk = matakuliah.id_mk GROUP BY mahasiswa.nim, mahasiswa.nama_mhs WHERE matakuliah.nama_mk = 'data mining';

6. menampilkan jumlah mahasiswa untuk setiap dosen.

*/