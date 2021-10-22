import Yargs from "yargs/yargs"
import path from "path"
import { readFileSync } from "fs"
import QuerySetParsing from "./cli/QuerySetParsing"
import SearchResultDisplay from "./cli/SearchResultDisplay"
// import Search from "./shortcut/Search"
// import WorkflowList from "./shortcut/WorkflowList"
// import WorkflowMap from "./shortcut/WorkflowMap"


Yargs(process.argv.slice(2)).
  scriptName("shortcut").usage('$0 <cmd> [args]').
  help().
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  command('query', 'list stories requiring review', () => {}, async () => {
    const querySetParsing = new QuerySetParsing()
    const yamlPath = path.join(process.env["HOME"], ".shortcut.yml")
    const querySet = querySetParsing.parse(readFileSync(yamlPath).toString())
    const set = await querySet.retrieve()
    const display = new SearchResultDisplay(set)
    console.log(display.toCliString())
  }).argv
