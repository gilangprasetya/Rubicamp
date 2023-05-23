const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Tebakan : "
});
fs.readFile('data.json', 'utf8', (err, isi) => {
    if(err) throw err
    const data = JSON.parse(isi)
    // console.log(data)
    index = 0
    console.log(`pertanyaan : ${data[index].definition}`)
    rl.prompt()
    rl.on('line', (jawab) =>{
        let jawaban = jawab.toLowerCase()
        if(jawaban == data[index].term){
            console.log(`selamat anda benar
`)
            index++
        }else{
            console.log(`anda kurang beruntung!!!
`)
        }
        if(index == data.length){
            console.log(`hore anda menang`)
            rl.close()
        }
        console.log(`pertanyaan : ${data[index].definition}`)
        rl.prompt()
    }).on('close', () =>{
        process.exit()
    })
})
