// All menu data for CertaFuel — smoothies & pregame/postgame snack preorder system
// Items labeled as pre-workout, post-workout, or both based on sports nutrition research
// Allergen tags: dairy, tree-nut, gluten, peanut, soy

export const BASES = [
  { id: 'orange-juice', name: 'Orange Juice', emoji: '🍊', color: '#FB923C', nutrition: 'pre', info: 'Fast-absorbing natural sugars + vitamin C for immune support before high-intensity sessions.' },
  { id: 'apple-juice', name: 'Apple Juice', emoji: '🍎', color: '#EF4444', nutrition: 'pre', info: 'Light, easily digested carb source that tops off glycogen without sitting heavy.' },
  { id: 'coconut-water', name: 'Coconut Water', emoji: '🥥', color: '#A3E635', nutrition: 'both', info: "Nature's electrolyte drink — replenishes potassium and sodium lost through sweat." },
  { id: 'almond-milk', name: 'Almond Milk', emoji: '🥛', color: '#FDE68A', nutrition: 'post', info: 'Low-calorie, anti-inflammatory base that pairs well with protein for a recovery blend.', allergens: ['tree-nut'] },
  { id: 'oat-milk', name: 'Oat Milk', emoji: '🌾', color: '#D4A574', nutrition: 'pre', info: 'Slow-releasing carbs from oats provide sustained energy without a sugar spike.', allergens: ['gluten'] },
  { id: 'pomegranate-juice', name: 'Pomegranate Juice', emoji: '🫐', color: '#9B1B30', nutrition: 'post', info: 'Packed with polyphenols that reduce muscle soreness and accelerate recovery.' },
  { id: 'watermelon-juice', name: 'Watermelon Juice', emoji: '🍉', color: '#F87171', nutrition: 'post', info: 'L-citrulline improves blood flow and helps clear metabolic waste after hard efforts.' },
  { id: 'chocolate-milk', name: 'Chocolate Milk', emoji: '🍫', color: '#6B3A2A', nutrition: 'post', info: 'Gold-standard recovery drink with an ideal ~3:1 carb-to-protein ratio for glycogen replenishment.', allergens: ['dairy'] },
]

export const FRUITS = [
  { id: 'banana', name: 'Banana', emoji: '🍌', color: '#FBBF24', nutrition: 'pre', info: 'Potassium-rich fast carbs that prevent cramping and fuel muscles immediately.' },
  { id: 'strawberry', name: 'Strawberry', emoji: '🍓', color: '#F87171', nutrition: 'post', info: 'Vitamin C and anthocyanins help combat exercise-induced oxidative stress.' },
  { id: 'blueberry', name: 'Blueberry', emoji: '🫐', color: '#818CF8', nutrition: 'post', info: 'Elite antioxidant profile reduces inflammation and speeds muscle tissue repair.' },
  { id: 'mango', name: 'Mango', emoji: '🥭', color: '#FB923C', nutrition: 'pre', info: 'High-glycemic natural sugars deliver quick energy plus vitamin A for immune defense.' },
  { id: 'pineapple', name: 'Pineapple', emoji: '🍍', color: '#FDE047', nutrition: 'post', info: 'Bromelain enzyme reduces swelling and supports faster soft-tissue recovery.' },
  { id: 'mixed-berries', name: 'Mixed Berries', emoji: '🫐', color: '#A855F7', nutrition: 'post', info: 'Broad-spectrum antioxidants lower inflammatory markers after intense training.' },
  { id: 'dates', name: 'Dates', emoji: '🌴', color: '#92400E', nutrition: 'pre', info: 'Dense, rapidly absorbed natural sugars act like a whole-food energy gel.' },
]

export const BOOSTERS = [
  { id: 'beetroot-juice', name: 'Beetroot Juice', emoji: '🟣', color: '#991B1B', nutrition: 'pre', info: 'Dietary nitrates boost nitric oxide, improving oxygen efficiency and endurance.' },
  { id: 'tart-cherry', name: 'Tart Cherry Juice', emoji: '🍒', color: '#DC2626', nutrition: 'post', info: 'Clinically shown to reduce DOMS and accelerate strength recovery between sessions.' },
  { id: 'greek-yogurt', name: 'Greek Yogurt', emoji: '🥄', color: '#F5F5F5', nutrition: 'post', info: 'High casein and whey protein blend supports prolonged muscle protein synthesis.', allergens: ['dairy'] },
  { id: 'rolled-oats', name: 'Rolled Oats', emoji: '🌾', color: '#D4A574', nutrition: 'pre', info: 'Complex carbs with beta-glucan fiber for steady, sustained energy release.', allergens: ['gluten'] },
  { id: 'honey', name: 'Honey', emoji: '🍯', color: '#F59E0B', nutrition: 'pre', info: 'Rapid glucose hit that\'s easily absorbed — ideal for topping off fuel close to kickoff.' },
  { id: 'protein-powder', name: 'Protein Powder', emoji: '💪', color: '#F5F5DC', nutrition: 'post', info: 'Fast-digesting amino acids kickstart muscle repair within the recovery window.', allergens: ['dairy', 'soy'] },
  { id: 'peanut-butter', name: 'Peanut Butter', emoji: '🥜', color: '#B45309', nutrition: 'both', info: 'Healthy fats + protein for satiety and sustained energy or recovery support.', allergens: ['peanut'] },
  { id: 'ginger', name: 'Fresh Ginger', emoji: '🫚', color: '#D4A574', nutrition: 'post', info: 'Anti-inflammatory and anti-nausea properties aid digestion and reduce muscle pain.' },
  { id: 'turmeric', name: 'Turmeric', emoji: '🟡', color: '#EAB308', nutrition: 'post', info: 'Curcumin is a potent anti-inflammatory that helps manage post-training joint and muscle soreness.' },
  { id: 'green-tea', name: 'Green Tea', emoji: '🍵', color: '#22C55E', nutrition: 'pre', info: 'Mild caffeine + L-theanine delivers calm focus without jitters before competition.' },
]

export const SNACKS = [
  // Pre-workout snacks — fast carbs, easy to digest
  {
    id: 'bagel-jam',
    name: 'Bagel + Jam',
    emoji: '🥯',
    description: 'Plain bagel with strawberry jam — the top-rated pregame snack',
    highlight: '62g carbs, low fat, easy to digest',
    nutrition: 'pre',
    info: 'High-glycemic simple carbs that rapidly load muscle glycogen 60-90 min before play.',
    allergens: ['gluten'],
  },
  {
    id: 'rice-cakes-honey',
    name: 'Rice Cakes + Honey',
    emoji: '🍚',
    description: 'Light rice cakes drizzled with honey for quick fuel',
    highlight: 'Low residue, fast-absorbing carbs',
    nutrition: 'pre',
    info: 'Ultra-light, fast-digesting carb combo that won\'t cause GI distress mid-game.',
  },
  {
    id: 'pretzels-banana',
    name: 'Pretzels + Banana',
    emoji: '🥨',
    description: 'Salted pretzels paired with a banana for carbs and sodium',
    highlight: 'Sodium + potassium, easy on the stomach',
    nutrition: 'pre',
    info: 'Sodium from pretzels + potassium from banana prime fluid balance before sweating.',
  },
  {
    id: 'granola-banana',
    name: 'Granola Bar + Banana',
    emoji: '🍌',
    description: 'Crunchy granola bar paired with a fresh banana',
    highlight: 'Quick energy, potassium boost',
    nutrition: 'pre',
    info: 'Portable carb stacking for sustained and immediate energy on game day.',
  },
  {
    id: 'pbj',
    name: 'PB&J on Whole Wheat',
    emoji: '🥪',
    description: 'Classic peanut butter & jelly on whole wheat bread',
    highlight: 'Balanced carbs and protein',
    nutrition: 'pre',
    info: 'Balanced carbs, protein, and fat for longer-lasting fuel before extended sessions.',
    allergens: ['peanut', 'gluten'],
  },
  {
    id: 'energy-bites',
    name: 'Energy Bites',
    emoji: '⚡',
    description: 'Homemade oat & honey energy bites with rolled oats',
    highlight: 'Natural sugars, sustained energy',
    nutrition: 'pre',
    info: 'Compact, calorie-dense bites deliver quick fuel without bulk or bloating.',
    allergens: ['gluten'],
  },
  // Post-workout snacks — protein, recovery, heavier
  {
    id: 'yogurt-parfait',
    name: 'Greek Yogurt Parfait',
    emoji: '🥄',
    description: 'Greek yogurt layered with granola and mixed berries',
    highlight: 'Protein + carbs for muscle recovery',
    nutrition: 'post',
    info: 'Protein + carbs + probiotics support muscle repair and gut health together.',
    allergens: ['dairy', 'gluten'],
  },
  {
    id: 'protein-bar',
    name: 'Protein Bar',
    emoji: '💪',
    description: 'High-protein bar for quick post-game recovery',
    highlight: '20g protein, rebuilds muscle',
    nutrition: 'post',
    info: 'Convenient high-protein option for immediate recovery when a full meal isn\'t possible.',
    allergens: ['dairy', 'soy'],
  },
  {
    id: 'trail-mix',
    name: 'Trail Mix Pack',
    emoji: '🥜',
    description: 'Nuts, dried fruit, and a touch of chocolate',
    highlight: 'Healthy fats + protein for recovery',
    nutrition: 'post',
    info: 'Calorie-dense mix of fats, protein, and carbs helps replenish total energy expenditure.',
    allergens: ['tree-nut', 'peanut'],
  },
  {
    id: 'banana-pb',
    name: 'Banana + Peanut Butter',
    emoji: '🍌',
    description: 'Sliced banana with a side of peanut butter',
    highlight: 'Carbs + protein + potassium',
    nutrition: 'both',
    info: 'Versatile combo — quick fuel before training or sustained recovery nutrition after.',
    allergens: ['peanut'],
  },
]

// Preset popular combos
export const POPULAR_COMBOS = [
  {
    id: 'beet-boost',
    name: 'The Beet Boost',
    description: 'Beetroot-powered performance blend backed by research',
    base: 'apple-juice',
    fruits: ['banana', 'mixed-berries'],
    boosters: ['beetroot-juice', 'honey'],
    badge: 'Pre-Workout',
  },
  {
    id: 'berry-blast',
    name: 'Berry Blast',
    description: 'Antioxidant-loaded berry explosion with quick carbs',
    base: 'coconut-water',
    fruits: ['strawberry', 'blueberry', 'mixed-berries'],
    boosters: ['honey'],
    badge: 'Pre-Workout',
  },
  {
    id: 'recovery-blend',
    name: 'Recovery Blend',
    description: 'Tart cherry and protein for post-game recovery',
    base: 'chocolate-milk',
    fruits: ['banana', 'mango'],
    boosters: ['tart-cherry', 'protein-powder'],
    badge: 'Post-Workout',
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
  'Crew',
  'Golf',
  'Lacrosse',
  'Tennis',
  'Track & Field',
  'Other',
]
