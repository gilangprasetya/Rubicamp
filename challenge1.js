function sum(...arr) {
    var tot = 0;
    for(var i = 0; i < arr.length; i++){
        tot = tot + arr[i]
    }
    return tot
}
console.log(sum(1, 2, 3, 9, -2))