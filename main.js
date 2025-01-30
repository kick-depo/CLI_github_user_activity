const process = require('process')

const username = process.argv.slice(2, 3)
const events = ['WatchEvent', 'CommitCommentEvent', 'CreateEvent', 'DeleteEvent', 'ForkEvent', 'GollumEvent', 'IssueCommentEvent', 'IssuesEvent', 'MemberEvent', 'PublicEvent', 'PullRequestEvent', 'PullRequestReviewEvent', 'PullRequestReviewCommentEvent', 'PullRequestReviewThreadEvent', 'PushEvent', 'ReleaseEvent', 'SponsorshipEvent']

async function getUserActiviti() {
    const userActiviti = await fetch(`https://api.github.com/users/${username[0]}/events`)
    .then(res => {
        if (!res.ok) {
            throw new Error(`Ошибка запроса, блин :c. ${res.status}`)
        }
        return res.json()
        })

    let eventsActivity = []
    let count = 0
    let url = ''

    for (let i = 0; i < events.length; i++) {
        
        for (let j = 0; j < userActiviti.length; j++) {
            url = userActiviti[j].repo.name
            if (userActiviti[j].type === events[i]) {
                count++
            } 
        }
        if (count !== 0) {
            eventsActivity.push([events[i], count, url])
        }
        
        // eventsActivity.push({[events[i]]:count})
        count = 0
    }
    return eventsActivity
}

getUserActiviti().then(data => console.log(data))





