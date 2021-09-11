import { StorySearchResult } from "clubhouse-lib";
import { EnhancedStory } from "./EnhancedStory";

export type EnhancedStorySearchResult = StorySearchResult & { data: EnhancedStory[] }
