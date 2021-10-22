import chalk from "chalk";
import { EnhancedStory } from "../shortcut/EnhancedStory";
import { EnhancedStorySearchResult } from "../shortcut/EnhancedStorySearchResult";
import { SearchResultShape } from "./QuerySet";

export default class SearchResultDisplay {
  results: SearchResultShape
  noResultProjects: string[]

  constructor(results: SearchResultShape) {
    this.results = results
  }

  toCliString(): string {
    this.noResultProjects = []
    return Object.keys(this.results).reduce((displayText, projectName) => {
      const searchResults = Object.values(this.results[projectName])
      if(this.hasResults(searchResults)) {
        displayText += chalk.green(projectName) + "\n===\n"
        displayText += this.displayQueries(searchResults)
      }
      else {
        this.noResultProjects.push(projectName)
      }

      return displayText
    }, "") + this.noResultDisplay()
  }

  private displayQueries(searchResults: EnhancedStorySearchResult[]) {
    if(this.hasResults(searchResults)) {
      return searchResults.reduce((displayText, searchResult) => {
        displayText += searchResult.data.map((story: EnhancedStory) => this.displayStory(story)).join("\n") + "\n"
        return displayText
      }, "")
    }
    return ""
  }

  private displayStory(story: EnhancedStory) {
    let displayText = ""
    displayText += chalk.yellow(story.name) + "\n"
    displayText += chalk.blueBright(story.app_url) + "\n"
    displayText += story.workflow_state_name + "\n"
    displayText += "-----\n"
    return displayText
  }

  private hasResults(searchResults: EnhancedStorySearchResult[]) {
    return searchResults.find((result) => result.data.length > 0)
  }

  private noResultDisplay() {
    if(this.noResultProjects.length > 0) {
      return chalk.cyanBright(this.noResultProjects.join(", ") + " had 0 results. Inbox zero ftw")
    }
    return ""
  }

}
