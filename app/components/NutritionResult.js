

'use client';
// components/NutritionResult.js
import { useRef, useState, useEffect } from 'react';

export default function NutritionResult({ result, onReset }) {
  const resultRef = useRef(null);
  const [activeTab, setActiveTab] = useState('resume'); // 'resume', 'jour1', 'jour2', 'jour3', 'conseils'
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Analyser le résultat (gestion de string ou JSON)
  const parsedResult = typeof result === 'string' 
    ? (() => { try { return JSON.parse(result); } catch (e) { return null; } })() 
    : result;

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour scroller en haut
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Impression améliorée
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Plan Nutritionnel Personnalisé</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              padding: 20px;
              color: #1a202c;
            }
            h1 { 
              color: #2c5282; 
              font-size: 2em;
              margin-bottom: 0.5em;
              border-bottom: 3px solid #3182ce;
              padding-bottom: 0.3em;
            }
            h2 { 
              color: #3182ce; 
              font-size: 1.5em;
              margin-top: 1.5em;
              border-bottom: 2px solid #e2e8f0; 
              padding-bottom: 0.3em;
            }
            h3 { 
              color: #4299e1; 
              font-size: 1.2em;
              margin-top: 1em;
            }
            ul, ol { 
              padding-left: 25px;
            }
            li { 
              margin-bottom: 0.5em;
            }
            p { 
              margin: 0.5em 0;
            }
            strong { 
              color: #2d3748;
              font-weight: bold;
            }
            .card {
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 15px;
              margin-bottom: 15px;
              background-color: #f9fafc;
            }
            .meal-title {
              font-weight: bold;
              color: #3182ce;
              margin-bottom: 5px;
            }
            .meal-content {
              margin-bottom: 8px;
            }
            .meal-prep {
              font-size: 0.9em;
              font-style: italic;
              color: #718096;
            }
            .meal-focus {
              font-weight: bold;
              color: #4a5568;
            }
            .alternative {
              background-color: #ebf8ff;
              padding: 10px;
              margin: 5px 0;
              border-radius: 5px;
            }
            .conseil {
              background-color: #e6fffa;
              padding: 15px;
              margin: 10px 0;
              border-radius: 5px;
            }
            .erreur {
              display: flex;
              margin: 10px 0;
            }
            .erreur-content {
              flex: 1;
            }
            .justification {
              font-style: italic;
              border-left: 3px solid #3182ce;
              padding-left: 10px;
              margin: 10px 0;
            }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>Plan Nutritionnel Personnalisé pour ${parsedResult?.metier || 'Professionnel'}</h1>
          <div class="content">
            ${resultRef.current.innerHTML}
          </div>
          <footer style="text-align: center; margin-top: 2em; color: #718096;">
            <p>Plan nutritionnel généré le ${new Date().toLocaleDateString('fr-FR')}</p>
            <p>© NutriPro - Tous droits réservés</p>
          </footer>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Téléchargement du plan
  const handleDownload = (format = 'json') => {
    let content, filename, type;
    
    if (format === 'json') {
      content = JSON.stringify(parsedResult, null, 2);
      filename = 'plan-nutritionnel.json';
      type = 'application/json';
    } else if (format === 'pdf') {
      // Simuler un PDF avec HTML pour téléchargement
      const htmlContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Plan Nutritionnel Personnalisé</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; color: #1a202c; }
              h1 { color: #2c5282; }
              h2 { color: #3182ce; }
              h3 { color: #4299e1; }
              ul { padding-left: 20px; }
            </style>
          </head>
          <body>
            <h1>Plan Nutritionnel Personnalisé</h1>
            ${resultRef.current.innerHTML}
          </body>
        </html>
      `;
      content = htmlContent;
      filename = 'plan-nutritionnel.html';
      type = 'text/html';
    }

    const element = document.createElement('a');
    const file = new Blob([content], { type });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Copier dans le presse-papiers
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(parsedResult, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Navigation entre les onglets
  const DayNavigation = () => (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      <button
        onClick={() => setActiveTab('resume')}
        className={`px-4 py-2 rounded-md flex items-center ${
          activeTab === 'resume' 
            ? 'bg-blue-400 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Résumé
      </button>
      {['jour1', 'jour2', 'jour3'].map((jour, index) => (
        <button
          key={jour}
          onClick={() => setActiveTab(jour)}
          className={`px-4 py-2 rounded-md flex items-center ${
            activeTab === jour 
              ? 'bg-blue-400 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Jour {index + 1}
        </button>
      ))}
      <button
        onClick={() => setActiveTab('conseils')}
        className={`px-4 py-2 rounded-md flex items-center ${
          activeTab === 'conseils' 
            ? 'bg-blue-400 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Conseils
      </button>
    </div>
  );

  // Si pas de résultat JSON valide, afficher un message d'erreur
  if (!parsedResult) {
    return (
      <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
        <svg className="h-12 w-12 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-red-800 mt-4">Format de réponse invalide</h3>
        <p className="text-red-700 mt-2">
          Le plan nutritionnel n'a pas pu être correctement formaté. Veuillez réessayer.
        </p>
        <button
          onClick={onReset}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  // Rendu d'un repas individuel
  const RenderMeal = ({ meal, title }) => {
    if (!meal) return null;
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg mb-4 shadow-sm">
        <h3 className="text-lg font-medium text-blue-500 mb-2">{title}</h3>
        <p className="text-gray-800">{meal.repas}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Préparation: {meal.preparation}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Focus: {meal.focus}
          </span>
        </div>
      </div>
    );
  };

  // Rendu d'un jour complet de repas
  const RenderDay = ({ day }) => {
    if (!day) return null;
    
    return (
      <div className="space-y-4">
        <RenderMeal meal={day.petitDejeuner} title="Petit déjeuner" />
        <RenderMeal meal={day.dejeuner} title="Déjeuner" />
        <RenderMeal meal={day.collation} title="Collation" />
        <RenderMeal meal={day.diner} title="Dîner" />
        
        {day.justificationScientifique && (
          <div className="bg-blue-50 p-4 border-l-4 border-blue-400 rounded-r-lg mt-6">
            <h3 className="text-md font-medium text-blue-800 flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Justification scientifique
            </h3>
            <p className="mt-2 text-blue-600 italic">
              {day.justificationScientifique}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Rendu de l'onglet résumé
  const RenderResume = () => {
    return (
      <div className="space-y-8">
        {/* Profil */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 ml-3">Votre profil</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">Métier</h3>
              <p className="text-lg font-medium text-gray-900">{parsedResult.metier}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">Âge</h3>
              <p className="text-lg font-medium text-gray-900">{parsedResult.age}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">Objectifs</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {parsedResult.profil.objectifsSante.map((objectif, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {objectif}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {parsedResult.profil.contraintes && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-1">Contraintes & Préférences</h3>
              <p className="text-gray-700">{parsedResult.profil.contraintes}</p>
            </div>
          )}
        </div>
        
        {/* Analyse */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 ml-3">Analyse de votre profil professionnel</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Risques */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Risques & Sollicitations</h3>
              
              <div className="space-y-4">
                <div className="bg-red-50 p-3 rounded-md">
                  <h4 className="font-medium flex items-center text-red-700">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Risques physiques
                  </h4>
                  <ul className="mt-2 space-y-1 text-red-800">
                    {parsedResult.analyse.risques.physiques.map((risque, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        {risque}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-md">
                  <h4 className="font-medium flex items-center text-yellow-700">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Risques mentaux & psychologiques
                  </h4>
                  <ul className="mt-2 space-y-1 text-yellow-800">
                    {parsedResult.analyse.risques.mentaux.map((risque, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-400 mr-2">•</span>
                        {risque}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Nutriments prioritaires */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Nutriments prioritaires</h3>
              
              <div className="space-y-3">
                {parsedResult.analyse.nutrimentsPrioritaires.map((nutriment, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-md">
                    <h4 className="font-medium text-blue-700">{nutriment.nom}</h4>
                    <p className="text-sm text-blue-600 mt-1">{nutriment.importance}</p>
                    
                    <div className="mt-2">
                      <span className="text-xs text-blue-500 uppercase tracking-wide">Sources:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {nutriment.sources.map((source, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Meal Prep */}
        {parsedResult.mealPrep && parsedResult.mealPrep.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 ml-3">Préparations à l'avance (Meal Prep)</h2>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <ul className="space-y-2">
                {parsedResult.mealPrep.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Rendu des conseils
  const RenderConseils = () => {
    return (
      <div className="space-y-6">
        {/* Chrononutrition */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 ml-3">Conseils de chrononutrition</h2>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-gray-700">{parsedResult.conseilsPratiques.chrononutrition}</p>
          </div>
        </div>
        
        {/* Erreurs à éviter */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 ml-3">Erreurs à éviter</h2>
          </div>
          
          <div className="space-y-4">
            {parsedResult.conseilsPratiques.erreursAEviter.map((erreur, index) => (
              <div key={index} className="bg-red-50 p-4 rounded-lg">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
                    <h3 className="text-md font-medium text-red-700 flex items-center">
                      <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Erreur {index + 1}
                    </h3>
                    <p className="mt-1 text-red-800">{erreur.erreur}</p>
                  </div>
                  
                  <div className="md:w-1/2 md:border-l md:border-red-200 md:pl-4">
                    <h3 className="text-md font-medium text-green-700 flex items-center">
                      <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Solution
                    </h3>
                    <p className="mt-1 text-green-800">{erreur.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hydratation */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 ml-3">Conseil d'hydratation</h2>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700">{parsedResult.conseilsPratiques.hydratation}</p>
          </div>
        </div>
        
        {/* Alternatives */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 ml-3">Alternatives</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-md font-medium text-green-700 mb-2">Alternatives petit-déjeuner</h3>
              <ul className="space-y-2">
                {parsedResult.alternatives.petitDejeuner.map((alt, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{alt}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-md font-medium text-green-700 mb-2">Alternatives déjeuner</h3>
              <ul className="space-y-2">
                {parsedResult.alternatives.dejeuner.map((alt, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{alt}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-md font-medium text-green-700 mb-2">Alternatives dîner</h3>
              <ul className="space-y-2">
                {parsedResult.alternatives.diner.map((alt, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{alt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Déterminer le contenu à afficher en fonction de l'onglet actif
  const renderContent = () => {
    switch (activeTab) {
      case 'jour1':
        return <RenderDay day={parsedResult.planAlimentaire.jour1} />;
      case 'jour2':
        return <RenderDay day={parsedResult.planAlimentaire.jour2} />;
      case 'jour3':
        return <RenderDay day={parsedResult.planAlimentaire.jour3} />;
      case 'conseils':
        return <RenderConseils />;
      default:
        return <RenderResume />;
    }
  };

  return (
    <div className="result-container animate-fade-in">
      {/* Message de succès */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg shadow-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-md font-medium text-green-800">Plan nutritionnel généré avec succès!</h3>
            <p className="text-sm text-green-700 mt-1">Votre plan a été personnalisé selon votre profil professionnel de {parsedResult.metier}.</p>
          </div>
        </div>
      </div>

      {/* Barre d'actions */}
      <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Votre Plan Nutritionnel</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleDownload('json')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              JSON
            </button>
            <button
              onClick={() => handleDownload('pdf')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              PDF
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
              </svg>
              Imprimer
            </button>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                copied 
                  ? 'border-green-300 text-green-700 bg-green-50' 
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {copied ? (
                <>
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copié!
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copier
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation des jours */}
      <DayNavigation />

      {/* Contenu principal */}
      <div className="bg-gray-50 rounded-lg p-6" ref={resultRef}>
        {renderContent()}
      </div>

      {/* Actions en bas */}
      <div className="flex justify-center mt-8 mb-4">
        <button
          onClick={onReset}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Créer un nouveau plan
        </button>
      </div>

      {/* Bouton pour remonter en haut */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          title="Retour en haut"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media print {
          .no-print { display: none; }
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
    </div>
  );
}