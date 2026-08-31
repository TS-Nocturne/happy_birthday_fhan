'use client';

import { create } from 'zustand';
import { SCENE_ORDER, type SceneId } from '@/types';

interface SceneState {
  scene: SceneId;
  direction: 1 | -1;
  chosenGift: string | null;
  giftPick: number | null;
  soundOn: boolean;
  go: (scene: SceneId) => void;
  next: () => void;
  prev: () => void;
  setGift: (id: string) => void;
  setGiftPick: (i: number) => void;
  toggleSound: () => void;
  reset: () => void;
}

export const useSceneStore = create<SceneState>((set, get) => ({
  scene: 'cake',
  direction: 1,
  chosenGift: null,
  giftPick: null,
  soundOn: false,

  go: (scene) => {
    const from = SCENE_ORDER.indexOf(get().scene);
    const to = SCENE_ORDER.indexOf(scene);
    set({ scene, direction: to >= from ? 1 : -1 });
  },

  next: () => {
    const i = SCENE_ORDER.indexOf(get().scene);
    if (i < SCENE_ORDER.length - 1) {
      set({ scene: SCENE_ORDER[i + 1], direction: 1 });
    }
  },

  prev: () => {
    const i = SCENE_ORDER.indexOf(get().scene);
    if (i > 0) set({ scene: SCENE_ORDER[i - 1], direction: -1 });
  },

  setGift: (chosenGift) => set({ chosenGift }),
  setGiftPick: (giftPick) => set({ giftPick }),
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  reset: () => set({ scene: 'cake', direction: 1, chosenGift: null, giftPick: null }),
}));

/** selector helpers for re-renders */
export const useSceneIndex = () =>
  useSceneStore((s) => SCENE_ORDER.indexOf(s.scene));
export const useSceneTotal = () => SCENE_ORDER.length;
