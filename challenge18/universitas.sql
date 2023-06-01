CREATE TABLE jurusan(
    id_jurusan VARCHAR(4) PRIMARY KEY NOT NULL,
    nama_jurusan VARCHAR(20) NOT NULL
);
INSERT INTO jurusan(id_jurusan, nama_jurusan) VALUES
('J001', 'Fabrikasi Logam'),
('J002', 'Listrik Tenaga'),
('J003', 'Elektronika'),
('J004', 'Mekatronika'),
('J005', 'Otomotif'),
('J006', 'Informatika'),
('J007', 'Alat Berat'),
('J008', 'Gambar Bangunan'),
('J009', 'Arsitek'),
('J010', 'Gambar Bangunan');

CREATE TABLE mahasiswa(
    nim VARCHAR(10) PRIMARY KEY NOT NULL,
    nama_mhs VARCHAR(20) NOT NULL,
    tgl_lahir TEXT NOT NULL,
    alamat_mhs TEXT NOT NULL,
    id_jurusan VARCHAR(4) NOT NULL,
    FOREIGN KEY(id_jurusan) REFERENCES jurusan(id_jurusan)
);
INSERT INTO mahasiswa(nim, nama_mhs, tgl_lahir, alamat_mhs, id_jurusan) VALUES
('2022070001', 'Abaz', date('2002-09-12'), 'Semarang', 'J001'),
('2022070002', 'Faisal', date('2001-11-30'), 'Medan', 'J002'),
('2022070003', 'Lutfi', date('2000-12-23'), 'Bali', 'J003'),
('2022070004', 'Dimas', date('1999-08-11'), 'Surabaya', 'J004'),
('2022070005', 'Ikhsan', date('2000-01-29'), 'Balikpapan', 'J005'),
('2022070006', 'Eril', date('2001-02-17'), 'Makasar', 'J006'),
('2022070007', 'Zafran', date('2001-06-01'), 'Bandung', 'J007'),
('2022070008', 'Emir', date('2000-10-10'), 'Cianjur', 'J009'),
('2022070009', 'Zakka', date('1998-12-07'), 'Lampung', 'J010'),
('2022070010', 'Agung', date('2002-09-13'), 'Bandung', 'J003'),
('2022070011', 'Budi', date('2022-09-14'), 'Tulungagung', 'J003');

CREATE TABLE matakuliah(
    id_mk VARCHAR(4) PRIMARY KEY NOT NULL,
    nama_mk VARCHAR(20) NOT NULL,
    sks INTEGER NOT NULL
);
INSERT INTO matakuliah(id_mk, nama_mk, sks) VALUES
('MK01', 'data mining', 20), 
('MK02', 'basic', 20),
('MK03', 'kerja bengkel', 20),
('MK04', 'matematika', 15),
('MK05', 'bahasa inggris', 15);

CREATE TABLE dosen(
    nip VARCHAR(5) PRIMARY KEY NOT NULL,
    nama_dosen VARCHAR(20) NOT NULL
);
INSERT INTO dosen(nip, nama_dosen) VALUES
('D2201', 'Rubi'), 
('D2202', 'Wildan'), 
('D2203', 'Rizky'),
('D2204', 'Hilmi'),
('D2205', 'Bambang');

CREATE TABLE kontrak(
    id_kontrak INTEGER PRIMARY KEY AUTOINCREMENT,
    nim VARCHAR(10) NOT NULL,
    id_mk VARCHAR(4) NOT NULL,
    nip VARCHAR(5) NOT NULL,
    nilai VARCHAR(3),
    FOREIGN KEY(nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY(nip) REFERENCES dosen(nip),
    FOREIGN KEY(id_mk) REFERENCES matakuliah(id_mk)
);
INSERT INTO kontrak(nim, id_mk, nip, nilai) VALUES
('2022070001', 'MK01', 'D2201', 'C'),
('2022070002', 'MK01', 'D2201', 'A+'),
('2022070003', 'MK04', 'D2204', 'B'),
('2022070004', 'MK02', 'D2202', 'B+'),
('2022070010', 'MK03', 'D2205', 'C'),
('2022070009', 'MK04', 'D2204', 'A++'),
('2022070008', 'MK01', 'D2203', 'B+'),
('2022070007', 'MK05', 'D2202', 'A'),
('2022070006', 'MK04', 'D2204', 'B+'),
('2022070005', 'MK01', 'D2203', 'C+'),
('2022070001', 'MK02', 'D2202', 'A'),
('2022070001', 'MK04', 'D2204', NULL);

CREATE TABLE user(
    id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(15) NOT NULL,
    password VARCHAR(10) NOT NULL,
    role VARCHAR(10) NOT NULL
);
INSERT INTO user(username, password, role) VALUES
('gilang', '12345', 'admin');


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
SELECT dosen.nip, dosen.nama_dosen, COUNT(DISTINCT mahasiswa.nim) as jumlahmahasiswa FROM dosen JOIN kontrak ON dosen.nip = kontrak.nip JOIN mahasiswa ON kontrak.nim = mahasiswa.nim GROUP BY dosen.nip;

7. mengurutkan mahasiswa berdasarkan umurnya
SELECT * FROM mahasiswa ORDER BY umur_mhs ASC;

8. menampilkan kontrak kuliah yang harus diulang (nilai D & E), serta tampilkan data mahasiswa jurusan dan dosen secara lengkap. menggunakan mode JOIN dan WHERE clause
SELECT kontrak.id_kontrak, mahasiswa.nama_mhs, jurusan.nama_jurusan, dosen.nama_dosen, matakuliah.nama_mk, kontrak.nilai FROM kontrak JOIN mahasiswa ON kontrak.nim = mahasiswa.nim JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan JOIN dosen ON kontrak.nip = dosen.nip JOIN matakuliah ON kontrak.id_mk = matakuliah.id_mk WHERE kontrak.nilai IN ('D', 'E');
*/