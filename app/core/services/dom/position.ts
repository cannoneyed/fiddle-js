import { Service } from 'typedi';

import { ScreenVector } from 'core/primitives/screen-vector';

export interface withDomId {
  domId: string;
}

@Service({ global: true })
export class DomPositionService {
  getScreenVector = (model: withDomId): ScreenVector => {
    const element = document.getElementById(model.domId);
    if (element) {
      const { left, top } = element.getBoundingClientRect();
      return new ScreenVector(left, top);
    }
    return new ScreenVector();
  };
}
