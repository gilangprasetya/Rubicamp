function deretKaskus(n){
    var hasil = []
    for(var i = 3; i <= n*3; i+=3){  
        if(i % 5 == 0 && i % 6 == 0){
            hasil.push("KASKUS")
        }
        else if(i % 6 == 0){
            hasil.push("KUS")
        }
        else if(i % 5 == 0){
            hasil.push("KAS")
        }else{
            hasil.push(i)
        }
    }
    return hasil
}
console.log(deretKaskus(10))