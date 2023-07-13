export const dateGenerator = (days: any) => {
    const startDate: any = new Date().toString();

    let newDate: any = new Date();
    newDate.setDate(newDate.getDate() + Number(days));

    const endDate = newDate.toString();

    return { startDate, endDate };
};