export interface Participant { id:string; participant_id:string; name:string; institution:string|null; region:string|null; province:string; table_number:number; updated_at?:string }
export type ParticipantInput=Omit<Participant,'id'|'updated_at'>;
export interface ParsedRow extends ParticipantInput { sourceRow:number; status:'valid'|'duplicate'|'invalid'; issues:string[] }
