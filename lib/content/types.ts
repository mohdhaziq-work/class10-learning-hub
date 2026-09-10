/* Chapter content types — shared by all subject content files. */

export interface Slide { kicker?: string; title?: string; points?: string[]; formula?: string }
export interface MindmapBranch { label: string; color?: string; children?: string[] }
export interface Mindmap { central: string; branches: MindmapBranch[] }
export interface FlowNode { title: string; desc?: string; type?: "decision" | "result" | "" }
export interface Formula { name: string; expr: string }
export interface Example { title: string; steps: string[]; answer: string }
export interface Diagram { title: string; desc: string; label?: string }
export interface TimelineItem { y: string; t: string }
export interface Word { w: string; m: string; u: string }
export interface QuizQ { q: string; options: string[]; answer: number; why?: string }

export interface ChapterDetail {
  slides?: Slide[]; mindmap?: Mindmap; flowchart?: FlowNode[];
  formulas?: Formula[]; examples?: Example[]; diagrams?: Diagram[];
  timeline?: TimelineItem[]; words?: Word[]; notes?: string[];
  quiz?: QuizQ[]; pyq?: string[];
}
