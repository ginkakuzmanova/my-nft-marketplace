export const makeId = (length) => {
    let result = '';
    const charArray = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = charArray.length;
    for (let i = 0; i < length; i++) {
        result += charArray.charAt(Math.floor(Math.random() * charsLength));
    }

    return result;
}