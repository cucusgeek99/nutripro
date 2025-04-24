// import {
//   GoogleGenAI,
// } from '@google/genai';

// import { NextRequest, NextResponse } from 'next/server';

// // Fonction pour générer le prompt basé sur les données du formulaire
// function generatePromptInput(formData) {
//   const basePrompt = `Rôle & Objectif : Agis comme un·e nutritionniste d'élite, spécialisé·e en nutrition du travail et en chronobiologie appliquée. Ton objectif est de concevoir un plan alimentaire personnalisé, réaliste et scientifiquement fondé sur 3 jours pour un·e professionnel·le exerçant le métier de [Métier]. Adopte un ton expert, empathique et pédagogique.

// Instructions Détaillées :

// 1. Cadrage Utilisateur (À remplir par l'utilisateur final) :
// * Métier Cible : [Insérer le métier spécifique ici, ex: Infirmier·ère de nuit, Développeur·euse web sédentaire, Ouvrier·ère du BTP]
// * Profil :
// * Âge : [ex: 42 ans] (Influence métabolisme, besoins récupération)
// * Objectifs Santé Clés : [Choisir 1-3, ex: Augmenter l'énergie durable, optimiser la récupération musculaire, améliorer la concentration, mieux gérer le stress, perdre/prendre du poids]
// * Contraintes & Préférences : [ex: Allergie aux noix, végétarien·ne, intolérance au lactose, budget limité, n'aime pas cuisiner le soir, préfère les saveurs X ou Y]
// * Contexte Professionnel :
// * Horaires de Travail Typiques : [ex: 8h-18h avec coupure, 21h-7h en roulement, travail posté 3x8] (Crucial pour la chrononutrition)
// * Lieu(x) de Prise des Repas : [ex: Bureau sans cuisine, chantier avec micro-ondes, véhicule, cantine d'entreprise]
// * Temps de Pause Repas Effectif : [ex: Déjeuner 30 min max, pauses courtes de 10 min]
// * Accès Équipement : [ex: Réfrigérateur, micro-ondes, bouilloire uniquement, accès cuisine complète]
// * Niveau d'Activité Physique au Travail : [ex: Très sédentaire, actif modéré (marche), très physique (port de charges lourdes)]`;

//   let promptInput = basePrompt;
  
//   // Replace job placeholder
//   promptInput = promptInput.replace(
//     "[Insérer le métier spécifique ici, ex: Infirmier·ère de nuit, Développeur·euse web sédentaire, Ouvrier·ère du BTP]", 
//     formData.job
//   );
  
//   // Replace age placeholder
//   promptInput = promptInput.replace(
//     "[ex: 42 ans]",
//     `${formData.age} ans`
//   );
  
//   // Replace health goals placeholder
//   promptInput = promptInput.replace(
//     "[Choisir 1-3, ex: Augmenter l'énergie durable, optimiser la récupération musculaire, améliorer la concentration, mieux gérer le stress, perdre/prendre du poids]",
//     formData.healthGoals.join(", ")
//   );
  
//   // Replace constraints placeholder
//   promptInput = promptInput.replace(
//     "[ex: Allergie aux noix, végétarien·ne, intolérance au lactose, budget limité, n'aime pas cuisiner le soir, préfère les saveurs X ou Y]",
//     formData.constraints || "Aucune contrainte particulière"
//   );
  
//   // Replace work hours placeholder
//   promptInput = promptInput.replace(
//     "[ex: 8h-18h avec coupure, 21h-7h en roulement, travail posté 3x8]",
//     formData.workHours
//   );
  
//   // Replace meal locations placeholder
//   promptInput = promptInput.replace(
//     "[ex: Bureau sans cuisine, chantier avec micro-ondes, véhicule, cantine d'entreprise]",
//     formData.mealLocations
//   );
  
//   // Replace meal break placeholder
//   promptInput = promptInput.replace(
//     "[ex: Déjeuner 30 min max, pauses courtes de 10 min]",
//     formData.mealBreakDuration
//   );
  
//   // Replace equipment access placeholder
//   promptInput = promptInput.replace(
//     "[ex: Réfrigérateur, micro-ondes, bouilloire uniquement, accès cuisine complète]",
//     formData.equipmentAccess
//   );
  
//   // Replace activity level placeholder
//   promptInput = promptInput.replace(
//     "[ex: Très sédentaire, actif modéré (marche), très physique (port de charges lourdes)]",
//     formData.activityLevel
//   );
  
//   return promptInput;
// }

// export default async function handler(req, res) {
//   // Only allow POST requests
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   try {
//     const formData = req.body;

//     // Valider les données essentielles
//     if (!formData.job || !formData.age || formData.healthGoals.length === 0) {
//       return res.status(400).json({ message: 'Données manquantes. Veuillez remplir tous les champs obligatoires.' });
//     }

//     // Obtenir la clé API de l'environnement
//     const apiKey = process.env.GEMINI_API_KEY;
    
//     if (!apiKey) {
//       // En développement, simuler une réponse sans appeler l'API
//       if (process.env.NODE_ENV === 'development') {
//         console.log('Mode développement: génération d\'une réponse simulée');
        
//         // Attendre 2 secondes pour simuler le temps de réponse de l'API
//         await new Promise(resolve => setTimeout(resolve, 2000));
        
//         // Simuler un plan nutritionnel
//         const simulatedResponse = `# Plan Alimentaire Personnalisé pour ${formData.job}

// ## Analyse de votre profil professionnel

// En tant que ${formData.job}, âgé(e) de ${formData.age} ans, vous êtes confronté(e) à des sollicitations spécifiques qui impactent votre équilibre nutritionnel. Voici une analyse approfondie des risques et des besoins liés à votre métier.

// ### Risques & Sollicitations Principales

// **Physiques :**
// ${formData.activityLevel.includes('sédentaire') ? 
//   '- Sédentarité prolongée (risques cardiovasculaires, prise de poids, troubles circulatoires)\n- Posture statique (tensions musculaires, douleurs dorsales et cervicales)\n- Fatigue visuelle (travail sur écran)' : 
//   '- Sollicitation musculaire et articulaire importante\n- Risque de fatigue physique cumulée\n- Besoin énergétique élevé'}

// **Mentaux & Psychologiques :**
// ${formData.healthGoals.includes('Mieux gérer le stress') ? 
//   '- Charge mentale élevée\n- Stress chronique\n- Concentration prolongée requise' : 
//   '- Vigilance constante\n- Pression temporelle\n- Interactions sociales fréquentes'}

// ### Nutriments Prioritaires

// 1. **${formData.healthGoals.includes('Améliorer la concentration') ? 'Oméga-3 (EPA/DHA)' : 'Protéines de qualité'}** : Essentiels pour ${formData.healthGoals.includes('Améliorer la concentration') ? 'le fonctionnement cérébral optimal et la concentration' : 'la récupération musculaire et le maintien de la masse maigre'}.

// 2. **Magnésium** : Crucial pour la gestion du stress, la fonction musculaire et la production d'énergie.

// 3. **Vitamines du groupe B** : Soutiennent le métabolisme énergétique et le système nerveux.

// 4. **Antioxydants** : Protègent contre le stress oxydatif lié au stress mental et à la fatigue.

// 5. **Fibres** : Régulent la glycémie pour une énergie stable tout au long de la journée.

// ## Plan Alimentaire sur 3 Jours

// ### Jour 1

// **Petit-déjeuner (8h00):**
// - Porridge d'avoine aux fruits rouges et graines de chia
// - Thé vert ou café sans sucre

// **Déjeuner (12h30):**
// - Bowl de quinoa, légumes rôtis, pois chiches et sauce tahini légère
// - Un fruit de saison

// **Collation (16h00):**
// - Yaourt grec nature + 10 amandes

// **Dîner (19h30):**
// - Wok de légumes et tofu aux saveurs asiatiques
// - Petite portion de riz complet

// **Justification:** Les graines de chia du petit-déjeuner apportent des Oméga-3 essentiels pour soutenir la concentration prolongée nécessaire dans votre travail.

// ### Jour 2

// **Petit-déjeuner (8h00):**
// - Œufs brouillés sur pain complet avec avocat
// - Thé ou café

// **Déjeuner (12h30):**
// - Salade méditerranéenne (tomates, concombre, poivrons, olives, feta, pois chiches)
// - Pain complet

// **Collation (16h00):**
// - Fruit + carré de chocolat noir

// **Dîner (19h30):**
// - Papillote de poisson aux herbes méditerranéennes
// - Légumes verts et patate douce

// **Justification:** Le poisson gras du dîner fournit des Oméga-3 DHA/EPA qui aident à réduire l'inflammation et soutiennent la fonction cognitive.

// ### Jour 3

// **Petit-déjeuner (8h00):**
// - Smoothie vert (épinards, banane, lait d'amande, protéine)
// - Poignée de fruits à coque

// **Déjeuner (12h30):**
// - Wrap complet au houmous, légumes croquants et protéine de votre choix
// - Fruit frais

// **Collation (16h00):**
// - Mélange de noix et fruits secs

// **Dîner (19h30):**
// - Curry de légumes aux saveurs asiatiques et lait de coco léger
// - Riz basmati complet

// **Justification:** Les légumes verts du smoothie sont riches en magnésium, essentiel pour la gestion du stress et la récupération nerveuse.

// ## Conseils de Préparation

// **Batch cooking du week-end:**
// - Cuire en grande quantité: quinoa, riz complet
// - Préparer des légumes rôtis pour les bowls
// - Préparer une base de curry et de sauce tahini
// - Découper les légumes pour les woks et salades

// ## Conseils Professionnels Personnalisés

// **Astuce Chrono-Nutrition:**
// Planifiez consciemment votre collation protéinée vers 16h00 pour éviter la baisse d'énergie de fin de journée et maintenir la concentration jusqu'au soir.

// **3 Erreurs à Éviter:**
// 1. **Grignotage inconscient** devant l'écran → Préparez des snacks sains à l'avance
// 2. **Déjeuner ultra-rapide** devant l'ordinateur → Imposez-vous une vraie pause, loin de l'écran
// 3. **Hydratation insuffisante** → Gardez une grande gourde visible sur votre bureau

// **Conseil Hydratation:**
// Programmez des rappels toutes les heures pour boire quelques gorgées. Visez 1,5 à 2L d'eau par jour, essentiel pour maintenir vos fonctions cognitives.

// ---

// N'oubliez pas que ce plan est une base adaptable à vos préférences personnelles. L'écoute de vos sensations de faim et de satiété reste primordiale.`;
        
//         return res.status(200).json({ nutritionPlan: simulatedResponse });
//       }
      
//       return res.status(500).json({ message: 'Clé API manquante. Veuillez configurer GEMINI_API_KEY dans les variables d\'environnement.' });
//     }

//     // Générer le prompt avec les données du formulaire
//     const promptInput = generatePromptInput(formData);
    
//     // Initialiser le client GoogleGenerativeAI
//     const genAI = new GoogleGenerativeAI(apiKey);
    
//     // Obtenir le modèle
//     const model = genAI.getGenerativeModel({
//       model: 'gemini-2.5-pro-preview-03-25',
//     });
    
//     // Configuration de la requête
//     const generationConfig = {
//       temperature: 0.7,
//       topK: 40,
//       topP: 0.95,
//       maxOutputTokens: 8192,
//     };
    
//     // Préparer le contenu de la requête
//     const contents = [
//       {
//         role: 'user',
//         parts: [{ text: promptInput }],
//       },
//     ];
    
//     // Appeler l'API
//     const result = await model.generateContent({
//       contents,
//       generationConfig,
//     });
    
//     // Extraire le texte de la réponse
//     const response = result.response;
//     const nutritionPlan = response.text();
    
//     // Renvoyer le plan nutritionnel généré
//     return res.status(200).json({ nutritionPlan });
//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
    
//     // Renvoyer une erreur appropriée
//     return res.status(500).json({ 
//       message: 'Une erreur est survenue lors de la génération du plan nutritionnel. Veuillez réessayer.' 
//     });
//   }
// }
































































































// // app/api/nutrition-plan/route.js
// import { NextResponse } from 'next/server';
// import { GoogleGenAI } from '@google/genai';

// // Fonction pour générer le prompt basé sur les données du formulaire
// function generatePromptInput(formData) {
//   const basePrompt = `Rôle & Objectif : Agis comme un·e nutritionniste d'élite, spécialisé·e en nutrition du travail et en chronobiologie appliquée. Ton objectif est de concevoir un plan alimentaire personnalisé, réaliste et scientifiquement fondé sur 3 jours pour un·e professionnel·le exerçant le métier de [Métier]. Adopte un ton expert, empathique et pédagogique.

// Instructions Détaillées :

// 1. Cadrage Utilisateur (À remplir par l'utilisateur final) :
// * Métier Cible : [Insérer le métier spécifique ici, ex: Infirmier·ère de nuit, Développeur·euse web sédentaire, Ouvrier·ère du BTP]
// * Profil :
// * Âge : [ex: 42 ans] (Influence métabolisme, besoins récupération)
// * Objectifs Santé Clés : [Choisir 1-3, ex: Augmenter l'énergie durable, optimiser la récupération musculaire, améliorer la concentration, mieux gérer le stress, perdre/prendre du poids]
// * Contraintes & Préférences : [ex: Allergie aux noix, végétarien·ne, intolérance au lactose, budget limité, n'aime pas cuisiner le soir, préfère les saveurs X ou Y]
// * Contexte Professionnel :
// * Horaires de Travail Typiques : [ex: 8h-18h avec coupure, 21h-7h en roulement, travail posté 3x8] (Crucial pour la chrononutrition)
// * Lieu(x) de Prise des Repas : [ex: Bureau sans cuisine, chantier avec micro-ondes, véhicule, cantine d'entreprise]
// * Temps de Pause Repas Effectif : [ex: Déjeuner 30 min max, pauses courtes de 10 min]
// * Accès Équipement : [ex: Réfrigérateur, micro-ondes, bouilloire uniquement, accès cuisine complète]
// * Niveau d'Activité Physique au Travail : [ex: Très sédentaire, actif modéré (marche), très physique (port de charges lourdes)]`;

//   let promptInput = basePrompt;
  
//   // Remplacer les placeholders avec les données du formulaire
//   promptInput = promptInput.replace(
//     "[Insérer le métier spécifique ici, ex: Infirmier·ère de nuit, Développeur·euse web sédentaire, Ouvrier·ère du BTP]", 
//     formData.job
//   );
  
//   promptInput = promptInput.replace(
//     "[ex: 42 ans]",
//     `${formData.age} ans`
//   );
  
//   promptInput = promptInput.replace(
//     "[Choisir 1-3, ex: Augmenter l'énergie durable, optimiser la récupération musculaire, améliorer la concentration, mieux gérer le stress, perdre/prendre du poids]",
//     formData.healthGoals.join(", ")
//   );
  
//   promptInput = promptInput.replace(
//     "[ex: Allergie aux noix, végétarien·ne, intolérance au lactose, budget limité, n'aime pas cuisiner le soir, préfère les saveurs X ou Y]",
//     formData.constraints || "Aucune contrainte particulière"
//   );
  
//   promptInput = promptInput.replace(
//     "[ex: 8h-18h avec coupure, 21h-7h en roulement, travail posté 3x8]",
//     formData.workHours
//   );
  
//   promptInput = promptInput.replace(
//     "[ex: Bureau sans cuisine, chantier avec micro-ondes, véhicule, cantine d'entreprise]",
//     formData.mealLocations
//   );
  
//   promptInput = promptInput.replace(
//     "[ex: Déjeuner 30 min max, pauses courtes de 10 min]",
//     formData.mealBreakDuration
//   );
  
//   promptInput = promptInput.replace(
//     "[ex: Réfrigérateur, micro-ondes, bouilloire uniquement, accès cuisine complète]",
//     formData.equipmentAccess
//   );
  
//   promptInput = promptInput.replace(
//     "[ex: Très sédentaire, actif modéré (marche), très physique (port de charges lourdes)]",
//     formData.activityLevel
//   );
  
//   return promptInput;
// }

// export async function POST(request) {
//   try {
//     // Parse le corps de la requête
//     const formData = await request.json();

//     // Valider les données essentielles
//     if (!formData.job || !formData.age || !formData.healthGoals || formData.healthGoals.length === 0) {
//       return NextResponse.json(
//         { message: 'Données manquantes. Veuillez remplir tous les champs obligatoires.' },
//         { status: 400 }
//       );
//     }

//     // Obtenir la clé API de l'environnement
//     const apiKey = process.env.GEMINI_API_KEY;
    
//     if (!apiKey) {
//       // En développement, simuler une réponse sans appeler l'API
//       if (process.env.NODE_ENV === 'development') {
//         console.log('Mode développement: génération d\'une réponse simulée');
//         await new Promise(resolve => setTimeout(resolve, 2000));
        
//         const simulatedResponse = `# Plan Alimentaire Personnalisé pour ${formData.job}...`;
//         return NextResponse.json({ nutritionPlan: simulatedResponse });
//       }
      
//       return NextResponse.json(
//         { message: 'Clé API manquante. Veuillez configurer GEMINI_API_KEY dans les variables d\'environnement.' },
//         { status: 500 }
//       );
//     }

//     // Générer le prompt avec les données du formulaire
//     const promptInput = generatePromptInput(formData);
    
//     // Initialiser le client GoogleGenAI
//     const ai = new GoogleGenAI({
//       apiKey: apiKey,
//     });
    
//     // Configuration de la requête
//     const config = {
//       responseMimeType: 'text/plain',
//     };
    
//     // Modèle à utiliser
//     const model = 'gemini-2.0-flash';
    
//     // Construire le contenu de la requête
//     const contents = [
//       {
//         role: 'user',
//         parts: [
//           {
//             text: promptInput,
//           },
//         ],
//       },
//     ];
    
//     // Appeler l'API avec generateContentStream
//     const response = await ai.models.generateContentStream({
//       model,
//       config,
//       contents,
//     });
    
//     // Collecter la réponse en streaming
//     let nutritionPlan = '';
//     for await (const chunk of response) {
//       nutritionPlan += chunk.text;
//     }
    
//     // Renvoyer le plan nutritionnel généré
//     return NextResponse.json({ nutritionPlan });
//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
    
//     return NextResponse.json(
//       { 
//         message: 'Une erreur est survenue lors de la génération du plan nutritionnel. Veuillez réessayer.',
//         error: process.env.NODE_ENV === 'development' ? error : undefined
//       },
//       { status: 500 }
//     );
//   }
// }






























































































// app/api/nutrition-plan/route.js
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Fonction pour générer le prompt basé sur les données du formulaire
function generatePromptInput(formData) {
  // Prompt modifié pour demander un JSON structuré
  const basePrompt = `Rôle & Objectif : Agis comme un·e nutritionniste d'élite, spécialisé·e en nutrition du travail et en chronobiologie appliquée. Ton objectif est de concevoir un plan alimentaire personnalisé, réaliste et scientifiquement fondé sur 3 jours pour un·e professionnel·le exerçant le métier de [Métier]. 

Instructions Détaillées :

1. Cadrage Utilisateur (À remplir par l'utilisateur final) :
* Métier Cible : [Insérer le métier spécifique ici, ex: Infirmier·ère de nuit, Développeur·euse web sédentaire, Ouvrier·ère du BTP]
* Profil :
* Âge : [ex: 42 ans] (Influence métabolisme, besoins récupération)
* Objectifs Santé Clés : [Choisir 1-3, ex: Augmenter l'énergie durable, optimiser la récupération musculaire, améliorer la concentration, mieux gérer le stress, perdre/prendre du poids]
* Contraintes & Préférences : [ex: Allergie aux noix, végétarien·ne, intolérance au lactose, budget limité, n'aime pas cuisiner le soir, préfère les saveurs X ou Y]
* Contexte Professionnel :
* Horaires de Travail Typiques : [ex: 8h-18h avec coupure, 21h-7h en roulement, travail posté 3x8] (Crucial pour la chrononutrition)
* Lieu(x) de Prise des Repas : [ex: Bureau sans cuisine, chantier avec micro-ondes, véhicule, cantine d'entreprise]
* Temps de Pause Repas Effectif : [ex: Déjeuner 30 min max, pauses courtes de 10 min]
* Accès Équipement : [ex: Réfrigérateur, micro-ondes, bouilloire uniquement, accès cuisine complète]
* Niveau d'Activité Physique au Travail : [ex: Très sédentaire, actif modéré (marche), très physique (port de charges lourdes)]

IMPORTANT: Tu dois fournir ta réponse exclusivement au format JSON suivant sans aucun texte en dehors du JSON. Le format doit être strictement respecté:

{
  "metier": "Le métier de la personne",
  "age": "L'âge de la personne",
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
        "focus": "Point nutritionnel important"
      },
      "dejeuner": {
        "repas": "Description du repas",
        "preparation": "Temps de préparation",
        "focus": "Point nutritionnel important"
      },
      "collation": {
        "repas": "Description du repas",
        "preparation": "Temps de préparation",
        "focus": "Point nutritionnel important"
      },
      "diner": {
        "repas": "Description du repas",
        "preparation": "Temps de préparation",
        "focus": "Point nutritionnel important"
      },
      "justificationScientifique": "Explication du bénéfice d'un ingrédient clé du jour"
    },
    "jour2": {
      "petitDejeuner": { ... },
      "dejeuner": { ... },
      "collation": { ... },
      "diner": { ... },
      "justificationScientifique": "..."
    },
    "jour3": {
      "petitDejeuner": { ... },
      "dejeuner": { ... },
      "collation": { ... },
      "diner": { ... },
      "justificationScientifique": "..."
    }
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

export async function POST(request) {
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
    
    // // Initialiser le client GoogleGenAI
    // const ai = new GoogleGenAI({
    //   apiKey: apiKey,
    // });
    
   
    
    // // Modèle à utiliser
    // const model = 'gemini-2.0-flash';
    
    // // Construire le contenu de la requête
    // const contents = [
    //   {
    //     role: 'user',
    //     parts: [
    //       {
    //         text: promptInput,
    //       },
    //     ],
    //   },
    // ];
    
    // // Appeler l'API avec generateContent (pas de streaming pour le JSON)
    // const response = await ai.models.generateContent({
    //   model,
    //   config,
    //   contents,
    // });


    // console.log('API response:', response);

    
    // // Extraire le texte de la réponse et le parser en JSON
    // const responseText = response.responseId.text();


//     // Initialiser le client GoogleGenAI
// const ai = new GoogleGenAI({
//   apiKey: apiKey,
// });

// // Obtenir le modèle
// const model = ai.getGenerativeModel({
//   model: 'gemini-2.0-flash'
// });

// // Appeler l'API avec generateContent
// const result = await model.generateContent({
//   contents: [{ parts: [{ text: promptInput }] }],
//   generationConfig: {
//     temperature: 0.7,
//     maxOutputTokens: 8192,
//   }
// });

// // Vérification de la structure de la réponse
// if (!result || !result.response) {
//   throw new Error('Réponse API invalide');
// }



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


    // const response = result.response;

// const responseText = result.response.text();

    
    try {
      // Extraire le JSON de la réponse (au cas où il y aurait du texte avant/après)
      const jsonMatch = nutritionPlann.match(/\{.*\}/s);
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