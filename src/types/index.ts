export const SCENE_ORDER = [
  'cake', 'accept', 'gift',
] as const;

export type SceneId = (typeof SCENE_ORDER)[number];
