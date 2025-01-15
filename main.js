const process = require('process')

const username = process.argv.slice(2, 3)

fetch(`https://api.github.com/users/${username[0]}`)
    .then(res => {
        if (!res.ok) {
            throw new Error(`Ошибка запроса, блин :c. ${res.status}`)
        }
        return res.json()
        })
    .then(data => console.log(data.public_repos))

