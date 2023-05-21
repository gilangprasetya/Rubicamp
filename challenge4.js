function indexPrime(param1) {
    let hasil = [];
    for (let i=2;; i++) {
        let prime=true
      for (let j=2; j<i; j++) {
          if(i%j==0){
              prime=false
          }
      }
      if(prime){
          hasil.push(i)
      }
      if(hasil.length==param1){
          break;
      }
    }
    return hasil[hasil.length - 1];
  }
  
  console.log(indexPrime(37786))