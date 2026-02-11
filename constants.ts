
import { PaperType, FontOption } from './types';

export const HANDWRITING_FONTS: FontOption[] = [
  { name: 'Caveat', family: "'Caveat', cursive" },
  { name: 'Indie Flower', family: "'Indie Flower', cursive" },
  { name: 'Dancing Script', family: "'Dancing Script', cursive" },
  { name: 'Homemade Apple', family: "'Homemade Apple', cursive" },
  { name: 'Gloria Hallelujah', family: "'Gloria Hallelujah', cursive" },
  { name: 'Kalam', family: "'Kalam', cursive" },
  { name: 'Shadows Into Light', family: "'Shadows Into Light', cursive" },
  { name: 'Nanum Pen', family: "'Nanum Pen Script', cursive" },
  { name: 'Pacifico', family: "'Pacifico', cursive" },
];

export const INK_COLORS = [
  { name: 'Midnight Blue', value: '#1e3a8a' },
  { name: 'Classic Black', value: '#18181b' },
  { name: 'Royal Blue', value: '#2563eb' },
  { name: 'Gel Pen Blue', value: '#0ea5e9' },
  { name: 'Deep Red', value: '#991b1b' },
  { name: 'Forest Green', value: '#166534' },
];

export const PAPER_COLORS = [
  { name: 'Pure White', value: '#ffffff' },
  { name: 'Soft Cream', value: '#fffcf2' },
  { name: 'Antique', value: '#fdf5e6' },
  { name: 'Yellow Pad', value: '#fefce8' },
  { name: 'Recycled', value: '#f1f5f9' },
];

export const DEFAULT_SETTINGS = {
  fontFamily: HANDWRITING_FONTS[0].family,
  fontSize: 24,
  lineHeight: 1.8,
  letterSpacing: 0,
  wordSpacing: 0,
  color: INK_COLORS[0].value,
  paperType: PaperType.LINED,
  paperColor: PAPER_COLORS[1].value,
  margin: 40,
};
