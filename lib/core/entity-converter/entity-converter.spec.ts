import { GlobalManager } from '../global-manager';
import { EntityConverter } from './entity-converter';

import { Data, Primitive } from '../../spec/helpers/entities';

describe('EntityConverter', () => {
  const converter = new EntityConverter(GlobalManager.getEntityManager());

  describe('#convert', () => {
    it('builds a query from primitive', () => {
      const response = { response: { id: '1', name: 'Hello' } };
      const data = converter.convert({ response: Primitive }, response);

      expect(data).toMatchObject(response);
      expect(data.response instanceof Primitive).toBeTruthy();
    });

    it('builds a query from complex response', () => {
      const response = { response: { id: '1', name: 'Hello' }, version: 1 };
      const data = converter.convert({ response: Primitive, version: true }, response);

      expect(data).toMatchObject(response);
      expect(data.response instanceof Primitive).toBeTruthy();
    });

    it('builds a query from array of primitives', () => {
      const response = { response: [{ id: '1', name: 'Hello' }] };
      const data = converter.convert({ response: Primitive }, response);

      expect(data).toMatchObject(response);
      expect(Array.isArray(data.response)).toBeTruthy();
      expect(data.response[0] instanceof Primitive).toBeTruthy();
    });

    // @TODO Implement me
    //
    // it('builds a query from nested response', () => {
    //   const response = { response: { data: { id: '1', name: 'Hello' } } };
    //   const result = converter.convert({ response: Data }, response);

    //   expect(result).toMatchObject(response);
    //   expect(result.response instanceof Data).toBeTruthy();
    //   expect(result.response.data instanceof Primitive).toBeTruthy();
    // });

    // it('builds a query from nested array response', () => {
    //   const response = { response: { data: [{ id: '1', name: 'Hello' }] } };
    //   const result = converter.convert({ response: Data }, response);

    //   expect(result).toMatchObject(response);
    //   expect(result.response instanceof Data).toBeTruthy();
    //   expect(Array.isArray(result.response.data)).toBeTruthy();
    //   expect(result.response.data[0] instanceof Primitive).toBeTruthy();
    // });
  });
});
