import { Service } from 'libs/typedi';

import { Timeline } from 'core/models/timeline';

@Service()
export default class TimelineState {
  timeline = new Timeline();
}
