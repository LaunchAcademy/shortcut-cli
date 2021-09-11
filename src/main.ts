import Yargs from "yargs/yargs"
import Search from "./shortcut/Search"
import WorkflowList from "./shortcut/WorkflowList"
import WorkflowMap from "./shortcut/WorkflowMap"


Yargs(process.argv.slice(2)).
  scriptName("shortcut").usage('$0 <cmd> [args]').
  help().
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  command('query', 'list stories requiring review', () => {}, async () => {
    const token = process.env.SHORTCUT_API_KEY
    const workflowList = new WorkflowList({token})
    const workflows = await workflowList.retrieve()
    const workflowMap = new WorkflowMap(workflows)


    const search = new Search({token})
    const {data: stories } = await search.retrieve()
    console.log(stories[0])
    const workflow = workflowMap.get(stories[0].workflow_id)
    console.log(workflow.stateMap.get(stories[0].workflow_state_id))
  }).argv
