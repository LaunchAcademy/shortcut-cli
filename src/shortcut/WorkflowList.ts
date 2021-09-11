import Shortcut, { Workflow } from "clubhouse-lib"

export default class WorkflowList {
  token: string

  constructor({token}: {token: string }) {
    this.token = token
  }

  async retrieve() : Promise<Workflow[]> {
    return Shortcut.create(this.token).listWorkflows()
  }
}
