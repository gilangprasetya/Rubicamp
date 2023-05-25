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
INSERT INTO mahasiswa(nim, nama_mhs, alamat_mhs, id_jurusan) VALUES('001', 'Gilang Prasetya', 'jalan. garuda gg bersama', 'J01'),('002', 'Mahyudin Akbar', 'belawan', 'J01');

CREATE TABLE matakuliah(
    id_mk VARCHAR(3) PRIMARY KEY NOT NULL,
    nama_mk VARCHAR(20) NOT NULL,
    sks INTEGER NOT NULL
);
INSERT INTO matakuliah(id_mk, nama_mk, sks) VALUES('MK1', 'Matematika', 4), ('MK2', 'Bahasa Indonesia', 2);

CREATE TABLE dosen(
    id_dosen VARCHAR(3) PRIMARY KEY NOT NULL,
    nama_dosen VARCHAR(20) NOT NULL,
    id_mk VARCHAR(3) NOT NULL,
    FOREIGN KEY(id_mk) REFERENCES matakuliah(id_mk)
);
INSERT INTO dosen(id_dosen, nama_dosen, id_mk) VALUES('D01', 'Billy O', 'MK1');

CREATE TABLE teach(
    nim VARCHAR(3) NOT NULL,
    id_dosen VARCHAR(3) NOT NULL,
    id_mk VARCHAR(3) NOT NULL,
    FOREIGN KEY(nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY(id_dosen) REFERENCES dosen(id_dosen),
    FOREIGN KEY(id_mk) REFERENCES matakuliah(id_mk)
);