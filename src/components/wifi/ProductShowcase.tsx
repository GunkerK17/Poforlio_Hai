import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { MotionValue } from 'motion/react';
import { wifiStory } from '../../data/wifiExperience';
import { DeviceStage } from './DeviceStage';

export function ProductShowcase({ progress, phase, onPhaseChange }: { progress: MotionValue<number>; phase: number; onPhaseChange: (index: number) => void }) {
  const story = wifiStory[phase];
  return <div className="story-showcase" role="region" aria-label="Khám phá hệ sinh thái FPT" tabIndex={0} onKeyDown={event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); onPhaseChange((phase + 1) % 3); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); onPhaseChange((phase + 2) % 3); }
  }}>
    <DeviceStage cinematic device={story.device} label="Bộ thiết bị FPT" progress={progress}/>
    <div className="story-stage-foot"><div><small>0{phase + 1} / 03 · {story.name.toUpperCase()}</small><p>{story.sceneLabel}</p></div><div className="story-arrows"><button type="button" onClick={() => onPhaseChange((phase + 2) % 3)} aria-label="Thiết bị trước"><ArrowLeft size={20}/></button><button type="button" onClick={() => onPhaseChange((phase + 1) % 3)} aria-label="Thiết bị tiếp theo"><ArrowRight size={20}/></button></div></div>
  </div>;
}
