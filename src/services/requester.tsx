export const request = async (method: string, url: string, data: {}) => {

    const options: any = {};

    if (method !== 'GET') {
        options.method = method;

        if (data) {
            options.headers = {
                'content-type': 'application/json',
            };
            options.body = JSON.stringify(data);
        };
    };

    const userData: any = JSON.parse(localStorage.getItem('userData') as string);

    if (userData) {
        options.headers = {
            ...options.headers,
            'X-Authorization': userData.accessToken,
        };
    };

    try {
        const response = await fetch(url, options);

        if (response.ok !== true) {
            if (response.status === 403) {
                // sessionStorage.removeItem('userData'); 
            };

            const error = await response.json();

            throw new Error(error.message);
        };

        if (response.status == 204) {
            return {};
        } else {
            const result = await response.json();

            return result;
        };

    } catch (error) {
        throw error;
    };
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const patch = request.bind(null, 'PATCH');
export const del = request.bind(null, 'DELETE');