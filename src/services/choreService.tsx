import * as request from './requester';

const baseUrl = 'http://localhost:3030/data/chores';

export const getAll = async (ownerId: string) => {
    const chores = await request.get(`${baseUrl}?where=_ownerId%3D%22${ownerId}%22`, {});

    return chores;
};

export const create = async (choreData: {}) => {
    const result = await request.post(baseUrl, choreData);

    return result;
};

export const edit = async (choreId: string, data: {}) => {
    const result = await request.put(`${baseUrl}/${choreId}`, data);

    return result;
};

export const remove = async (choreId: string) => {
    const result = await request.del(`${baseUrl}/${choreId}`, {});

    return result;
};