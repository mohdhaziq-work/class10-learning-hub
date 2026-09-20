/* Chapter content types — shared by all subject content files. */

export interface Slide { kicker?: string; title?: string; points?: string[]; formula?: string }
export interface MindmapBranch { label: string; color?: string; children?: string[] }
export interface Mindmap { central: string; branches: MindmapBranch[] }
export interface FlowNode { title: string; desc?: string; type?: "decision" | "result" | "" }
export interface Formula { name: string; expr: string; use?: string }
export interface Activity { title: string; aim?: string; steps: string[]; observe?: string; conclusion?: string; art?: string }
export interface Example { title: string; steps: string[]; answer: string }
export interface Diagram { title: string; desc: string; label?: string }
export interface TimelineItem { y: string; t: string }
export interface Word { w: string; m: string; u: string }
/* topic = the NCERT sub-heading this question is set from, so a student can see
   "this topic -> these questions can be asked". Optional: older banks omit it. */
export interface QuizQ { q: string; options: string[]; answer: number; why?: string; topic?: string }

export interface ChapterDetail {
  slides?: Slide[]; mindmap?: Mindmap; flowchart?: FlowNode[];
  formulas?: Formula[]; examples?: Example[]; diagrams?: Diagram[]; activities?: Activity[];
  timeline?: TimelineItem[]; words?: Word[]; notes?: string[];
  quiz?: QuizQ[]; pyq?: string[];
}
