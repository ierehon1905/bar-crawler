import { checkIsCyrillic } from "../cyrillic";
import { randomChoise } from "../random";
import { colors, fontFamilies, shadowColors } from "./constants";


const cyrillicFonts = fontFamilies.filter(font => font.cyrillic);

export function generateTextStyle(text: string) {
    const isCyrillic = checkIsCyrillic(text);

    const fontSize = randomChoise([56, 52, 48, 46, 50]);
    const {font, sizeMul} = isCyrillic
        ? randomChoise(cyrillicFonts)
        : randomChoise(fontFamilies);
     

    const {color} = randomChoise(colors);

    
    const {color: shadowColor} = randomChoise(shadowColors);
    const shadowSize = randomChoise([0, 4, 9, 5]);
    const shadowOffset = randomChoise([2, 4, 5]);

    const rotate = randomChoise(['-2deg', '2deg', 0, 0, 0, 0, 0])

    return {
        fontFamily: font,
        fontSize: sizeMul ? fontSize*sizeMul : fontSize,
        color,
        textShadow: `0 ${shadowSize}px ${shadowOffset}px ${shadowColor}`,
        transform: `rotate(${rotate})`,
    }
}