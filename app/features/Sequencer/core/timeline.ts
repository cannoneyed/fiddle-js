import { Service } from 'libs/typedi';

import { Timeline } from 'core/models/timeline';

@Service()
export default class __TimelineState {
  timeline = new Timeline();
}
