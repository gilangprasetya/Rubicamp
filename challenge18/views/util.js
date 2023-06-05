import readline from 'readline';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export function line() {
    console.log('=====================================================================================================')
}

export function welcome (){
    line()
    console.log('Welcome to Universitas Pendidikan Indonesia')
    console.log('Jl. Setiabudhi No.255')
    line()
    
}