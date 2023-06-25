import * as request from './requester';

const baseUrl = 'http://localhost:3030/data/chores';

export const getAll = async () => {
    const chores = await request.get(baseUrl, {});

    return chores;
};

export const create = async (choreData: {}) => {
    const result = await request.post(baseUrl, choreData);

    return result;
};

export const remove = async (choreId: string) => {
    const result = await request.del(`${baseUrl}/${choreId}`, {});

    return result;
};