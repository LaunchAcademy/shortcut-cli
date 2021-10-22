import { Story } from "clubhouse-lib";

export type EnhancedStory = Story & {workflow_id: number, workflow_state_name?: string}
