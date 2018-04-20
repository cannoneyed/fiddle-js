import { Container } from 'typedi';

import { ClipDragInteraction } from './clip/drag';
import { ClipSelect } from './clip/select';

export const clipDragInteraction = Container.get(ClipDragInteraction);
export const clipSelect = Container.get(ClipSelect);

export { trackMouseInteraction } from './tracks/mouse';
