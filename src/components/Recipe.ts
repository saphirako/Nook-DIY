export type MaterialName =
    | 'acorn'
    | 'softwood'
    | 'iron nugget'
    | 'hardwood'
    | 'apple'
    | 'wood'
    | 'star fragment'
    | 'gold nugget'
    | 'stone'
    | 'clay'
    | 'maple leaf'
    | 'clump of weeds'
    | 'flimsy axe'
    | 'bamboo piece'
    | 'young spring bamboo'
    | 'bamboo shoot'
    | 'wasp nest'
    | 'red ornament'
    | 'blue ornament'
    | 'gold ornament'
    | 'cherry-blossom petal'
    | 'blue roses'
    | 'campfire'
    | 'cherry-blossom bonsai'
    | 'pine bonsai tree'
    | 'flimsy shovel'
    | 'log stakes'
    | 'earth egg'
    | 'stone egg'
    | 'leaf egg'
    | 'wood egg'
    | 'sky egg'
    | 'water egg'
    | 'tree branch'
    | 'cardboard box'
    | 'cherry'
    | 'black cosmos'
    | 'purple mums'
    | 'pink mums'
    | 'purple roses'
    | 'black roses'
    | 'purple tulips'
    | 'pink tulips'
    | 'orange tulips'
    | 'purple windflowers'
    | 'book'
    | 'coconut'
    | 'blue hyacinths'
    | 'pink hyacinths'
    | 'orange hyacinths'
    | 'orange pansies'
    | 'blue pansies'
    | 'purple pansies'
    | 'blue windflowers'
    | 'pink windflowers'
    | 'white windflowers'
    | 'red cosmos'
    | 'yellow cosmos'
    | 'white cosmos'
    | 'pink cosmos'
    | 'large star fragment'
    | 'pink lilies'
    | 'orange lilies'
    | 'white lilies'
    | 'pink roses'
    | 'orange roses'
    | 'black lilies'
    | 'black tulips'
    | 'scattered papers'
    | 'yellow lilies'
    | 'red mums'
    | 'yellow roses'
    | 'manila clam'
    | 'flimsy fishing rod'
    | 'red roses'
    | 'rare mushroom'
    | 'round mushroom'
    | 'skinny mushroom'
    | 'flat mushroom'
    | 'elegant mushroom'
    | 'fossil'
    | 'drinking fountain'
    | 'large snowflake'
    | 'snowflake'
    | 'pear'
    | 'orange'
    | 'peach'
    | 'empty can'
    | 'boot'
    | 'old tire'
    | 'white hyacinths'
    | 'gold roses'
    | 'axe'
    | 'net'
    | 'fishing rod'
    | 'shovel'
    | 'slingshot'
    | 'watering can'
    | 'red hyacinths'
    | 'yellow hyacinths'
    | 'purple hyacinths'
    | 'ironwood dresser'
    | 'cutting board'
    | 'pine cone'
    | 'red lilies'
    | 'log bench'
    | 'log chair'
    | 'orange cosmos'
    | 'lucky cat'
    | 'magazine'
    | 'pearl'
    | 'giant clam'
    | 'sand dollar'
    | 'coral'
    | 'conch'
    | 'sea snail'
    | 'yellow mums'
    | 'white mums'
    | 'log stool'
    | 'green mums'
    | 'flimsy net'
    | 'oil barrel'
    | 'red pansies'
    | 'yellow pansies'
    | 'white pansies'
    | 'zen cushion'
    | 'rocket'
    | 'rusted part'
    | 'white roses'
    | 'venus comb'
    | 'document stack'
    | 'cowrie'
    | 'summer shell'
    | 'orange pumpkin'
    | 'candy'
    | 'spooky lantern'
    | 'upright piano'
    | 'painting set'
    | 'red tulips'
    | 'yellow tulips'
    | 'white tulips'
    | 'flimsy watering can'
    | 'wedding flower stand'
    | 'red windflowers'
    | 'orange windflowers'
    | 'wooden-block toy'
    | 'aquarius fragment'
    | 'aries fragment'
    | 'wobbling zipper toy'
    | 'cancer fragment'
    | 'capricorn fragment'
    | 'mini diy workbench'
    | 'gemini fragment'
    | 'papa bear'
    | 'mama bear'
    | 'baby bear'
    | 'leo fragment'
    | 'libra fragment'
    | 'pisces fragment'
    | 'sagittarius fragment'
    | 'scorpius fragment'
    | 'taurus fragment'
    | 'virgo fragment'
    | 'screen wall'
    | 'bells'
    | 'gold armor'
    | 'sandy-beach flooring'

export type RecipeSource =
    | 'Tom Nook'
    | 'Balloons'
    | 'Cyrus'
    | 'Gulliver'
    | 'Gullivarrr'
    | 'Harvey'
    | 'Reese'

export interface Recipe {
    name: string
    recipes_to_unlock: number
    availability: {}
    image_url: string
    sell: number
}

export interface Currency {
    type: 'Buy' | 'Sell'
    value: number
    currency: string
}

export interface Ingredient {
    name: MaterialName
    quantity?: number
}