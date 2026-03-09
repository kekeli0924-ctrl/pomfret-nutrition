// All menu data for the smoothie bar & snack preorder system
// Updated based on evidence-based pregame nutrition research

export const BASES = [
  { id: 'orange-juice', name: 'Orange Juice', emoji: '🍊', color: '#FB923C', nutrition: 'green' },
  { id: 'apple-juice', name: 'Apple Juice', emoji: '🍎', color: '#EF4444', nutrition: 'green' },
  { id: 'coconut-water', name: 'Coconut Water', emoji: '🥥', color: '#A3E635', nutrition: 'green' },
  { id: 'almond-milk', name: 'Almond Milk', emoji: '🥛', color: '#FDE68A', nutrition: 'green' },
  { id: 'oat-milk', name: 'Oat Milk', emoji: '🌾', color: '#D4A574', nutrition: 'green' },
]

export const FRUITS = [
  { id: 'banana', name: 'Banana', emoji: '🍌', color: '#FBBF24', nutrition: 'green' },
  { id: 'strawberry', name: 'Strawberry', emoji: '🍓', color: '#F87171', nutrition: 'green' },
  { id: 'blueberry', name: 'Blueberry', emoji: '🫐', color: '#818CF8', nutrition: 'green' },
  { id: 'mango', name: 'Mango', emoji: '🥭', color: '#FB923C', nutrition: 'green' },
  { id: 'pineapple', name: 'Pineapple', emoji: '🍍', color: '#FDE047', nutrition: 'green' },
  { id: 'mixed-berries', name: 'Mixed Berries', emoji: '🫐', color: '#A855F7', nutrition: 'green' },
  { id: 'dates', name: 'Dates', emoji: '🌴', color: '#92400E', nutrition: 'green' },
]

export const BOOSTERS = [
  { id: 'beetroot-juice', name: 'Beetroot Juice', emoji: '🟣', color: '#991B1B', nutrition: 'green' },
  { id: 'tart-cherry', name: 'Tart Cherry Juice', emoji: '🍒', color: '#DC2626', nutrition: 'green' },
  { id: 'greek-yogurt', name: 'Greek Yogurt', emoji: '🥄', color: '#F5F5F5', nutrition: 'green' },
  { id: 'rolled-oats', name: 'Rolled Oats', emoji: '🌾', color: '#D4A574', nutrition: 'green' },
  { id: 'honey', name: 'Honey', emoji: '🍯', color: '#F59E0B', nutrition: 'green' },
  { id: 'protein-powder', name: 'Protein Powder', emoji: '💪', color: '#F5F5DC', nutrition: 'yellow' },
  { id: 'peanut-butter', name: 'Peanut Butter', emoji: '🥜', color: '#B45309', nutrition: 'yellow' },
]

export const SNACKS = [
  {
    id: 'bagel-jam',
    name: 'Bagel + Jam',
    emoji: '🥯',
    description: 'Plain bagel with strawberry jam — the top-rated pregame snack',
    highlight: '62g carbs, low fat, easy to digest',
    nutrition: 'green',
  },
  {
    id: 'pbj',
    name: 'PB&J on Whole Wheat',
    emoji: '🥪',
    description: 'Classic peanut butter & jelly on whole wheat bread',
    highlight: 'Balanced carbs and protein',
    nutrition: 'green',
  },
  {
    id: 'rice-cakes-honey',
    name: 'Rice Cakes + Honey',
    emoji: '🍚',
    description: 'Light rice cakes drizzled with honey for quick fuel',
    highlight: 'Low residue, fast-absorbing carbs',
    nutrition: 'green',
  },
  {
    id: 'granola-banana',
    name: 'Granola Bar + Banana',
    emoji: '🍌',
    description: 'Crunchy granola bar paired with a fresh banana',
    highlight: 'Quick energy, potassium boost',
    nutrition: 'green',
  },
  {
    id: 'pretzels-banana',
    name: 'Pretzels + Banana',
    emoji: '🥨',
    description: 'Salted pretzels paired with a banana for carbs and sodium',
    highlight: 'Sodium + potassium, easy on the stomach',
    nutrition: 'green',
  },
  {
    id: 'energy-bites',
    name: 'Energy Bites',
    emoji: '⚡',
    description: 'Homemade oat & honey energy bites with rolled oats',
    highlight: 'Natural sugars, sustained energy',
    nutrition: 'green',
  },
  {
    id: 'trail-mix',
    name: 'Trail Mix Pack',
    emoji: '🥜',
    description: 'Nuts, dried fruit, and a touch of chocolate',
    highlight: 'Healthy fats — best 3+ hours before game',
    nutrition: 'yellow',
  },
]

// Preset popular combos — designed around evidence-based pregame nutrition
export const POPULAR_COMBOS = [
  {
    id: 'beet-boost',
    name: 'The Beet Boost',
    description: 'Beetroot-powered performance blend backed by research',
    base: 'apple-juice',
    fruits: ['banana', 'mixed-berries'],
    boosters: ['beetroot-juice', 'honey'],
    badge: 'Research-Backed',
  },
  {
    id: 'berry-blast',
    name: 'Berry Blast',
    description: 'Antioxidant-loaded berry explosion with quick carbs',
    base: 'coconut-water',
    fruits: ['strawberry', 'blueberry', 'mixed-berries'],
    boosters: ['honey'],
    badge: 'Fan Favorite',
  },
  {
    id: 'recovery-blend',
    name: 'Recovery Blend',
    description: 'Tart cherry and oats for tournament-day recovery',
    base: 'oat-milk',
    fruits: ['banana', 'mango'],
    boosters: ['tart-cherry', 'greek-yogurt'],
    badge: 'Recovery',
  },
]

// Fun auto-generated smoothie names
const ADJECTIVES = ['Mighty', 'Turbo', 'Epic', 'Golden', 'Thunder', 'Atomic', 'Blazing', 'Super', 'Ultra', 'Mega']
const NOUNS = ['Fuel', 'Boost', 'Blast', 'Rush', 'Storm', 'Wave', 'Surge', 'Flash', 'Crush', 'Slam']

export function generateSmoothieName() {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)]
  return `${adj} ${noun}`
}

// Teams and grades
export const GRADES = ['9th Grade', '10th Grade', '11th Grade', '12th Grade']

export const TEAMS = [
  'Varsity Football',
  'JV Football',
  'Varsity Soccer',
  'JV Soccer',
  'Varsity Basketball',
  'JV Basketball',
  'Varsity Baseball',
  'JV Baseball',
  'Varsity Softball',
  'Varsity Volleyball',
  'Cross Country',
  'Track & Field',
  'Swimming',
  'Tennis',
  'Wrestling',
  'Lacrosse',
  'Other',
]
