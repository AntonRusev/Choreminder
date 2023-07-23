// Sorting by DATE
export const dateSort = (a: any, b: any, sortBy: any, order: any) => {
    const dateA = new Date(a[sortBy]);
    const dateB = new Date(b[sortBy]);

    if (order === 'incremental') {
        if (dateA > dateB) {
            return 1;
        } else if (dateA < dateB) {
            return -1;
        } else {
            return 0;
        };
    } else if (order === 'decremental') {
        if (dateA < dateB) {
            return 1;
        } else if (dateA > dateB) {
            return -1;
        } else {
            return 0;
        };
    };
    return 0;
};

// Sorting by DAY
export const daysSort = (a: any, b: any, sortBy: any, order: any) => {
    const dayA = Number(a[sortBy]);
    const dayB = Number(b[sortBy]);

    if (order === 'incremental') {
        if (dayA > dayB) {
            return 1;
        } else if (dayA < dayB) {
            return -1;
        } else {
            return 0;
        };
    } else if (order === 'decremental') {
        if (dayA < dayB) {
            return 1;
        } else if (dayA > dayB) {
            return -1;
        } else {
            return 0;
        };
    };
    return 0;
};