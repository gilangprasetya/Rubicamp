function pola(str){
    let num = str.split(" ")
    let miss = []
    for(let i = 0; i <= 9; i++){
        for(let j = 0; j <= 9; j++){
            if(num[0].replace("#", i) * num[2] == num[4].replace("#", j)){
                miss.push(i)
                miss.push(j)
            }
        }
    }
    return miss
}
console.log(pola("42#3 * 188 = 80#204"))
