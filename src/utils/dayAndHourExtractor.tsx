export const dayAndHour = (date: any) => {
    const event = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;

    const result = event.toLocaleTimeString('en-GB', options)

    return result;
};