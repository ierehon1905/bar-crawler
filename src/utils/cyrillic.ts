
export function checkIsCyrillic(str: string) {
    const cyrillicPattern = /[а-яА-ЯЁё]/;

    return cyrillicPattern.test(str);
}