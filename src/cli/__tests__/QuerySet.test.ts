import { readFileSync } from "fs"
import path from "path"
import QuerySetParsing from "../QuerySetParsing"
describe("query set", () => {
  const yamlString = readFileSync(path.join(__dirname, "../../../tests/fixtures/validQuerySet.yml")).toString()
  const querySetParsing = new QuerySetParsing()
  const querySet = querySetParsing.parse(yamlString)

  it("has a list of projects", () => {
    expect(Object.values(querySet.projects).length).toEqual(1)
  })

  it("has queries for each project", () => {
    const firstProject = Object.values(querySet.projects)[0]
    expect(firstProject.queries).toBeDefined()
    expect(firstProject.queries.length).toEqual(1)
  })

  it('has a name for each project', () => {
    const firstProject = Object.values(querySet.projects)[0]
    expect(firstProject.name).toBeDefined()
  })
})
