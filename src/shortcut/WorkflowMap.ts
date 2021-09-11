import { Workflow, WorkflowState } from "clubhouse-lib"

type WorkflowWithStateSet = Workflow & {stateMap: Map<number, WorkflowState>}

export default class WorkflowMap {
  map: Map<number, WorkflowWithStateSet>

  constructor(workflows: Workflow[]) {
    this.map = workflows.reduce((map, workflow) => {
      const stateMap = (workflow.states || []).reduce((stateMap, state) => {
        stateMap.set(state.id, state)
        return stateMap
      }, new Map())
      map.set(workflow.id, {...workflow, stateMap });
      return map
    }, new Map())
  }

  get(id: number): WorkflowWithStateSet | undefined {
    return this.map.get(id)
  }
}
