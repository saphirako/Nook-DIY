import { Color } from './Colors'

export const sourceMap = {
    'Tom Nook': 'https://acnhcdn.com/latest/NpcIcon/rco.png',
    Blathers: 'https://acnhcdn.com/latest/NpcIcon/owl.png',
    Balloons: 'https://acnhcdn.com/latest/MenuIcon/Present.png',
    Reese: 'https://acnhcdn.com/latest/NpcIcon/alw.png',
    Cyrus: 'https://acnhcdn.com/latest/NpcIcon/alp.png',
    Leif: 'https://acnhcdn.com/latest/NpcIcon/slo.png',
    Gulliver: 'https://acnhcdn.com/latest/NpcIcon/gul.png',
    Gullivarrr: 'https://acnhcdn.com/latest/NpcIcon/gul.png',
    Harvey: 'https://acnhcdn.com/latest/NpcIcon/spn.png',
    Jack: 'https://acnhcdn.com/latest/NpcIcon/pkn.png',
    Jingle: 'https://acnhcdn.com/latest/NpcIcon/rei.png',
    Franklin: 'https://acnhcdn.com/latest/NpcIcon/tuk.png',
    Celeste: 'https://acnhcdn.com/latest/NpcIcon/ows.png',
    Pavé: 'https://acnhcdn.com/latest/NpcIcon/pck.png',
    Saharah: 'https://acnhcdn.com/latest/NpcIcon/cml.png',
    Timmy: 'https://acnhcdn.com/latest/NpcIcon/rcm.png',
    Tommy: 'https://acnhcdn.com/latest/NpcIcon/rct.png',
    Zipper: 'https://acnhcdn.com/latest/NpcIcon/pyn.png',
    'K.K.': 'https://acnhcdn.com/latest/NpcIcon/tkkA.png',
    Pascal: 'https://acnhcdn.com/latest/NpcIcon/seo.png',
    Isabelle: 'https://acnhcdn.com/latest/NpcIcon/sza.png',
    'Lazy villager': 'https://acnhcdn.com/latest/ManpuIcon/Sleepy.png',
    'Jock villager': 'https://acnhcdn.com/latest/ManpuIcon/SmugFace.png',
    'Cranky villager': 'https://acnhcdn.com/latest/ManpuIcon/Outraged.png',
    'Smug villager': 'https://acnhcdn.com/latest/ManpuIcon/Grin.png',
    'Big sister villager': 'https://acnhcdn.com/latest/ManpuIcon/Scheming.png',
    'Normal villager': 'https://acnhcdn.com/latest/ManpuIcon/Smiling.png',
    'Peppy villager': 'https://acnhcdn.com/latest/ManpuIcon/Cheering.png',
    'Snooty villager': 'https://acnhcdn.com/latest/ManpuIcon/Negative.png',
    'Any villager': 'https://acnhcdn.com/latest/ManpuIcon/AddViva.png',
    'Egg bottle': 'https://acnhcdn.com/latest/MenuIcon/MessageBottleEgg.png',
    DEFAULT: 'https://acnhcdn.com/latest/MenuIcon/SeedPitfall.png',
    DIY: 'https://acnhcdn.com/latest/MenuIcon/BookRecipe.png',
    'Egg Bottle': 'https://acnhcdn.com/latest/MenuIcon/MessageBottleEgg.png',
    'Egg Balloon': 'https://acnhcdn.com/latest/MenuIcon/EggSky.png',
    Snowboy: 'https://acnhcdn.com/latest/MenuIcon/SnowCrystal.png',
    Fishing: 'https://acnhcdn.com/latest/FtrIcon/ToolAngling_Remake_0_0.png',
}

export type Item = {
    name: string
    card_color?: Color
    image_url: string
}
