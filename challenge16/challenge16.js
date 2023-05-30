class Tyre {
    constructor(brand, size) {
        this.brand = brand
        this.size = size
    }

    getBrand() {
        return this.brand
    }

    getSize() {
        return this.size
    }
}

class Car {
    constructor(number, door, seat, tyre, year, warranty) {
        this.number = number
        this.door = door
        this.seat = seat
        this.tyre = tyre
        this.year = year
        this.warranty = warranty
    }

    getNumber() {
        return this.number
    }

    getDoor() {
        return this.door
    }

    getSeat() {
        return this.seat
    }

    getTyre() {
        return this.tyre
    }

    getYear() {
        return this.year
    }

    getWarranty() {
        this.warrantyProduce = Car.generateRandom(1, 3)
        return this.warrantyProduce
    }

    static generateRandom(min, max) {
        let difference = max - min + 1
        let random = Math.random()
        random = Math.floor(random * difference)
        random = random + min
        return random
    }

    generateSerialNumber() {
        let serialNumber = [8, 4, 4, 4, 12]
        const chars = '1234567890abcdefghijklmnopqrstuvwxyz'
        let sn1 = '', sn2 = '', sn3 = '', sn4 = '', sn5 = ''
        let randomSN
        for (let i = 0; i < serialNumber[0]; i++) {
            randomSN = Math.floor(Math.random() * chars.length)
            sn1 += chars.substring(randomSN, randomSN + 1)
        }
        for (let i = 0; i < serialNumber[1]; i++) {
            randomSN = Math.floor(Math.random() * chars.length)
            sn2 += chars.substring(randomSN, randomSN + 1)
        }
        for (let i = 0; i < serialNumber[2]; i++) {
            randomSN = Math.floor(Math.random() * chars.length)
            sn3 += chars.substring(randomSN, randomSN + 1)
        }
        for (let i = 0; i < serialNumber[3]; i++) {
            randomSN = Math.floor(Math.random() * chars.length)
            sn4 += chars.substring(randomSN, randomSN + 1)
        }

        for (let i = 0; i < serialNumber[4]; i++) {
            randomSN = Math.floor(Math.random() * chars.length)
            sn5 += chars.substring(randomSN, randomSN + 1)
        }
        return `${sn1}-${sn2}-${sn3}-${sn4}-${sn5}`
    }
}

class CarFactory {
    constructor() {
        console.log('Hasil produksi:')
        this.cars = []
    }

    produce(year) {
        const totalAgya = Car.generateRandom(1, 5)
        for (let i = 1; i <= totalAgya; i++) {
          let pembuatanAgya = new Agya(this.number, this.door, this.seat, this.tyre, year, this.warranty)
          this.cars.push(pembuatanAgya.produceAgya())
        }
        const totalRush = Car.generateRandom(1, 5)
        for (let i = 1; i <= totalRush; i++) {
          let pembuatanRush = new Rush(this.number, this.door, this.seat, this.tyre, year, this.warranty)
          this.cars.push(pembuatanRush.produceRush())
        }
      }

    result() {
        this.cars.forEach((item, index) => {
            console.log(`\nno.${index + 1}`)
            console.log(`varian     : ${item.varian}`)
            console.log(`sn         : ${item.sn}`)
            console.log(`door       : ${item.door}`)
            console.log(`seat       : ${item.seat}`)
            console.log(`tyre       : ${item.tyre.getBrand()} ${item.tyre.getSize()}`)
            console.log(`year       : ${item.year}`)
            console.log(`warranty   : ${item.warranty} year`)
        })
    }

    guaranteeSimulation(simulationYear) {
        console.log(`\nHasil simulasi garansi semua mobil pada tahun ${simulationYear}`)
        this.cars.forEach((item, index) => {
            console.log(`\nno.${index + 1}`)
            console.log(`varian     : ${item.varian}`)
            console.log(`sn         : ${item.sn}`)
            console.log(`door       : ${item.door}`)
            console.log(`seat       : ${item.seat}`)
            console.log(`tyre       : ${item.tyre.getBrand()} ${item.tyre.getSize()}`)
            console.log(`year       : ${item.year}`)
            console.log(`warranty   : ${item.warranty} year`)
            let stat = "";
            let result = item.year + item.warranty;
            if (result >= simulationYear) {
                stat = "active"
            } else {
                stat = "expired"
            }
            console.log(`\nstatus on ${simulationYear} this guarantee status is ${stat}`)
        });
    }
}

class Agya extends Car {
    produceAgya() {
        const tyre = new Tyre("Dunlop", "15 inch");
        return {
            varian: "Agya",
            sn: this.generateSerialNumber(),
            door: "5",
            seat: "5 seater",
            tyre: tyre,
            year: this.getYear(),
            warranty: this.getWarranty()
        }
    }
}

class Rush extends Car {
    produceRush() {
        const tyre = new Tyre("Bridgestone", "17 inch");
        return {
            varian: "Rush",
            sn: this.generateSerialNumber(),
            door: "5",
            seat: "7 seater",
            tyre: tyre,
            year: this.getYear(),
            warranty: this.getWarranty()
        }
    }
}

const toyota = new CarFactory()
toyota.produce(2020)
toyota.produce(2022)
toyota.result()
toyota.guaranteeSimulation(2025)