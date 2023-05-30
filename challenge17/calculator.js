const PI = 22/7

class Calculator{
    constructor(){
        this.x = 1
    }

    add(value){
        this.x += value
        return this
    }

    substract(value){
        this.x -= value
        return this
    }

    divide(value){
        if (value !== 0) {
            this.x /= value
          } else {
            console.log("Error: Tidak dapat membagi dengan nilai 0!")
          }
          return this
    }

    multiply(value){
        this.x *= value
        return this
    }
    
    square(){
        this.x *= this.x
        return this
    }

    squareRoot(){
        if (this.x >= 0) {
            this.x = Math.sqrt(this.x)
          } else {
            console.log("Error: Tidak dapat menghitung akar kuadrat dari angka negatif!")
          }
          return this
    }

    exponent(value){
        this.x = Math.pow(this.x, value)
        return this
    }

    result(){
        console.log(this.x)
    }
}

export {Calculator, PI}