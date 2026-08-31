export const SCENE_ORDER = [
  'cake', 'accept', 'letter', 'gift', 'flower', 'finale',
] as const;

export type SceneId = (typeof SCENE_ORDER)[number];

export interface Gift {
  id: string;
  emoji: string;
  label: string;
  color?: string;
}

export interface SceneProps {
  onNext: () => void;
}

export interface PhotoItem {
  src: string;
  caption: string;
}
