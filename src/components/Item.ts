import { Color } from "./Colors";

export const sourceMap: Record<string, string> = {
    "tom nook": "https://acnhcdn.com/latest/NpcIcon/rco.png",
    blathers: "https://acnhcdn.com/latest/NpcIcon/owl.png",
    balloons: "https://acnhcdn.com/latest/MenuIcon/Present.png",
    reese: "https://acnhcdn.com/latest/NpcIcon/alw.png",
    cyrus: "https://acnhcdn.com/latest/NpcIcon/alp.png",
    leif: "https://acnhcdn.com/latest/NpcIcon/slo.png",
    gulliver: "https://acnhcdn.com/latest/NpcIcon/gul.png",
    gullivarrr: "https://acnhcdn.com/latest/NpcIcon/gul.png",
    harvey: "https://acnhcdn.com/latest/NpcIcon/spn.png",
    jack: "https://acnhcdn.com/latest/NpcIcon/pkn.png",
    jingle: "https://acnhcdn.com/latest/NpcIcon/rei.png",
    franklin: "https://acnhcdn.com/latest/NpcIcon/tuk.png",
    celeste: "https://acnhcdn.com/latest/NpcIcon/ows.png",
    pavé: "https://acnhcdn.com/latest/NpcIcon/pck.png",
    saharah: "https://acnhcdn.com/latest/NpcIcon/cml.png",
    timmy: "https://acnhcdn.com/latest/NpcIcon/rcm.png",
    tommy: "https://acnhcdn.com/latest/NpcIcon/rct.png",
    zipper: "https://acnhcdn.com/latest/NpcIcon/pyn.png",
    "k.k.": "https://acnhcdn.com/latest/NpcIcon/tkkA.png",
    pascal: "https://acnhcdn.com/latest/NpcIcon/seo.png",
    isabelle: "https://acnhcdn.com/latest/NpcIcon/sza.png",
    "lazy villager": "https://acnhcdn.com/latest/ManpuIcon/Sleepy.png",
    "jock villager": "https://acnhcdn.com/latest/ManpuIcon/SmugFace.png",
    "cranky villager": "https://acnhcdn.com/latest/ManpuIcon/Outraged.png",
    "smug villager": "https://acnhcdn.com/latest/ManpuIcon/Grin.png",
    "big sister villager": "https://acnhcdn.com/latest/ManpuIcon/Scheming.png",
    "normal villager": "https://acnhcdn.com/latest/ManpuIcon/Smiling.png",
    "peppy villager": "https://acnhcdn.com/latest/ManpuIcon/Cheering.png",
    "snooty villager": "https://acnhcdn.com/latest/ManpuIcon/Negative.png",
    "any villager": "https://acnhcdn.com/latest/ManpuIcon/AddViva.png",
    "egg bottle": "https://acnhcdn.com/latest/MenuIcon/MessageBottleEgg.png",
    DEFAULT: "https://acnhcdn.com/latest/MenuIcon/SeedPitfall.png",
    DIY: "https://acnhcdn.com/latest/MenuIcon/BookRecipe.png",
    "egg balloon": "https://acnhcdn.com/latest/MenuIcon/EggSky.png",
    snowboy: "https://acnhcdn.com/latest/MenuIcon/SnowCrystal.png",
    fishing: "https://acnhcdn.com/latest/FtrIcon/ToolAngling_Remake_0_0.png",
};

export type Item = {
    name: string;
    card_color?: Color;
    image_url: string;
};

export type Transaction = {
    price: number;
    currency: string;
};

export type Source = {
    from: string;
    note: string;
};
