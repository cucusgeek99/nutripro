import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
const countryOptions = [
  { value: 'FR', label: 'France' },
  {value : 'TG', label: 'Togo'},
  { value: 'SN', label: 'Sénégal' },
  { value: 'MA', label: 'Maroc' },
  { value: 'CI', label: 'Côte d\'Ivoire' },
  { value: 'BJ', label: 'Bénin' },
  { value: 'NE', label: 'Niger' },
  { value: 'ML', label: 'Mali' },
  { value: 'BE', label: 'Belgique' },
  { value: 'CH', label: 'Suisse' },
  { value: 'CA', label: 'Canada' },
  { value: 'US', label: 'États-Unis' },
  { value: 'UK', label: 'Royaume-Uni' },
  { value: 'ES', label: 'Espagne' },
  { value: 'IT', label: 'Italie' },
  { value: 'DE', label: 'Allemagne' },
  { value: 'other', label: 'Autre pays' }
];

const cuisineTypeOptions = [
  { value: 'french', label: 'Française' },
  { value: 'mediterranean', label: 'Méditerranéenne' },
  { value: 'asian', label: 'Asiatique' },
  { value: 'indian', label: 'Indienne' },
  { value: 'mexican', label: 'Mexicaine' },
  { value: 'american', label: 'Américaine' },
  { value: 'vegetarian', label: 'Végétarienne' },
  { value: 'vegan', label: 'Végane' },
  { value: 'fusion', label: 'Fusion' },
  { value: 'traditional', label: 'Traditionnelle locale' }
];


function generatePromptInput(formData: any) {
  // Prompt modifié pour demander un JSON structuré
  const basePrompt = `Rôle & Objectif : Agis comme un·e nutritionniste d'élite, spécialisé·e en nutrition du travail et en chronobiologie appliquée. Ton objectif est de concevoir un plan alimentaire personnalisé, réaliste et scientifiquement fondé sur 3 jours pour un·e professionnel·le exerçant le métier de [Métier]. 

Instructions Détaillées :

1. Cadrage Utilisateur (À remplir par l'utilisateur final) :
* Métier Cible : [Insérer le métier spécifique ici, ex: Infirmier·ère de nuit, Développeur·euse web sédentaire, Ouvrier·ère du BTP]
* Profil :
* Âge : [ex: 42 ans] (Influence métabolisme, besoins récupération)
* Pays de résidence : [Pays] (Pour adapter les ingrédients disponibles localement)
* Préférences culinaires : [Préférences] (Types de cuisine préférés)
* Objectifs Santé Clés : [Choisir 1-3, ex: Augmenter l'énergie durable, optimiser la récupération musculaire, améliorer la concentration, mieux gérer le stress, perdre/prendre du poids]
* Contraintes & Préférences : [ex: Allergie aux noix, végétarien·ne, intolérance au lactose, budget limité, n'aime pas cuisiner le soir, préfère les saveurs X ou Y]
* Contexte Professionnel :
* Horaires de Travail Typiques : [ex: 8h-18h avec coupure, 21h-7h en roulement, travail posté 3x8] (Crucial pour la chrononutrition)
* Lieu(x) de Prise des Repas : [ex: Bureau sans cuisine, chantier avec micro-ondes, véhicule, cantine d'entreprise]
* Temps de Pause Repas Effectif : [ex: Déjeuner 30 min max, pauses courtes de 10 min]
* Accès Équipement : [ex: Réfrigérateur, micro-ondes, bouilloire uniquement, accès cuisine complète]
* Niveau d'Activité Physique au Travail : [ex: Très sédentaire, actif modéré (marche), très physique (port de charges lourdes)]

IMPORTANT: Tu dois tenir compte des éléments suivants dans ta recommandation :
1. Adapter les ingrédients en fonction du pays de résidence ([Pays]) pour garantir leur disponibilité locale
2. Privilégier les types de cuisine correspondant aux préférences ([Préférences]) quand cela est possible
3. Fournir ta réponse exclusivement au format JSON suivant sans aucun texte en dehors du JSON. Le format doit être strictement respecté:

{
  "metier": "Le métier de la personne",
  "age": "L'âge de la personne",
  "pays": "Pays de résidence",
  "preferencesCulinaires": ["type1", "type2", ...],
  "profil": {
    "objectifsSante": ["objectif1", "objectif2", ...],
    "contraintes": "Contraintes et préférences"
  },
  "analyse": {
    "risques": {
      "physiques": ["risque1", "risque2", ...],
      "mentaux": ["risque1", "risque2", ...]
    },
    "nutrimentsPrioritaires": [
      {
        "nom": "Nom du nutriment",
        "importance": "Raison pour laquelle ce nutriment est important pour ce métier",
        "sources": ["source1", "source2", ...]
      },
      ...
    ]
  },
  "planAlimentaire": {
    "jour1": {
      "petitDejeuner": {
        "repas": "Description du repas",
        "preparation": "Temps de préparation",
        "focus": "Point nutritionnel important",
        "ingredientsLocaux": ["ingrédient1", "ingrédient2", ...]
      },
      "dejeuner": {
        "repas": "Description du repas",
        "preparation": "Temps de préparation",
        "focus": "Point nutritionnel important",
        "ingredientsLocaux": ["ingrédient1", "ingrédient2", ...]
      },
      "collation": {
        "repas": "Description du repas",
        "preparation": "Temps de préparation",
        "focus": "Point nutritionnel important",
        "ingredientsLocaux": ["ingrédient1", "ingrédient2", ...]
      },
      "diner": {
        "repas": "Description du repas",
        "preparation": "Temps de préparation",
        "focus": "Point nutritionnel important",
        "ingredientsLocaux": ["ingrédient1", "ingrédient2", ...]
      },
      "justificationScientifique": "Explication du bénéfice de chaque ingrédient"
    },
    "jour2": { ... },
    "jour3": { ... }
  },
  "alternatives": {
    "petitDejeuner": ["alternative1", "alternative2", "alternative3"],
    "dejeuner": ["alternative1", "alternative2", "alternative3"],
    "diner": ["alternative1", "alternative2", "alternative3"]
  },
  "conseilsPratiques": {
    "chrononutrition": "Conseil spécifique lié à la chronobiologie",
    "erreursAEviter": [
      {
        "erreur": "Description de l'erreur",
        "solution": "Solution proposée"
      },
      ...
    ],
    "hydratation": "Conseil spécifique pour l'hydratation"
  },
  "mealPrep": ["suggestion1", "suggestion2", ...]
}

N'inclus aucun texte en dehors de ce JSON.`;

  let promptInput = basePrompt;
  
  // Remplacer les placeholders avec les données du formulaire
  promptInput = promptInput.replace(
    "[Insérer le métier spécifique ici, ex: Infirmier·ère de nuit, Développeur·euse web sédentaire, Ouvrier·ère du BTP]", 
    formData.job
  );
  
  promptInput = promptInput.replace(
    "[ex: 42 ans]",
    `${formData.age} ans`
  );
  
  // Nouveaux remplacements pour les champs ajoutés
  const countryLabel = countryOptions.find(c => c.value === formData.country)?.label || formData.country;
  promptInput = promptInput.replace(
    "[Pays]",
    countryLabel
  );
  
  const cuisineLabels = formData.cuisinePreferences.map((pref: string) => {
    const cuisine = cuisineTypeOptions.find(c => c.value === pref);
    return cuisine ? cuisine.label : pref;
  }).join(", ");
  promptInput = promptInput.replace(
    "[Préférences]",
    cuisineLabels || "Pas de préférence spécifique"
  );
  
  promptInput = promptInput.replace(
    "[Choisir 1-3, ex: Augmenter l'énergie durable, optimiser la récupération musculaire, améliorer la concentration, mieux gérer le stress, perdre/prendre du poids]",
    formData.healthGoals.join(", ")
  );
  
  promptInput = promptInput.replace(
    "[ex: Allergie aux noix, végétarien·ne, intolérance au lactose, budget limité, n'aime pas cuisiner le soir, préfère les saveurs X ou Y]",
    formData.constraints || "Aucune contrainte particulière"
  );
  
  promptInput = promptInput.replace(
    "[ex: 8h-18h avec coupure, 21h-7h en roulement, travail posté 3x8]",
    formData.workHours
  );
  
  promptInput = promptInput.replace(
    "[ex: Bureau sans cuisine, chantier avec micro-ondes, véhicule, cantine d'entreprise]",
    formData.mealLocations
  );
  
  promptInput = promptInput.replace(
    "[ex: Déjeuner 30 min max, pauses courtes de 10 min]",
    formData.mealBreakDuration
  );
  
  promptInput = promptInput.replace(
    "[ex: Réfrigérateur, micro-ondes, bouilloire uniquement, accès cuisine complète]",
    formData.equipmentAccess
  );
  
  promptInput = promptInput.replace(
    "[ex: Très sédentaire, actif modéré (marche), très physique (port de charges lourdes)]",
    formData.activityLevel
  );
  
  return promptInput;
}

export async function POST(request: Request) {
  try {
    // Parse le corps de la requête
    const formData = await request.json();

    // Valider les données essentielles
    if (!formData.job || !formData.age || !formData.healthGoals || formData.healthGoals.length === 0) {
      return NextResponse.json(
        { message: 'Données manquantes. Veuillez remplir tous les champs obligatoires.' },
        { status: 400 }
      );
    }

    // Obtenir la clé API de l'environnement
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      // En développement, simuler une réponse sans appeler l'API
      if (process.env.NODE_ENV === 'development') {
        console.log('Mode développement: génération d\'une réponse JSON simulée');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simuler une réponse JSON
        const simulatedResponse = {
          "metier": formData.job,
          "age": formData.age,
          "profil": {
            "objectifsSante": formData.healthGoals,
            "contraintes": formData.constraints || "Aucune contrainte particulière"
          },
          "analyse": {
            "risques": {
              "physiques": [
                "Sédentarité prolongée",
                "Posture statique",
                "Fatigue visuelle (travail sur écran)"
              ],
              "mentaux": [
                "Charge mentale élevée",
                "Concentration intense et prolongée",
                "Stress chronique",
                "Pression temporelle (deadlines)"
              ]
            },
            "nutrimentsPrioritaires": [
              {
                "nom": "Oméga-3 (EPA/DHA)",
                "importance": "Essentiels pour la fonction cérébrale (concentration, mémoire), la santé visuelle et rôle anti-inflammatoire",
                "sources": ["Poissons gras (saumon, maquereau)", "Huiles (colza, lin)", "Noix", "Graines de chia/lin"]
              },
              {
                "nom": "Magnésium",
                "importance": "Gestion du stress et de l'anxiété, relaxation musculaire, production d'énergie",
                "sources": ["Légumes verts feuillus", "Oléagineux (amandes, cajou)", "Chocolat noir", "Céréales complètes"]
              },
              {
                "nom": "Vitamines du groupe B",
                "importance": "Métabolisme énergétique, fonction du système nerveux, synthèse des neurotransmetteurs",
                "sources": ["Céréales complètes", "Légumineuses", "Œufs", "Viandes maigres"]
              }
            ]
          },
          "planAlimentaire": {
            "jour1": {
              "petitDejeuner": {
                "repas": "Overnight Oats: 40g flocons d'avoine + 150ml lait d'amande + 1 c.à.s graines de chia + 1 c.à.s noix concassées + 1/2 banane",
                "preparation": "< 5 min la veille",
                "focus": "Fibres (avoine, chia), Oméga-3 (chia, noix)"
              },
              "dejeuner": {
                "repas": "Salade de quinoa: Base de quinoa cuit + Pois chiches + concombre + tomates cerises + épinards frais + 1/2 avocat + Vinaigrette huile de colza/citron",
                "preparation": "10 min (si quinoa préparé)",
                "focus": "Protéines végétales, fibres, bons gras"
              },
              "collation": {
                "repas": "1 yaourt grec nature + 10 amandes",
                "preparation": "< 1 min",
                "focus": "Protéines, Magnésium"
              },
              "diner": {
                "repas": "Wok de légumes avec tofu: tofu ferme + mélange de légumes (brocoli, carotte, poivron) + sauce soja légère + gingembre + riz complet",
                "preparation": "15-20 min",
                "focus": "Protéines végétales, légumes, léger"
              },
              "justificationScientifique": "Les graines de chia et noix du petit-déjeuner fournissent des Oméga-3 et des fibres, essentiels pour démarrer la journée avec une énergie cérébrale optimale."
            },
            "jour2": {
              "petitDejeuner": {
                "repas": "2 œufs brouillés + 1 tranche de pain complet grillé + 1/4 avocat",
                "preparation": "10 min",
                "focus": "Protéines, bons gras, glucides complexes"
              },
              "dejeuner": {
                "repas": "Wrap complet: tortilla complète + houmous + blanc de poulet grillé + carottes râpées + épinards + pomme",
                "preparation": "10 min",
                "focus": "Équilibré, pratique, transportable"
              },
              "collation": {
                "repas": "1 banane + 2 carrés de chocolat noir (>70%)",
                "preparation": "< 1 min",
                "focus": "Énergie rapide, Magnésium et Antioxydants"
              },
              "diner": {
                "repas": "Saumon en papillote: pavé de saumon + aneth + citron + asperges + purée de patate douce",
                "preparation": "10 min active + 20 min cuisson",
                "focus": "Oméga-3, Magnésium, Vitamines B"
              },
              "justificationScientifique": "Le saumon est riche en Oméga-3 (EPA/DHA), bénéfique pour la plasticité cérébrale, la concentration et la gestion de l'inflammation liée au stress."
            },
            "jour3": {
              "petitDejeuner": {
                "repas": "Smoothie vert: épinards + banane + protéine en poudre + lait d'amande + beurre d'amande",
                "preparation": "5 min",
                "focus": "Rapide, dense en nutriments, Magnésium"
              },
              "dejeuner": {
                "repas": "Soupe de lentilles corail coco curry + 1 tranche de pain complet",
                "preparation": "5 min (réchauffage)",
                "focus": "Fibres, protéines végétales, Fer"
              },
              "collation": {
                "repas": "Noix de cajou non salées + abricots secs",
                "preparation": "< 1 min",
                "focus": "Magnésium, énergie lente et rapide"
              },
              "diner": {
                "repas": "Curry végétarien: pois chiches + courgette + épinards + lait de coco léger + épices curry + quinoa",
                "preparation": "15 min",
                "focus": "Végétal, fibres, saveurs exotiques"
              },
              "justificationScientifique": "Les lentilles corail sont riches en fer et en fibres solubles, favorisant une concentration soutenue durant l'après-midi sans somnolence digestive."
            }
          },
          "alternatives": {
            "petitDejeuner": [
              "Option salée: Omelette aux légumes (champignons, épinards) + pain complet",
              "Option sans gluten: Porridge de flocons de sarrasin avec fruits et graines",
              "Option très rapide (<5min): Fruit entier + poignée d'oléagineux + yaourt à boire"
            ],
            "dejeuner": [
              "Version végétarienne: Remplacer les protéines animales par tofu, tempeh ou légumineuses",
              "Option sans réchauffage: Salade composée avec pâtes complètes, légumes et protéines",
              "Option budget: Soupe de légumineuses, œufs, légumes de saison"
            ],
            "diner": [
              "Option plus copieuse: Augmenter la portion de féculents complets",
              "Option 'zéro cuisine': Assemblage pain complet + protéine + crudités",
              "Option familiale: Curry ou wok en plus grande quantité"
            ]
          },
          "conseilsPratiques": {
            "chrononutrition": "Planifiez votre collation vers 16h (protéines + magnésium) pour contrer la baisse d'énergie et maintenir la concentration",
            "erreursAEviter": [
              {
                "erreur": "Grignotage inconscient de produits sucrés/gras devant l'écran",
                "solution": "Préparer des snacks sains à portée de main et identifier les déclencheurs du grignotage"
              },
              {
                "erreur": "Déjeuner ultra-rapide devant l'ordinateur",
                "solution": "Sanctuariser la pause déjeuner (minimum 30 min) loin de l'écran"
              },
              {
                "erreur": "Consommation excessive de caféine",
                "solution": "Limiter à 2-3 tasses par jour, avant 14h-15h, et privilégier alternatives (thé vert, infusions)"
              }
            ],
            "hydratation": "Gardez une gourde visible sur votre bureau avec objectif de la vider et remplir 2 fois par jour. Programmez des rappels pour boire régulièrement."
          },
          "mealPrep": [
            "Dimanche: cuire une grande quantité de céréales complètes (quinoa, riz brun)",
            "Préparer et découper des légumes à l'avance pour les salades et woks",
            "Préparer une grande portion de soupe de lentilles pour le jour 3"
          ]
        };
        
        return NextResponse.json({ nutritionPlan: simulatedResponse });
      }
      
      return NextResponse.json(
        { message: 'Clé API manquante. Veuillez configurer GEMINI_API_KEY dans les variables d\'environnement.' },
        { status: 500 }
      );
    }

    // Générer le prompt avec les données du formulaire
    const promptInput = generatePromptInput(formData);
    
  

    // Initialiser le client GoogleGenAI
    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });
    
    // Configuration de la requête
    const config = {
      responseMimeType: 'text/plain',
    };
    
    // Modèle à utiliser
    const model = 'gemini-2.5-flash-preview-04-17';
    
    // Construire le contenu de la requête
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: promptInput,
          },
        ],
      },
    ];
    
    // Appeler l'API avec generateContentStream
    const result = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });


    console.log('API response:', result);

    // Collecter la réponse en streaming
    let nutritionPlann = '';
    for await (const chunk of result) {
      nutritionPlann += chunk.text;
    }
    

    console.log('API response:', nutritionPlann);
    // Extraire le texte de la réponse


  
    
    try {
      // Extraire le JSON de la réponse (au cas où il y aurait du texte avant/après)
      const jsonMatch = nutritionPlann.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Impossible d'extraire le JSON de la réponse");
      }
      
      const jsonString = jsonMatch[0];
      const nutritionPlan = JSON.parse(jsonString);
      
      // Renvoyer le plan nutritionnel au format JSON
      return NextResponse.json({ nutritionPlan });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      console.log('API response:', result);
      
      // En cas d'échec de parsing, renvoyer le texte brut
      return NextResponse.json({ 
        nutritionPlan: result,
        error: "La réponse n'a pas pu être formatée correctement en JSON"
      });
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    return NextResponse.json(
      { 
        message: 'Une erreur est survenue lors de la génération du plan nutritionnel. Veuillez réessayer.',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}
