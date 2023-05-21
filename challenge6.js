function sentencesManipulation(sentences){
    let words = sentences.split(" ")
    for (let i = 0; i < words.length; i++) {
        if(words[i][0] == "a" || words[i][0] == "i" || words[i][0] == "u" || words[i][0] == "e" || words[i][0] == "o" ){
            words[i]
        }else{
            words[i] = words[i].substr(1) + words[i][0] + "nyo";
        }
    }
    return words.join(" ")
}
console.log(sentencesManipulation("ibu pergi ke pasar bersama aku"))