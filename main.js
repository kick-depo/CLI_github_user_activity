const process = require('process')

const username = process.argv.slice(2, 3)

fetch(`https://api.github.com/users/${username[0]}`)
    .then(res => res.json())
    .then(res => console.log(res.public_repos))
    .catch(err => console.log(`Ошибка запроса :c`, err.message))

