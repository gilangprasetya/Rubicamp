const fs = require('fs');
const readline = require('readline');
const process = require('process')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Jawaban : "
});
    let fileName = process.argv[2]
    if(fileName == undefined){
        console.log(`Tolong sertakan nama file sebagai inputannya
Misalnya : 'node challenge12.js data.json'`)
                rl.close()
    }else{
        fs.readFile(fileName, (err, isi) => {
        if(err) throw err
        const data = JSON.parse(isi)
        // console.log(data)
        let index = 0
        let salah = 0
        console.log(`Selamat datang di permainan Tebak-tebakan. Kamu akan diberikan pertanyaan dari file ini ${fileName}
untuk bermain, jawablah dengan jawaban sesuai.
Gunakan 'skip' untuk menangguhkan pertanyaanya, dan di akhir pertanyaan akan ditanyakan lagi \n`)
        console.log(`pertanyaan : ${data[index].definition}`)
        rl.prompt()
        rl.on('line', (jawab) =>{
            let jawaban = jawab.toLowerCase()
            if(jawaban == 'skip'){
                data.push(data[index])
                data.splice(index, 1)
                salah = 0
                console.log(`\npertanyaan : ${data[index].definition}`)
            }else{
                if(jawaban == data[index].term){
                    console.log(`\nAnda beruntung!`)
                    salah = 0
                    index++
                    if(index == data.length){
                        console.log(`\nAnda Berhasil!`)
                        rl.close()
                    }else{
                        console.log(`\npertanyaan : ${data[index].definition}`)
                    }
                }else{
                    salah++
                    console.log(`\nanda kurang beruntung! anda telah salah ${salah} kali silahkan coba lagi`)
                }
            }
            // if(index == data.length){
            //     console.log(`Anda Berhasil!`)
            //     rl.close()
            // }
            rl.prompt()
        }).on('close', () =>{
            process.exit()
        })
    })
}