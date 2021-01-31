/* eslint-disable functional/no-let */
import { findUsers } from './findUsers';
import { database } from '../../../database';

describe('findUsers', () => {
  const data = database().users();
  const context = {
    database,
  };
  let res: any;
  let req: any;
  let resJsonSpy: any;

  beforeEach(() => {
    req = {};
    res = {
      json: (data: readonly Record<string, any>[]) => {
        data;
      },
      status: (code: number) => code,
    };

    resJsonSpy = jest.spyOn(res, 'json');
  });

  afterEach(() => jest.clearAllMocks());

  it('should call res.json once', async () => {
    await findUsers(context)(req, res);
    expect(resJsonSpy).toHaveBeenCalledTimes(1);
  });

  it('should call res.json  all items', async () => {
    await findUsers(context)(req, res);
    expect(resJsonSpy).toHaveBeenCalledWith({ data });
  });

  it('should call res.json  all items', async () => {
    await findUsers(context)(
      {
        ...req,
        params: {
          id: '1',
        },
      },
      res,
    );
    expect(resJsonSpy).toHaveBeenCalledWith({ data: [data[0]] });
  });

  it('s', async () => {
    const errorMessage = 'woops';
    await findUsers({
      ...context,
      database: () => ({
        users: () => {
          // eslint-disable-next-line functional/no-throw-statement
          throw new Error(errorMessage);
        },
      }),
    })(
      {
        ...req,
        params: {
          id: '1',
        },
      },
      res,
    ).catch((e: any) => console.log({ e }));

    expect(resJsonSpy).toHaveBeenCalledTimes(1);
  });
});
