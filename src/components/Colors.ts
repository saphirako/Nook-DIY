export type Color =
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "brick"
    | "light-gray"
    | "pink"
    | "beige"
    | "brown"
    | "orange"
    | "dark-gray"
    | "white"
    | "gold"
    | "silver";

export const mapACNHDataToTailwind = (color: Color): string => {
    switch (color) {
        case "red":
            return "bg-acnh-red";
        case "yellow":
            return "bg-acnh-yellow";
        case "green":
            return "bg-acnh-green";
        case "blue":
            return "bg-acnh-blue";
        case "brick":
            return "bg-acnh-brick";
        case "light-gray":
            return "bg-acnh-light-gray";
        case "pink":
            return "bg-acnh-pink";
        case "beige":
            return "bg-acnh-beige";
        case "brown":
            return "bg-acnh-brown";
        case "orange":
            return "bg-acnh-orange";
        case "dark-gray":
            return "bg-acnh-dark-gray";
        case "white":
            return "bg-acnh-white";
        case "gold":
            return "bg-acnh-gold border-acnh-gold-border";
        case "silver":
            return "bg-acnh-silver border-acnh-silver-border";
    }
};
