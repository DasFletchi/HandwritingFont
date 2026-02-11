
export enum PaperType {
  BLANK = 'blank',
  LINED = 'lined',
  GRID = 'grid',
  VINTAGE = 'vintage'
}

export interface Settings {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  color: string;
  paperType: PaperType;
  paperColor: string;
  margin: number;
  wordSpacing: number;
}

export interface FontOption {
  name: string;
  family: string;
}
