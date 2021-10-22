import Shortcut from "clubhouse-lib"
import { EnhancedStory } from "./EnhancedStory";
import { EnhancedStorySearchResult } from "./EnhancedStorySearchResult";
import WorkflowList from "./WorkflowList";
import WorkflowMap from "./WorkflowMap";

export default class Search {
  token: string
  workflowMap: WorkflowMap

  constructor({token}: {token: string}) {
    this.token = token;
  }

  async retrieve(searchString: string): Promise<EnhancedStorySearchResult> {
    if(!this.workflowMap) {
      const workflowList = new WorkflowList({token: this.token})
      const workflows = await workflowList.retrieve()
      this.workflowMap = new WorkflowMap(workflows)
    }
    const client = Shortcut.create(this.token)
    // return client.searchStories('state:"Ready for Review" project:"LaunchAcademy.com Website"')
    return client.searchStories(searchString).then((searchResult: EnhancedStorySearchResult) => {
      return {
        ...searchResult,
        data: searchResult.data.map((story: EnhancedStory) => ({
          ...story,
          workflow_state_name: this.workflowMap.get(story.workflow_id)?.stateMap.get(story.workflow_state_id)?.name
        }))
      }
    }) as Promise<EnhancedStorySearchResult>

  }
}
