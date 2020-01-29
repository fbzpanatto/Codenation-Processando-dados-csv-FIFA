'use strict'

const fs = require('fs');

const csvJSON = (csv) => {
    let lines = csv.split("\n");  
    let result = [];
    let indexes = [0,1,2,3,6,14,17]
    let headers = lines.shift().split(",");
    lines.forEach(line => {
        let obj = {}
        let current = line.split(",");
        current.forEach((block, index) => {
            if(indexes.includes(index))
                obj[headers[index]] = block;
        });
        result.push(obj)
    });
    return result;
  }

const to_read = () =>{
    return csvJSON(fs.readFileSync('./data.csv', 'utf8'));
}

const data = to_read();

data.forEach(value => {
    value['eur_wage'] = +value['eur_wage']
    value['age'] = +value['age']
})

//Quantas nacionalidades (coluna `nationality`) diferentes existem no arquivo? 
const q1 = () => {
    const mySearch = data.slice()
    const total = mySearch.reduce((acc, curr) => {
        if(!acc.includes(curr['nationality'])){
            acc.push(curr['nationality'])
        }
        return acc
    }, [])
    return total.length
}

//Quantos clubes (coluna `club`) diferentes existem no arquivo?
const q2 = () => {
    const mySearch = data
    const result = []
    mySearch.forEach(value => {
        if(!value.club == ''){
            // if(value.club !== '')
            result.push(value.club)
        }
    })
    const clubs = result.filter((item, index) => {
        return result.indexOf(item) === index
    })
    return (clubs.length)
}

//Liste o primeiro nome dos 20 primeiros jogadores de acordo com a coluna `full_name`.
const q3 = () => {
    const mySearch = data
    const first20 = mySearch.reduce((acc, curr) => {
        if(acc.length < 20){
            acc.push(curr['full_name'])
        }
        return acc
    }, [])
    return first20
}

//Quem são os top 10 jogadores que ganham mais dinheiro (utilize as colunas `full_name` e `eur_wage`)?
const q4 = () => {
    const mySort = data
    const playersByWage = mySort.sort((a, b) => {
        let result = b.eur_wage - a.eur_wage
        if (result === 0){
            result = a.full_name.localeCompare(b.full_name)
        }
        return result
    })
    const finalArray = playersByWage.reduce((acc, next) => {
        if(acc.length < 10) acc.push(next.full_name)
        return acc
    }, [])
    return finalArray
}

//Quem são os 10 jogadores mais velhos (use como critério de desempate o campo `eur_wage`)?
const q5 = () => {
    const mySort = data
    const playersByAge = mySort.sort((a, b) => {
        if (a.age > b.age) {
            return -1;
          }
    
          if (b.age > a.age) {
            return 1;
          }
    
          if (a.eur_wage > b.eur_wage) {
            return -1;
          }
    
          if (b.eur_wage > a.eur_wage) {
            return 1;
          }
    
          return 0;
    })
    const finalArray = playersByAge.reduce((acc, next) => {
        if(acc.length < 10) acc.push(next.full_name)
        return acc
    }, [])
    return finalArray
}

//Conte quantos jogadores existem por idade. Para isso, construa um mapa onde as 
// chaves são as idades e os valores a contagem.
const q6 = () => {
    const mydata = data;
    return mydata.reduce((obj, player)=>{
        if(!obj[player['age']]) obj[player['age']] = 0;
        obj[player['age']]++;
        return obj;
    },{});
}

console.log(q6())

module.exports = { q1, q2, q3, q4, q5, q6 }
