const process = require('process')

const username = process.argv.slice(2, 3)
const events = ['WatchEvent', 'CommitCommentEvent', 'CreateEvent', 'DeleteEvent', 'ForkEvent', 'GollumEvent', 'IssueCommentEvent', 'IssuesEvent', 'MemberEvent', 'PublicEvent', 'PullRequestEvent', 'PullRequestReviewEvent', 'PullRequestReviewCommentEvent', 'PullRequestReviewThreadEvent', 'PushEvent', 'ReleaseEvent', 'SponsorshipEvent']

const userActiviti = fetch(`https://api.github.com/users/${username[0]}/events`)
    .then(res => {
        if (!res.ok) {
            throw new Error(`Ошибка запроса, блин :c. ${res.status}`)
        }
        return res.json()
        })
    // .then(data => console.log(data))

let eventsActivity = []
let count = 0

for (let i = 0; i < userActiviti.length; i++) {
    for (let j = 0; j < userActiviti.length; j++) {
        if (userActiviti[i].type === events[i]) {
            count++
        }
        eventsActivity.push({[events[i]]:count})
        count = 0
    }
}

// console.log(eventsActivity)
console.log(userActiviti.length)


