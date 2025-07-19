export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array"
  | "float"
  | "objectId";

export interface Field {
  name: string;
  type: FieldType;
  children?: Field[];
}
