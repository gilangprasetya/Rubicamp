CREATE TABLE jurusan(
    id_jurusan VARCHAR(3) PRIMARY KEY NOT NULL,
    nama_jurusan VARCHAR(20) NOT NULL
);
INSERT INTO jurusan(id_jurusan, nama_jurusan) VALUES('J01', 'Multimedia');

CREATE TABLE mahasiswa(
    nim VARCHAR(3) PRIMARY KEY NOT NULL,
    nama_mhs VARCHAR(20) NOT NULL,
    alamat_mhs TEXT NOT NULL,
    id_jurusan VARCHAR(3) NOT NULL,
    FOREIGN KEY(id_jurusan) REFERENCES jurusan(id_jurusan)
);
ALTER TABLE mahasiswa ADD COLUMN umur_mhs VARCHAR(2);
INSERT INTO mahasiswa(nim, nama_mhs, alamat_mhs, id_jurusan, umur_mhs) VALUES('001', 'Gilang Prasetya', 'jalan. garuda gg bersama', 'J01', '27'),('002', 'Mahyudin Akbar', 'belawan', 'J01', '18'), ('003', 'rudi', 'bandung', 'J01', '22'), ('004', 'dian', 'medan', 'J01', '19'), ('005', 'iqbal', 'medan', 'J01', '28');

CREATE TABLE matakuliah(
    id_mk VARCHAR(3) PRIMARY KEY NOT NULL,
    nama_mk VARCHAR(20) NOT NULL,
    sks INTEGER NOT NULL
);
INSERT INTO matakuliah(id_mk, nama_mk, sks) VALUES('MK1', 'Matematika', 6), ('MK2', 'Bahasa Indonesia', 2), ('MK3', 'data mining', 4);

CREATE TABLE dosen(
    id_dosen VARCHAR(3) PRIMARY KEY NOT NULL,
    nama_dosen VARCHAR(20) NOT NULL,
    id_mk VARCHAR(3) NOT NULL,
    FOREIGN KEY(id_mk) REFERENCES matakuliah(id_mk)
);
INSERT INTO dosen(id_dosen, nama_dosen, id_mk) VALUES('D01', 'Billy O', 'MK1'), ('D02', 'Risma', 'MK2'), ('D03', 'Budi', 'MK3');

CREATE TABLE teach(
    id_teach INTEGER PRIMARY KEY AUTOINCREMENT,
    nilai VARCHAR(2) NOT NULL,
    nim VARCHAR(3) NOT NULL,
    id_dosen VARCHAR(3) NOT NULL,
    id_mk VARCHAR(3) NOT NULL,
    FOREIGN KEY(nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY(id_dosen) REFERENCES dosen(id_dosen),
    FOREIGN KEY(id_mk) REFERENCES matakuliah(id_mk)
);
INSERT INTO teach(nilai, nim, id_dosen, id_mk) VALUES('A', '001', 'D01', 'MK1'),('D', '002', 'D01', 'MK1'), ('B', '001', 'D02', 'MK2'), ('E', '002', 'D02', 'MK2'), ('A', '001', 'D03', 'MK3'), ('A', '003', 'D02', 'MK2'), ('B', '004', 'D03', 'MK3'), ('B', '005', 'D03', 'MK3'), ('D', '002', 'D03', 'MK3'), ('D', '001', 'D03', 'MK3');
ALTER TABLE teach RENAME TO kontrak;


/*
1. menampilkan seluruh data mahasiswa beserta jurusannya.
SELECT * FROM mahasiswa JOIN jurusan USING(id_jurusan);

2. menampilkan mahasiswa yang memiliki umur dibawah 20 tahun.
SELECT * FROM mahasiswa WHERE umur_mhs < 20;

3. menampilkan mahasiswa yang memiliki nilai 'B' ke atas.
SELECT mahasiswa.nim, mahasiswa.nama_mhs, kontrak.nilai, nama_mk FROM mahasiswa JOIN kontrak ON mahasiswa.nim = kontrak.nim JOIN matakuliah ON kontrak.id_mk = matakuliah.id_mk WHERE kontrak.nilai = 'A' OR kontrak.nilai = 'B';

4. menampilkan mahasiswa yang memiliki jumlah SKS lebih dari 10.
SELECT mahasiswa.nim, mahasiswa.nama_mhs FROM mahasiswa JOIN kontrak ON mahasiswa.nim = kontrak.nim JOIN matakuliah ON kontrak.id_mk = matakuliah.id_mk GROUP BY mahasiswa.nim, mahasiswa.nama_mhs HAVING SUM(matakuliah.sks) > 10;

5. menampilkan mahasiswa yang mengontrak mata kuliah 'data mining'
SELECT mahasiswa.nim, mahasiswa.nama_mhs, nama_mk FROM mahasiswa JOIN kontrak ON mahasiswa.nim = kontrak.nim JOIN matakuliah ON kontrak.id_mk = matakuliah.id_mk WHERE matakuliah.nama_mk = 'data mining';

6. menampilkan jumlah mahasiswa untuk setiap dosen.
SELECT dosen.id_dosen, dosen.nama_dosen, COUNT(mahasiswa.nim) as jumlahmahasiswa FROM dosen JOIN kontrak ON dosen.id_dosen = kontrak.id_dosen JOIN mahasiswa ON kontrak.nim = mahasiswa.nim GROUP BY dosen.id_dosen;

7. mengurutkan mahasiswa berdasarkan umurnya
SELECT * FROM mahasiswa ORDER BY umur_mhs ASC;

8. menampilkan kontrak kuliah yang harus diulang (nilai D & E), serta tampilkan data mahasiswa jurusan dan dosen secara lengkap. menggunakan mode JOIN dan WHERE clause
SELECT kontrak.id_teach, mahasiswa.nama_mhs, jurusan.nama_jurusan, dosen.nama_dosen, matakuliah.nama_mk, kontrak.nilai FROM kontrak JOIN mahasiswa ON kontrak.nim = mahasiswa.nim JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan JOIN dosen ON kontrak.id_dosen = dosen.id_dosen JOIN matakuliah ON kontrak.id_mk = matakuliah.id_mk WHERE kontrak.nilai IN ('D', 'E');
*/