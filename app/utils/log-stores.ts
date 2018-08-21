import { Container } from 'libs/typedi';

export const logStores = () => {
  (window as any).logStores = () => ({
    Container,
  });
};
