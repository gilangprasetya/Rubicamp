const fs = require('fs')
const process = require('process')
const { compileFunction } = require('vm')

const todo = `>>> JS TODO <<<
$ node tudo.js <command>
$ node tudo.js list
$ node tudo.js task <task.id>
$ node tudo.js add <task_content>
$ node tudo.js delete <task_id>
$ node tudo.js complete <task_id>
$ node tudo.js uncomplete <task_id>
$ node tudo.js list:outstanding asc|desc
$ node tudo.js list:complete asc|desc
$ node tudo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
$ node tudo.js filter:<tag_name>`

// console.log(todo)
let args = process.argv[2]
let args1 = process.argv[3]

let isi = fs.readFileSync('data.json')
let data = JSON.parse(isi)

if(args == undefined){
    console.log(todo)
}else{
    switch(args){
        case 'list':
            console.log(`Daftar Pekerjaan`)
            for(i = 0; i < data.length; i++){
                if(data[i].status == true){
                    console.log(`${i+1}.[x] ${data[i].sentence}`)
                }else{
                    console.log(`${i+1}.[ ] ${data[i].sentence}`)
                }
            }break;
        case 'task':
            console.log("Daftar Pekerjaan")
            for (let i = 0; i < data.length; i++){
                if(args1 == data[i].id){
                    if (data[i].status == true) {
                        console.log(`task_id ${i+1}. [x] ${data[i].sentence}`)
                    } else {
                        console.log(`task_id ${i+1}. [ ] ${data[i].sentence}`)
                    }
                }
            }
            break;
        case 'add':
            let index = 1
            for(i = 0; i < data.length; i++){
                index++
            }
            let sentence = process.argv.slice(3).join(' ')
            data.push({
                "id": index,
                "sentence": sentence,
                "status": false,
                "tags": []
            })
            fs.writeFileSync('data.json', JSON.stringify(data, null, 3))
            console.log(`${sentence} telah ditambahkan`)
            break;
        case 'delete':
            let hapus = args1 - 1
            let deleteItem = data[hapus]
            data.splice(hapus, 1)
            fs.writeFileSync('data.json', JSON.stringify(data, null, 3))
            console.log(`${deleteItem.sentence} telah dihapus dari daftar`)
            break;
        case 'complete':
            let done = args1 - 1
            let doneItem = data[done]
            doneItem.status = true
            fs.writeFileSync('data.json', JSON.stringify(data, null, 3))
            console.log(`${doneItem.sentence} telah selesai`)
            break;
        case 'uncomplete':
            let undone = args1 - 1
            let undoneItem = data[undone]
            undoneItem.status = false
            fs.writeFileSync('data.json', JSON.stringify(data, null, 3))
            console.log(`${undoneItem.sentence} status selesai dibatalkan`)
            break;
        case 'list:outstanding':
            if(args1 == 'asc'){
                console.log(`Daftar Pekerjaan`)
                for(i = 0; i < data.length; i++){
                    if(data[i].status == false){
                        console.log(`${i+1}.[ ] ${data[i].sentence}`)
                    }
                }
            }else{
                console.log(`Daftar Pekerjaan`)
                for(i = data.length - 1; i >= 0; i--){
                    if(data[i].status == false){
                        console.log(`${i+1}.[ ] ${data[i].sentence}`)
                    }
                }
            }break;
        case 'list:complete':
            if(args1 == 'asc'){
                console.log(`Daftar Pekerjaan`)
                for(i = 0; i < data.length; i++){
                    if(data[i].status == true){
                        console.log(`${i+1}.[x] ${data[i].sentence}`)
                    }
                }
            }else{
                console.log(`Daftar Pekerjaan`)
                for(i = data.length - 1; i >= 0; i--){
                    if(data[i].status == true){
                        console.log(`${i+1}.[x] ${data[i].sentence}`)
                    }
                }

            }break;
        case 'tag':
            let tagsIndex = args1 - 1
            let tagsItem = data[tagsIndex]
            let datas = process.argv.slice(4)
            tagsItem.tags = tagsItem.tags.concat(datas)
            fs.writeFileSync('data.json', JSON.stringify(data, null, 3))
            console.log(`${datas} telah ditambahkan ke dalam tags ${args1}`)
            break;
        case args:
            console.log(`Daftar Pekerjaan`)
            let keyword = args.split(':')
            let foundData = false
                
            for (let i = 0; i < data.length; i++) {
                if(keyword[0] == 'filter'){
                    if (data[i].tags.includes(keyword[1])) {
                        foundData = true
                        if (data[i].status == true) {
                            console.log(`${i+1}. [x] ${data[i].sentence}`)
                        } else {
                            console.log(`${i+1}. [ ] ${data[i].sentence}`)
                        }
                    }
                }else{
                    console.log(`command tidak ditemukan`)
                    console.log(todo)
                    return;
                }
            }
            if (!foundData) {
                console.log(`Kata tidak ditemukan`)
            }
            break;
    }
}