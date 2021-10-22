import { Workflow } from "clubhouse-lib"
import WorkflowMap from "../WorkflowMap"
describe("workflowMap", () => {
  const data =   [{
    id: 500000004,
    description: '',
    entity_type: 'workflow',
    project_ids: [
      1955, 4715, 2399,
      2581, 1581, 2231,
      2035, 4935, 2655,
        10, 1751
    ],
    states: [
      {
      description: '',
      entity_type: 'workflow-state',
      verb: null,
      name: 'Unscheduled',
      num_stories: 152,
      type: 'unstarted',
      updated_at: '2018-11-21T20:25:23Z',
      id: 500000008,
      num_story_templates: 2,
      position: 1,
      created_at: '2018-11-21T20:25:23Z'
      },
      {
        description: '',
        entity_type: 'workflow-state',
        verb: null,
        name: 'Ready for Development',
        num_stories: 15,
        type: 'unstarted',
        updated_at: '2018-11-21T20:25:23Z',
        id: 500000007,
        num_story_templates: 0,
        position: 2,
        created_at: '2018-11-21T20:25:23Z'
      }
    ]},
  {
    name: 'Software',
    updated_at: '2018-11-21T20:25:23Z',
    auto_assign_owner: true,
    id: 500000005,
    team_id: 1,
    created_at: '2018-11-21T20:25:23Z',
    default_state_id: 500000008
  }] as Workflow[]

  it("has a list of workflows on the basis of id", () => {
    const map = new WorkflowMap(data)
    const workflow = map.get(500000005)
    expect(workflow).toBeDefined()
    expect(workflow.name).toEqual("Software")
  })

  it("has a stateMap", () => {
    const map = new WorkflowMap(data)
    const workflow = map.get(500000004)
    const stateMap = workflow.stateMap
    const state = stateMap.get(500000007)
    expect(state).toBeDefined()
    expect(state.name).toEqual('Ready for Development')
  })
})
