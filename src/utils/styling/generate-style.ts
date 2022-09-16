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

    
    const {color: shadowColor} = randomChoise(shadowColors.filter((c) => c.color !== color));
    const shadowSize = randomChoise([0, 4, 2, 5]);
    const shadowOffset = randomChoise([2, 4, 5]);

    const rotate = randomChoise(['-2deg', '2deg', 0, 0, 0, 0, 0])

    const fontSizeCorrected = sizeMul ? fontSize*sizeMul : fontSize;

    return {
        fontFamily: font,
        fontSize: `min(${fontSizeCorrected}px, ${fontSizeCorrected/4}vw)`,
        color,
        textShadow: `0 ${shadowSize}px ${shadowOffset}px ${shadowColor}`,
        transform: `rotate(${rotate})`,
    }
}