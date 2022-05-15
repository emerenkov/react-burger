export const sortItems = (type, arr) => arr.reduce((acc, item) => {
    if (item.type === type) {
        acc.push(item);
    }
    return acc;
}, []);