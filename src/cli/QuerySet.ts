import { EnhancedStorySearchResult } from "../shortcut/EnhancedStorySearchResult"
import Search from "../shortcut/Search"
import {all as mergeAll} from "deepmerge"

interface Query {
  name: string,
  query: string
}

interface ProjectQuery {
  name: string,
  apiKey: string,
  queries: Query[]
}
interface QuerySetShape {
  [key: string]: ProjectQuery
}

export interface SearchResultShape {
  [key: string]: {
    [queryKey: string]: EnhancedStorySearchResult
  }
}

export default class QuerySet {
  private _querySet: QuerySetShape

  constructor(data: QuerySetShape) {
    this._querySet = data
  }

  get projects(): QuerySetShape {
    return this._querySet
  }

  [Symbol.iterator](): IterableIterator<ProjectQuery> {
    return Object.values(this._querySet).values()
  }

  async retrieve(): Promise<SearchResultShape> {
    const flattenedSearchPromises = Object.keys(this.projects).reduce((promises, key) => {
      const project = this.projects[key]
      const search = new Search({token: project.apiKey})
      return [
        ...promises,
        ...project.queries.map((query) => search.retrieve(query.query).then((result) => {
          return {[project.name || key]: { [query?.name || "Query"]: result }}
        }))
      ]
    }, [])

    return Promise.all(flattenedSearchPromises).then(results => mergeAll(results) as SearchResultShape)
  }
}
