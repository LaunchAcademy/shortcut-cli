import Shortcut from "clubhouse-lib"
import { EnhancedStorySearchResult } from "./EnhancedStorySearchResult";

export default class Search {
  token: string

  constructor({token}: {token: string}) {
    this.token = token;
  }
  async retrieve(): Promise<EnhancedStorySearchResult> {
    const client = Shortcut.create(this.token)
    // return client.searchStories('state:"Ready for Review" project:"LaunchAcademy.com Website"')
    return client.searchStories('project:"LaunchAcademy.com Website"') as Promise<EnhancedStorySearchResult>

  }
}
