import YAML from "yaml"
import QuerySet from "./QuerySet"

export default class QuerySetParsing {
  parse(yamlToParse): QuerySet {
    const data = YAML.parse(yamlToParse)
    return new QuerySet(data)
  }
}
