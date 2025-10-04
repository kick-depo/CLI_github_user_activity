import requests, argparse, json

parser = argparse.ArgumentParser()
parser.add_argument('username')
args = parser.parse_args()

url = f"https://api.github.com/users/{args.username}/events"

response = requests.get(url).json()

actions = []

for i in response:
    item = [i["type"], i["repo"]["url"].replace("https://api.github.com/repos/", "")]
    if item[0] == "PushEvent":
        item.append([i["payload"]["size"]])
    actions.append(item)

for i in actions:
    if i[0] == "PushEvent":
        event_action, repo_name, size = i
        size = int(size[0])
    else: 
        event_action, repo_name = i
    
    if i[0] == "PushEvent":
        print(f"Pushed {size} commits to {repo_name}")
    elif i[0] == "WatchEvent":
        print(f"Starred {repo_name}")
    else:
        print(f"{event_action.replace("Event", "")} in {repo_name}")


