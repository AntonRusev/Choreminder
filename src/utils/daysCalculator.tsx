export const daysCalculator = (hoursRemaining: any) => {
    const days = Math.floor(hoursRemaining / 24);
    const hours = hoursRemaining % 24;

    let daysString = '';
    let hoursString = '';

    if (days === 1) {
        daysString = `${days} day`;
    } else if (days > 1) {
        daysString = `${days} days`
    };

    if (hours === 1) {
        hoursString = `${hours} hour`;
    } else {
        hoursString = `${hours} hours`
    };

    if ( days > 0 && hours > 0) {
        const andString = ` and `
        daysString = daysString.concat(andString);
    } else if (days > 0 && hours === 0) {
        hoursString = '';
    }

    const result = daysString.concat(hoursString);

    return result;
};