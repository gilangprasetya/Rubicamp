function stringManipulation(word){
    let hurufAwal = word.charAt(0)
    let vocal = 'aiueo'
    if (vocal.includes(hurufAwal)){
        return word
    }
    return word = word.slice(1) + hurufAwal +'nyo'
}
console.log(stringManipulation('ayam'))