const readline = require('node:readline');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./universitas.db');
const Table = require('cli-table');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function line() {
    console.log('===================================================================');
}


function mainOption() {
    line();
    console.log('Silahkan pilih opsi dibawah ini');
    console.log('[1] Mahasiswa');
    console.log('[2] Jurusan');
    console.log('[3] Dosen');
    console.log('[4] Mata Kuliah');
    console.log('[5] Kontrak');
    console.log('[6] Keluar');
    line()
    rl.question('Masukkan salah satu nomor diatas : ', function (getAnswer) {
        switch (getAnswer) {
            case '1':
                optionMahasiswa();
                break;
            case '2':
                // console.log('Ini page jurusan');
                optionJurusan();
                break;
            case '3':
                optionDosen();
                break;
            case '4':
                optionMataKuliah();
                break;
            case '5':
                optionKontrak();
                break;
            case '6':
                logout()
                break;
        }
    })
}

function login() {
    line();
    console.log('Welcome to Universitas Pendidikan Indonesia');
    console.log('Jl. Setiabudhi No.255')
    line();
    rl.question('username: ', function (getusername) {
        const sqlUsername = `SELECT * FROM user WHERE username=?`;
        db.all(sqlUsername, [getusername], (err, username) => {
            if (err) throw err;
            const sqlPasswords = `SELECT * FROM user WHERE password=?`;
            if (username.length > 0) {
                rl.question('password: ', function (getpassword) {
                    db.all(sqlPasswords, [getpassword], (err, password) => {
                        if (err) throw err;
                        if (password.length > 0) {
                            console.log(`Welcome, ${getusername} your acces level is: ADMIN `);
                            mainOption()
                        } else {
                            console.log('Incorecct Password, Try again');
                            line()
                            login();
                        }
                    })
                })
            } else {
                console.log('username tidak terdaftar');
                login();
            }
        })
    });
}
function logout() {
    console.log('Anda telah keluar');
    login();
}
function optionMahasiswa() {
    line();
    console.log('\nSilahkan pilih opsi dibawah ini');
    console.log('[1] Daftar Mahasiswa');
    console.log('[2] Cari Mahasiswa');
    console.log('[3] Tambah Mahasiswa');
    console.log('[4] Hapus Mahasiswa');
    console.log('[5] Kembali');
    line()
    rl.question('Masukkan salah satu opsi diatas : ', function (getAnswer) {
        switch (getAnswer) {
            case '1':
                Mahasiswa.daftarMahasiswa();
                break;
            case '2':
                Mahasiswa.cariMahasiswa();
                break;
            case '3':
                Mahasiswa.tambahMahasiswa();
                break;
            case '4':
                Mahasiswa.hapusMahasiswa();
                break;
            case '5':
                mainOption()
                break;
        }
    })
}
function optionJurusan() {
    line();
    console.log('\nSilahkan pilih opsi dibawah ini');
    console.log('[1] Daftar Jurusan');
    console.log('[2] Cari Jurusan');
    console.log('[3] Tambah Jurusan');
    console.log('[4] Hapus Jurusan');
    console.log('[5] Kembali');
    line()
    rl.question('Masukkan salah satu opsi diatas : ', function (getAnswer) {
        switch (getAnswer) {
            case '1':
                JurusanModel.daftarJurusan();
                break;
            case '2':
                JurusanModel.cariJurusan();
                break;
            case '3':
                JurusanModel.tambahJurusan();
                break;
            case '4':
                JurusanModel.hapusJurusan();
                break;
            case '5':
                mainOption()
                break;
        }
    })
}
function optionDosen() {
    line();
    console.log('\nSilahkan pilih opsi dibawah ini');
    console.log('[1] Daftar Dosen');
    console.log('[2] Cari Dosen');
    console.log('[3] Tambah Dosen');
    console.log('[4] Hapus Dosen');
    console.log('[5] Kembali');
    line();
    rl.question('Masukkan salah satu opsi diatas : ', function (getAnswer) {
        switch (getAnswer) {
            case '1':
                Dosen.daftarDosen();
                break;
            case '2':
                Dosen.cariDosen();
                break;
            case '3':
                Dosen.tambahDosen();
                break;
            case '4':
                Dosen.hapusDosen();
                break;
            case '5':
                mainOption()
                break;
        }
    })
}
function optionMataKuliah() {
    line();
    console.log('\nSilahkan pilih opsi dibawah ini');
    console.log('[1] Daftar Mata Kuliah');
    console.log('[2] Cari Mata Kuliah');
    console.log('[3] Tambah Mata Kuliah');
    console.log('[4] Hapus Mata Kuliah');
    console.log('[5] Kembali');
    line()
    rl.question('Masukkan salah satu opsi diatas : ', function (getAnswer) {
        switch (getAnswer) {
            case '1':
                matakuliah.daftarMatkul();
                break;
            case '2':
                matakuliah.cariMatkul();
                break;
            case '3':
                matakuliah.tambahMatkul();
                break;
            case '4':
                matakuliah.hapusMatkul();
                break;
            case '5':
                mainOption()
                break;
        }
    })
}
function optionKontrak() {
    line();
    console.log('\nSilahkan pilih opsi dibawah ini');
    console.log('[1] Daftar Kontrak');
    console.log('[2] Cari Kontrak');
    console.log('[3] Tambah Kontrak');
    console.log('[4] Hapus Kontrak');
    console.log('[5] Update Nilai');
    console.log('[6] Kembali');
    line()
    rl.question('Masukkan salah satu opsi diatas : ', function (getAnswer) {
        switch (getAnswer) {
            case '1':
                kontrak.daftarKontrak();
                break;
            case '2':
                kontrak.cariKontrak();
                break;
            case '3':
                kontrak.tambahKontrak();
                break;
            case '4':
                kontrak.hapusKontrak();
                break;
            case '5':
                kontrak.updateKontrak();
                break;
            case '6':
                mainOption()
                break;
        }
    })
}

class JurusanModel {
    static daftarJurusan() {
        const sql = 'SELECT * FROM jurusan';
        db.all(sql, (err, rows) => {
            if (err) throw err;
            // Buat Table 
            const table = new Table({
                head: ['Kode Jurusan', 'Nama Jurusan']
            });

            // Tambah rows ke Table
            rows.forEach((sql) => {
                table.push([sql.id_jurusan, sql.nama_jurusan])
            });

            // Munculin table di CLI
            console.log(table.toString());

            optionJurusan();
        });
    };
    static cariJurusan() {
        rl.question('Masukkan Kode Jurusan : ', function (Search_Jurusan) {
            const sql = `SELECT * FROM jurusan WHERE id_jurusan LIKE '%${Search_Jurusan}%'`;
            db.all(sql, (err, rows) => {
                if (err) throw err;
                if (rows.length > 0) {
                    console.log(`Detail Jurusan dengan Kode '${rows[0].id_jurusan}' :`);
                    console.log(`Kode Jurusan     : ${rows[0].id_jurusan}`);
                    console.log(`Nama Jurusan     : ${rows[0].nama_jurusan}`);
                } else {
                    console.log(`Jurusan dengan kode ${Search_Jurusan} tidak terdaftar`);
                }
                optionJurusan();
            });
        });
    }

    static tambahJurusan() {
        console.log('Lengkapi data dibawah ini : ')
        const sql = 'SELECT * FROM jurusan';
        db.all(sql, (err, rows) => {
            if (err) throw err;
            // Buat Table 
            const table = new Table({
                head: ['Kode Jurusan', 'Nama Jurusan']
            });

            // Tambah rows ke Table
            rows.forEach((sql) => {
                table.push([sql.id_jurusan, sql.nama_jurusan])
            });

            // Munculin table di CLI
            console.log(table.toString());
            rl.question('Kode Jurusan : ', function (id_jurusan) {
                rl.question('Nama Jurusan : ', function (nama_jurusan) {
                    const sql = 'INSERT INTO jurusan (id_jurusan, nama_jurusan) VALUES (?, ?)';
                    db.run(sql, [id_jurusan, nama_jurusan], function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log('Jurusan telah ditambahkan ke database');
                        }
                        // db.close();
                        optionJurusan()
                    });
                });
            });
        });
    }

    static hapusJurusan() {
        rl.question('Masukkan Kode Jurusan : ', function (id_jurusan) {
            const sql = 'DELETE FROM jurusan WHERE id_jurusan = ? ';
            db.run(sql, [id_jurusan], function (err) {
                if (err) {
                    console.error(err.message)
                } else {
                    console.log(`Data Jurusan ${id_jurusan}, telah dihapus.`)
                }
                optionJurusan();
            });
        });
    };
}

class Mahasiswa {
    static daftarMahasiswa() {
        const sql = 'SELECT mahasiswa.nim, mahasiswa.nama_mhs, mahasiswa.tgl_lahir, mahasiswa.alamat_mhs, jurusan.id_jurusan, jurusan.nama_jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan';
        db.all(sql, (err, rows) => {
            if (err) throw err;
            const table = new Table({
                head: ['nim', 'Nama', 'Tanggal Lahir', 'alamat_mhs', 'Kode Jurusan', 'Nama Jurusan']
            });
            rows.forEach((sql) => {
                table.push([sql.nim, sql.nama_mhs, sql.tgl_lahir, sql.alamat_mhs, sql.id_jurusan, sql.nama_jurusan])
            });
            console.log(table.toString());
            optionMahasiswa();
        });
    }

    static cariMahasiswa() {
        rl.question('Masukkan nim mahasiswa : ', function (search_mhs) {
            const sql = `SELECT mahasiswa.nim, mahasiswa.nama_mhs, mahasiswa.tgl_lahir, mahasiswa.alamat_mhs, jurusan.id_jurusan, jurusan.nama_jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan WHERE mahasiswa.nim LIKE '%${search_mhs}%'`;
            db.all(sql, (err, rows) => {
                if (err) throw err;
                if (rows.length > 0) {
                    console.log(`Detail mahasiswa dengan nim '${rows[0].nim}' :`);
                    console.log(`nim     : ${rows[0].nim}`);
                    console.log(`Nama    : ${rows[0].nama_mhs}`);
                    console.log(`alamat_mhs  : ${rows[0].alamat_mhs}`);
                    console.log(`Jurusan : ${rows[0].id_jurusan}`)
                } else {
                    console.log(`Mahasiswa dengan nim ${search_mhs} tidak terdaftar`);
                }
                optionMahasiswa()
            });
        });
    }

    static tambahMahasiswa() {
        console.log('Lengkapi data di bawah ini : ')
        const sql = 'SELECT mahasiswa.nim, mahasiswa.Nama, mahasiswa.tgl_lahir, mahasiswa.alamat_mhs, jurusan.id_jurusan, jurusan.nama_jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan';
        db.all(sql, (err, rows) => {
            if (err) throw err;
            const table = new Table({
                head: ['nim', 'Nama', 'Tanggal Lahir', 'alamat_mhs', 'Kode Jurusan', 'Nama Jurusan']
            });
            rows.forEach((sql) => {
                table.push([sql.nim, sql.nama_mhs, sql.tgl_lahir, sql.alamat_mhs, sql.id_jurusan, sql.nama_jurusan])
            });
            rl.pause();
            console.log(table.toString());
            rl.resume();
            rl.question('nim : ', function (nim) {
                rl.question('Nama :', function (nama_mhs) {
                    rl.question('Tanggal Lahir :', function (tgl_lahir) {
                        rl.question('alamat_mhs :', function (alamat_mhs) {
                            const sql1 = 'SELECT * FROM jurusan';
                            db.all(sql1, (err, rows) => {
                                if (err) throw err;
                                // Buat Table 
                                const table = new Table({
                                    head: ['Kode Jurusan', 'Nama Jurusan']
                                });
                                // Tambah rows ke Table
                                rows.forEach((sql) => {
                                    table.push([sql.id_jurusan, sql.nama_jurusan])
                                });
                                rl.pause();
                                console.log(table.toString());
                                rl.resume();
                                rl.question('Kode Jurusan :', function (id_jurusan) {
                                    const sql = 'INSERT INTO mahasiswa (nim, Nama, tgl_lahir, alamat_mhs, id_jurusan) VALUES (?,?,date(?),?,?)';
                                    db.run(sql, [nim, nama_mhs, tgl_lahir, alamat_mhs, id_jurusan], function (err) {
                                        if (err) {
                                            console.error(err.message);
                                        } else {
                                            console.log('\nMahasiswa telah ditambahkan');
                                            const sql2 = 'SELECT mahasiswa.nim, mahasiswa.Nama, mahasiswa.tgl_lahir, mahasiswa.alamat_mhs, jurusan.id_jurusan, jurusan.nama_jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan';
                                            db.all(sql2, (err, rows) => {
                                                if (err) throw err;
                                                const table = new Table({
                                                    head: ['nim', 'Nama', 'Tanggal Lahir', 'alamat_mhs', 'Kode Jurusan', 'Nama Jurusan']
                                                });
                                                rows.forEach((sql) => {
                                                    table.push([sql.nim, sql.nama_mhs, sql.tgl_lahir, sql.alamat_mhs, sql.id_jurusan, sql.nama_jurusan])
                                                });
                                                console.log(table.toString());
                                                optionMahasiswa();
                                            });
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    static hapusMahasiswa() {
        rl.question('Masukkan nim mahasiswa : ', function (nim) {
            const sql = 'DELETE FROM mahasiswa WHERE nim = ?';
            db.run(sql, [nim], function (err) {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log(`Data Mahasiswa ${nim} telah dihapus`)
                }
                optionMahasiswa();
            });
        });
    }
}

class Dosen {
    static daftarDosen() {
        const sql = 'SELECT * FROM dosen';
        db.all(sql, (err, rows) => {
            if (err) throw err;
            // Buat Table 
            const table = new Table({
                head: ['NIP', 'Nama dosen']
            });

            // Tambah rows ke Table
            rows.forEach((sql) => {
                table.push([sql.nip, sql.nama_dosen])
            });

            // Munculin table di CLI
            console.log(table.toString());

            optionDosen();
        });
    };
    static cariDosen() {
        rl.question('Masukkan nip dosen : ', function (Search_Dosen) {
            const sql = `SELECT * FROM dosen WHERE nip LIKE '%${Search_Dosen}%'`;
            db.all(sql, (err, rows) => {
                if (err) throw err;
                if (rows.length > 0) {
                    console.log(`Detail Jurusan dengan Kode '${rows[0].nip}' :`);
                    console.log(`nip            : ${rows[0].nip}`);
                    console.log(`Nama dosen     : ${rows[0].nama_dosen}`);
                } else {
                    console.log(`dosen dengan nip ${Search_Dosen} tidak terdaftar`);
                }
                optionDosen();
            });
        });
    }

    static tambahDosen() {
        console.log('Lengkapi data dibawah ini : ')
        const sql = 'SELECT * FROM dosen';
        db.all(sql, (err, rows) => {
            if (err) throw err;
            // Buat Table 
            const table = new Table({
                head: ['nip', 'Nama Dosen']
            });

            // Tambah rows ke Table
            rows.forEach((sql) => {
                table.push([sql.nip, sql.nama_dosen])
            });

            // Munculin table di CLI
            console.log(table.toString());
            rl.question('nip : ', function (nip) {
                rl.question('Nama Dosen : ', function (nama_dosen) {
                    const sql = 'INSERT INTO jurusan (nip, nama_dosen) VALUES (?, ?)';
                    db.run(sql, [nip, nama_dosen], function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log('Dosen telah ditambahkan ke database');
                        }
                        // db.close();
                        optionDosen()
                    });
                });
            });
        });
    }

    static hapusDosen() {
        rl.question('Masukkan nip Dosen : ', function (nip) {
            const sql = 'DELETE FROM dosen WHERE nip = ? ';
            db.run(sql, [nip], function (err) {
                if (err) {
                    console.error(err.message)
                } else {
                    console.log(`Data Dosen ${nip}, telah dihapus.`)
                }
                optionDosen();
            });
        });
    };
}

class matakuliah {
    static daftarMatkul() {
        const sql = 'SELECT * FROM matakuliah';
        db.all(sql, (err, rows) => {
            if (err) throw err;
            // Buat Table 
            const table = new Table({
                head: ['id', 'nama matakuliah', 'SKS']
            });

            // Tambah rows ke Table
            rows.forEach((sql) => {
                table.push([sql.id_mk, sql.nama_mk, sql.sks])
            });

            // Munculin table di CLI
            console.log(table.toString());

            optionMataKuliah();
        });
    };
    static cariMatkul() {
        rl.question('Masukkan Kode matakuliah : ', function (Search_Matkul) {
            const sql = `SELECT * FROM matakuliah WHERE id_mk LIKE '%${Search_Matkul}%'`;
            db.all(sql, (err, rows) => {
                if (err) throw err;
                if (rows.length > 0) {
                    console.log(`Detail Matakuliah dengan Kode matakuliah '${rows[0].id_mk}' :`);
                    console.log(`Kode Matakuliah : ${rows[0].id_mk}`);
                    console.log(`Nama Matakuliah : ${rows[0].nama_mk}`);
                    console.log(`SKS             : ${rows[0].sks}`)
                } else {
                    console.log(`matakuliah dengan kode matakuliah ${Search_Matkul} tidak terdaftar`);
                }
                optionMataKuliah();
            });
        });
    }

    static tambahMatkul() {
        console.log('Lengkapi data dibawah ini : ')
        const sql = 'SELECT * FROM matakuliah';
        db.all(sql, (err, rows) => {
            if (err) throw err;
            // Buat Table 
            const table = new Table({
                head: ['kode matkul', 'Nama matkul', 'sks']
            });

            // Tambah rows ke Table
            rows.forEach((sql) => {
                table.push([sql.id_mk, sql.nama_mk, sql.sks])
            });

            // Munculin table di CLI
            console.log(table.toString());
            rl.question('kode mk : ', function (id_mk) {
                rl.question('Nama Dosen : ', function (nama_mk) {
                    rl.question('SKS', function (sks) {
                        const sql = 'INSERT INTO matakuliah (id_mk, nama_mk, sks) VALUES (?, ?, ?)';
                        db.run(sql, [nip, nama_dosen], function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log('Dosen telah ditambahkan ke database');
                            }
                            // db.close();
                            optionMataKuliah()
                        });
                    });
                });
            });
        });
    }

    static hapusMatkul() {
        rl.question('Masukkan id matakuliah : ', function (id_mk) {
            const sql = 'DELETE FROM matakuliah WHERE id_mk = ? ';
            db.run(sql, [id_mk], function (err) {
                if (err) {
                    console.error(err.message)
                } else {
                    console.log(`Data matakuliah ${id_mk}, telah dihapus.`)
                }
                optionMataKuliah();
            });
        });
    };
}

class kontrak {
    static tampilKontrak(next) {
        const query = `
        SELECT kontrak.id_kontrak, mahasiswa.nim, mahasiswa.nama_mhs, matakuliah.nama_mk, dosen.nama_dosen, kontrak.nilai
        FROM kontrak 
        INNER JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
        INNER JOIN matakuliah ON kontrak.id_mk = matakuliah.id_mk
        INNER JOIN dosen ON kontrak.nip = dosen.nip
    `

        db.all(query, [], (error, rows) => {
            if (error) {
                console.error('Error executing query: ' + error.stack)
                return
            }

            const table = new Table({
                head: ['ID', 'NIM', 'Nama', 'Mata kuliah', 'Dosen', 'Nilai'],
                colWidths: [5, 20, 20, 20, 20, 14]
            })

            rows.forEach((row) => {
                const formatRow = ([row.id_kontrak || '', row.nim || '', row.nama_mhs || '', row.nama_mk || '', row.nama_dosen || '', row.nilai || ''])
                table.push(formatRow)
            })

            console.log(table.toString())
            console.log('')
            next()
        })
    }

    static tampilMataKuliah(next) {
        const query = `
        SELECT * FROM matakuliah
        `
        db.all(query, [], (error, rows) => {
            if (error) {
                console.error('Error executing query: ' + error.stack)
                return
            }

            const table = new Table({
                head: ['Kode Matkul', 'Nama Matkul', 'SKS'],
                colWidths: [20, 20, 10]
            })

            rows.forEach((row) => {
                table.push([row.id_mk, row.nama_mk, row.sks])
            })

            console.log(table.toString())
            console.log('')
            next()
        })
    }

    static tampilDosen(next) {
        const query = `
        SELECT * FROM dosen
        `
        db.all(query, [], (error, rows) => {
            if (error) {
                console.error('Error executing query: ' + error.stack)
                return
            }

            const table = new Table({
                head: ['NIP', 'Nama Dosen'],
                colWidths: [10, 20]
            })

            rows.forEach((row) => {
                table.push([row.nip, row.nama_dosen])
            })

            console.log(table.toString())
            console.log('')
            next()
        })
    }

    static tampilMhs(nim, next) {
        const query = `
        SELECT kontrak.nim, kontrak.id_kontrak, matakuliah.nama_mk, kontrak.nilai
        FROM kontrak
        INNER JOIN matakuliah ON kontrak.id_mk = matakuliah.id_mk
        INNER JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
        WHERE mahasiswa.nim = ?
        `
        db.all(query, [nim], (error, rows) => {
            if (error) {
                console.error('Error executing query: ' + error.stack)
                return
            }

            const table = new Table({
                head: ['ID', 'Mata Kuliah', 'Nilai'],
                colWidths: [10, 20, 10]
            })

            rows.forEach((row) => {
                // table.push([row.id_kontrak, row.nama_mk, row.nilai])
                const tes = ([row.id_kontrak, row.nama_mk, row.nilai || ''])
                table.push(tes)
            })

            console.log(table.toString())
            console.log('')
            next()
        })
    }

    static daftarKontrak() {
        kontrak.tampilKontrak(() => {
            optionKontrak()
        })
    }

    static cariKontrak() {
        kontrak.tampilKontrak(() => {
            rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
                const query = `
                SELECT * FROM kontrak
                WHERE nim = ?
            `;
                db.all(query, [nim], (error, rows) => {
                    if (error) {
                        console.error('Error executing query: ' + error.stack);
                        return;
                    }

                    if (rows.length > 0) {
                        const table = new Table({
                            head: ['ID', 'NIM', 'Kode Mata kuliah', 'NIP', 'Nilai'],
                            colWidths: [5, 20, 20, 20, 10]
                        });

                        rows.forEach((row) => {
                            const rowData = [row.id_kontrak, row.nim, row.id_mk, row.nip, row.nilai || ''];
                            table.push(rowData);
                        });

                        console.log(table.toString());
                        console.log('');

                        optionKontrak();
                    } else {
                        console.log('\n============================================================================================================\n');
                        console.log(`Mahasiswa dengan nim ${nim}, tidak terdaftar.`);
                        optionKontrak()
                    }
                })
            })
        })
    }

    static tambahKontrak() {
        console.log('\n-- Tambah Kontrak --')
        console.log('\nLengkapi data dibawah ini :')
        kontrak.tampilKontrak(() => {
            rl.question('Masukan NIM : ', (nim) => {
                kontrak.tampilMataKuliah(() => {
                    rl.question('Masukan Kode Matakuliah : ', (id_mk) => {
                        kontrak.tampilDosen(() => {
                            rl.question('masukan NIP dosen : ', (nip) => {
                                const query = 'INSERT INTO kontrak(nim, id_mk, nip) VALUES (?, ?, ?)'
                                db.run(query, [nim, id_mk, nip], (error) => {
                                    if (error) {
                                        console.error('Error executing query: ' + error.stack)
                                        return
                                    }
                                    kontrak.tampilKontrak(() => {
                                        console.log('Kontrak telah ditambahkan.\n')
                                        optionKontrak()
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }
    static hapusKontrak(){
        rl.question('\nMasukkan ID Kontrak yang ingin dihapus: ', (id_kontrak) => {
            const querySelect = 'SELECT * FROM kontrak WHERE id_kontrak = ?'
            db.get(querySelect, [id_kontrak], (error, row) => {
                if (error) {
                    console.error('Error executing query: ' + error.stack)
                    return
                }

                if (row) {
                    const queryDelete = 'DELETE FROM kontrak WHERE id_kontrak = ?'
                    db.run(queryDelete, [id_kontrak], (error) => {
                        if (error) {
                            console.error('Error executing query: ' + error.stack)
                            return
                        }

                        console.log(`Data kontrak dengan ID ${id_kontrak}, telah dihapus\n`)
                        console.log('\n============================================================================================================\n')
                        optionKontrak()
                    })
                } else {
                    console.log('Kode Kontrak tersebut tidak ditemukan.\n')
                    optionKontrak()
                }
            })
        })
    }
    static updateKontrak(){
        console.log('\n-- Update Nilai Kontrak --')
        kontrak.tampilKontrak(() => {
            rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
                console.log('\n============================================================================================================\n')
                console.log(`Detai mahasiswa dengan nim '${nim}' :`)
                kontrak.tampilMhs(nim, () => {
                    rl.question('Masukkan ID yang ingin dirubah nilainya : ', (id_kontrak) => {
                        rl.question('Tulis Nilai Baru : ', (nilai) => {
                            const query = 'UPDATE kontrak SET nilai = ? WHERE id_kontrak = ?'
                            db.run(query, [nilai, id_kontrak], (error) => {
                                if (error) {
                                    console.error('Error executing query: ' + error.stack)
                                    return
                                }
                                console.log('Nilai kontrak telah diperbarui.\n')
                                optionKontrak()
                            })
                        })
                    })
                })
            })
        })
    }
}
login()