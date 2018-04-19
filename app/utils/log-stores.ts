import { Container } from 'typedi';

import * as stores from 'core/stores';

export const logStores = () => {
  (window as any).logStores = () => ({
    stores,
    Container,
  });
};
