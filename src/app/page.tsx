import Stage from '@/components/Stage';
import type { SceneId } from '@/types';
import CakeScene from '@/components/scenes/CakeScene';
import AcceptScene from '@/components/scenes/AcceptScene';
import GiftScene from '@/components/scenes/GiftScene';

const scenes: Record<SceneId, React.ReactNode> = {
  cake:   <CakeScene />,
  accept: <AcceptScene />,
  gift:   <GiftScene />,
};

export default function Home() {
  return <Stage scenes={scenes} />;
}
