const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "tulis kalimatmu disini > "
});
rl. prompt()

rl.on('line', (answer) => {
    let words = answer.split(" ")
    for (let i = 0; i < words.length; i++) {
        if(words[i][0] == "a" || words[i][0] == "i" || words[i][0] == "u" || words[i][0] == "e" || words[i][0] == "o" ){
            words[i]
        }else{
            words[i] = words[i].substr(1) + words[i][0] + "nyo";
        }
    }
    hasil = words.join(" ")
    console.log(`hasil konvesrsi: ${hasil}`)
    rl.prompt()
})
rl.on('close', () =>{
    console.log(`Goodbye!`)
    process.exit()
})