# Launch Academy - Shortcut CLI

## Install

```javascript
yarn global add @launchacademy/shortcut-cli
```

## Configure Your Shortcut Projects and Queries

In `~/.shortcut.yml`:

```yml
launchAcademy:
  apiKey: <API KEY>
  name: "Launch Academy"
  queries:
    - name: "Ready for Review"
      query: 'state:"Ready for Review"'
project2:
  apiKey: <API KEY>
  name: "Client Project"
  queries:
    - name: "Ready for Review"
      query: 'state:"Ready for Review"'
```

## Run Anywhere

```bash
shortcut query
```
