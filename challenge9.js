function spiral(param1){
    let matrix = []
    let count = 0
    for(let i = 0; i < param1; i++){
        matrix[i] = []
        for(let j = 0; j < param1; j++){
            // console.log(matrix)
            matrix[i][j] = count
            count++
        }
    }
    // console.log(matrix)
    let hasil = []
    let kiri = 0
    let kanan = matrix[0].length
    let bawah = matrix.length
    let atas = 1
    let turun = param1 - 1
    while(hasil.length < param1*param1){
        for(let i = kiri; i < kanan; i++){
            hasil.push(matrix[kiri][i])
        }
        for(let i = atas; i < bawah; i++){
            hasil.push(matrix[i][turun])
        }
        for(let i = kanan - 2; i >= kiri; i--) {
            hasil.push(matrix[turun][i]);
        }
        for(let i = bawah -2; i > kiri; i--){
            hasil.push(matrix[i][kiri])
        }
        kanan--
        bawah--
        turun--
        kiri++
        atas++
    }
    console.log(hasil)
}
spiral(5)
spiral(6)
spiral(7)