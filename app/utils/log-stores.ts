import { Container } from 'typedi';

export const logStores = () => {
  (window as any).logStores = () => ({
    Container,
  });
};
