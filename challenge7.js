function weirdMultiply(sentence){
    if (sentence <= 9){
        return sentence
    }
    let hasil = 1;
    while(sentence > 0){
        let digit = sentence % 10;
        hasil *= digit
        sentence = Math.floor(sentence/10)
    }
    return weirdMultiply(hasil)
}
console.log(weirdMultiply(39))
