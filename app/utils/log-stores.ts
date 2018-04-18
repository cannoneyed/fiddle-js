import * as stores from 'core/stores';
import * as layouts from 'core/layouts';

export const logStores = () => {
  (window as any).logStores = () => ({
    stores,
    layouts,
  });
};
