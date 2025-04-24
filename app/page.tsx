// // pages/index.js - Page principale
// 'use client';
// import { useState } from 'react';
// import Head from 'next/head';
// import NutritionForm from './components/NutritionForm';
// import NutritionResult from './components/NutritionResult';

// export default function Home() {
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (formData) => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Appeler notre API route pour protéger la clé API
//       const response = await fetch('/api/nutrition-plan', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Une erreur est survenue lors de la génération du plan.");
//       }

//       const data = await response.json();
//       setResult(data.nutritionPlan);
//     } catch (err) {
//       console.error("Error:", err);
//       setError(err.message || "Une erreur est survenue lors de la génération du plan. Veuillez réessayer.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setResult(null);
//     setError(null);
//   };

//   return (
//     <div>
//       <Head>
//         <title>Plan Nutritionnel du Travailleur</title>
//         <meta name="description" content="Générez un plan alimentaire personnalisé adapté à votre métier" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
//         <header className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-blue-700">Plan Nutritionnel du Travailleur</h1>
//           <p className="text-gray-600 mt-2">Obtenez un plan alimentaire de 3 jours adapté à votre métier et à vos besoins</p>
//         </header>
        
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {!result ? (
//           <NutritionForm onSubmit={handleSubmit} loading={loading} />
//         ) : (
//           <NutritionResult result={result} onReset={handleReset} />
//         )}
        
//         {loading && (
//           <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-md shadow-lg text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//               <p className="mt-4">Génération de votre plan personnalisé...</p>
//               <p className="text-sm text-gray-500 mt-2">Notre IA nutritionniste analyse votre profil professionnel</p>
//             </div>
//           </div>
//         )}
//       </main>

//       <footer className="text-center py-4 text-gray-500 text-sm">
//         <p>© {new Date().getFullYear()} Plan Nutritionnel du Travailleur - Propulsé par l'IA</p>
//       </footer>
//     </div>
//   );
// }


























// // app/page.js (ou dans votre structure de dossiers Next.js 14)
// 'use client';
// import { useState } from 'react';
// import Head from 'next/head';
// import NutritionForm from './components/NutritionForm';
// import NutritionResult from './components/NutritionResult';

// export default function Home() {
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [showAnimation, setShowAnimation] = useState(false);

//   const handleSubmit = async (formData) => {
//     try {
//       setLoading(true);
//       setError(null);
//       setShowAnimation(true);
      
//       // Appeler notre API route pour protéger la clé API
//       const response = await fetch('/api/nutrition-plan', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       // Gestion plus robuste des erreurs
//       const contentType = response.headers.get("content-type");
//       if (!response.ok) {
//         let errorMessage = `Erreur ${response.status}: ${response.statusText}`;
        
//         if (contentType && contentType.includes("application/json")) {
//           try {
//             const errorData = await response.json();
//             errorMessage = errorData.message || errorMessage;
//           } catch (parseError) {
//             console.error("Erreur lors du parsing de la réponse d'erreur:", parseError);
//           }
//         } else if (contentType && contentType.includes("text/")) {
//           try {
//             const errorText = await response.text();
//             errorMessage = errorText || errorMessage;
//           } catch (parseError) {
//             console.error("Erreur lors de la lecture du texte d'erreur:", parseError);
//           }
//         }
        
//         throw new Error(errorMessage);
//       }
      
//       // Traiter la réponse réussie
//       if (!contentType || !contentType.includes("application/json")) {
//         throw new Error("La réponse n'est pas au format JSON attendu");
//       }
      
//       const data = await response.json();
      
//       if (!data || !data.nutritionPlan) {
//         throw new Error("La réponse ne contient pas de plan nutritionnel");
//       }
      
//       // Petit délai pour la transition
//       await new Promise(resolve => setTimeout(resolve, 500));
//       setResult(data.nutritionPlan);
      
//     } catch (err) {
//       console.error("Error:", err);
//       setError(err.message || "Une erreur est survenue lors de la génération du plan. Veuillez réessayer.");
//     } finally {
//       setLoading(false);
//       setShowAnimation(false);
//     }
//   };

//   const handleReset = () => {
//     setResult(null);
//     setError(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       <Head>
//         <title>Plan Nutritionnel du Travailleur | Optimisez votre alimentation</title>
//         <meta name="description" content="Générez un plan alimentaire personnalisé de 3 jours adapté à votre métier et à vos besoins spécifiques. Propulsé par l'IA." />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       {/* Barre de navigation */}
//       <nav className="bg-white shadow-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//               <span className="ml-2 text-xl font-semibold text-gray-900">NutriPro</span>
//             </div>
//             <div className="flex items-center">
//               <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                 Comment ça marche
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Header principal */}
//       <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//         <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
//             Plan Nutritionnel du Travailleur
//           </h1>
//           <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
//             Transformez votre alimentation avec un plan adapté à votre métier, vos objectifs et votre rythme de vie
//           </p>
//           <div className="mt-10 flex justify-center">
//             <div className="inline-flex rounded-md shadow">
//               <div className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-white bg-opacity-20 hover:bg-opacity-30">
//                 <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//                 Commencer maintenant
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section avantages */}
//         <div className="py-12">
//           <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//               <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//                 <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900">Adapté à votre métier</h3>
//               <p className="mt-2 text-gray-600">Un plan nutritionnel qui prend en compte les exigences spécifiques de votre profession</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//               <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
//                 <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900">Propulsé par l'IA</h3>
//               <p className="mt-2 text-gray-600">Notre nutritionniste virtuel analyse vos besoins pour créer un plan personnalisé</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//               <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
//                 <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900">Simple et rapide</h3>
//               <p className="mt-2 text-gray-600">Remplissez un formulaire simple et obtenez votre plan nutritionnel en quelques minutes</p>
//             </div>
//           </div>
//         </div>

//         {/* Formulaire ou résultat */}
//         <div className="py-12">
//           <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//             {error && (
//               <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6 rounded-r-lg">
//                 <div className="flex">
//                   <div className="flex-shrink-0">
//                     <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <h3 className="text-sm font-medium text-red-800">Une erreur est survenue</h3>
//                     <p className="mt-1 text-sm text-red-700">{error}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {!result ? (
//               <div className="p-6 sm:p-8">
//                 <NutritionForm onSubmit={handleSubmit} loading={loading} />
//               </div>
//             ) : (
//               <div className="p-6 sm:p-8">
//                 <NutritionResult result={result} onReset={handleReset} />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Section témoignages (uniquement si pas de résultat) */}
//         {!result && (
//           <div className="py-12">
//             <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
//               Ce que disent nos utilisateurs
//             </h2>
//             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//               <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//                 <div className="flex items-center mb-4">
//                   <img className="h-12 w-12 rounded-full" src="/api/placeholder/48/48" alt="Avatar" />
//                   <div className="ml-4">
//                     <h4 className="font-medium text-gray-900">Marie L.</h4>
//                     <p className="text-sm text-gray-500">Infirmière de nuit</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 italic">"Ce plan nutritionnel m'a vraiment aidée à gérer mes horaires décalés. Je me sens plus énergique pendant mes gardes."</p>
//               </div>
//               <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//                 <div className="flex items-center mb-4">
//                   <img className="h-12 w-12 rounded-full" src="/api/placeholder/48/48" alt="Avatar" />
//                   <div className="ml-4">
//                     <h4 className="font-medium text-gray-900">Thomas R.</h4>
//                     <p className="text-sm text-gray-500">Développeur web</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 italic">"Les repas proposés sont parfaits pour maintenir ma concentration toute la journée. Plus de coups de fatigue après le déjeuner !"</p>
//               </div>
//               <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//                 <div className="flex items-center mb-4">
//                   <img className="h-12 w-12 rounded-full" src="/api/placeholder/48/48" alt="Avatar" />
//                   <div className="ml-4">
//                     <h4 className="font-medium text-gray-900">Sophie M.</h4>
//                     <p className="text-sm text-gray-500">Enseignante</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 italic">"Un vrai gain de temps ! Les recettes sont simples et adaptées à mes pauses courtes. Je me sens beaucoup mieux."</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* Modal de chargement amélioré */}
//       {loading && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-xl shadow-2xl text-center transform transition-all duration-300 animate-fade-in">
//             <div className="mb-6">
//               <div className="relative">
//                 <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                   <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900">Création de votre plan personnalisé</h3>
//             <p className="mt-2 text-gray-600">Notre nutritionniste IA analyse vos informations...</p>
//             <div className="mt-4 flex justify-center">
//               <div className="space-x-2">
//                 <span className="inline-block w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-0"></span>
//                 <span className="inline-block w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></span>
//                 <span className="inline-block w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-300"></span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer amélioré */}
//       <footer className="bg-white border-t border-gray-200 mt-12">
//         <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div>
//               <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">À propos</h3>
//               <p className="mt-4 text-base text-gray-500">
//                 NutriPro utilise l'intelligence artificielle pour créer des plans nutritionnels adaptés à chaque profession.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Liens utiles</h3>
//               <ul className="mt-4 space-y-4">
//                 <li>
//                   <a href="#" className="text-base text-gray-500 hover:text-blue-600">Blog nutrition</a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-base text-gray-500 hover:text-blue-600">FAQ</a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-base text-gray-500 hover:text-blue-600">Contact</a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Restez informé</h3>
//               <p className="mt-4 text-base text-gray-500">
//                 Inscrivez-vous à notre newsletter pour recevoir nos derniers conseils nutrition.
//               </p>
//               <form className="mt-4 sm:flex sm:max-w-md">
//                 <label htmlFor="email-address" className="sr-only">Adresse email</label>
//                 <input
//                   type="email"
//                   name="email-address"
//                   id="email-address"
//                   autoComplete="email"
//                   required
//                   className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 focus:placeholder-gray-400"
//                   placeholder="Entrez votre email"
//                 />
//                 <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
//                   <button
//                     type="submit"
//                     className="w-full bg-blue-600 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   >
//                     S'inscrire
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//           <div className="mt-8 border-t border-gray-200 pt-8">
//             <p className="text-base text-gray-400 text-center">
//               © {new Date().getFullYear()} NutriPro. Tous droits réservés.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }



































'use client';
import { useState } from 'react';
import NutritionForm from './components/NutritionForm';
import NutritionResult from './components/NutritionResult';
import Head from 'next/head';


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Appeler notre API route pour protéger la clé API
      const response = await fetch('/api/nutrition-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // Gestion plus robuste des erreurs
      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        let errorMessage = `Erreur ${response.status}: ${response.statusText}`;
        
        if (contentType && contentType.includes("application/json")) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (parseError) {
            console.error("Erreur lors du parsing de la réponse d'erreur:", parseError);
          }
        } else if (contentType && contentType.includes("text/")) {
          try {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          } catch (parseError) {
            console.error("Erreur lors de la lecture du texte d'erreur:", parseError);
          }
        }
        
        throw new Error(errorMessage);
      }
      
      // Traiter la réponse réussie
      const data = await response.json();
      
      if (!data || !data.nutritionPlan) {
        throw new Error("La réponse ne contient pas de plan nutritionnel");
      }
      
      setResult(data.nutritionPlan);
      
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Une erreur est survenue lors de la génération du plan. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">


      {/* <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Plan Nutritionnel du Travailleur
          </h1>
          <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
            Transformez votre alimentation avec un plan adapté à votre métier
          </p>
        </div>
      </header> */}





<Head>
         <title>Plan Nutritionnel du Travailleur | Optimisez votre alimentation</title>
        <meta name="description" content="Générez un plan alimentaire personnalisé de 3 jours adapté à votre métier et à vos besoins spécifiques. Propulsé par l'IA." />
         <link rel="icon" href="/favicon.ico" />
       </Head>

     {/* Barre de navigation */}
       <nav className="bg-white shadow-sm sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between h-16">
             <div className="flex items-center">
               <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
               </svg>
               <span className="ml-2 text-xl font-semibold text-gray-900">NutriPro</span>
             </div>
             <div className="flex items-center">
               <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                 Comment ça marche
               </button>
             </div>
           </div>
         </div>
       </nav>

      <header className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
         <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
           <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
             Plan Nutritionnel du Travailleur
           </h1>
          <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
             Transformez votre alimentation avec un plan adapté à votre métier, vos objectifs et votre rythme de vie
           </p>
           <div className="mt-10 flex justify-center">
             <div className="inline-flex rounded-md shadow">
               <div className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-white bg-opacity-20 hover:bg-opacity-30">
                 <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
                 Commencer maintenant
               </div>
             </div>
           </div>
         </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!result ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 sm:p-8">
            <NutritionForm onSubmit={handleSubmit} loading={loading} />
          </div>
        ) : (
          <NutritionResult result={result} onReset={handleReset} />
        )}
      </main>



       {/* Modal de chargement amélioré */}
       {loading && (
         <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
           <div className="bg-white p-8 rounded-xl shadow-2xl text-center transform transition-all duration-300 animate-fade-in">
            <div className="mb-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Création de votre plan personnalisé</h3>
            <p className="mt-2 text-gray-600">Notre nutritionniste IA analyse vos informations...</p>
            <div className="mt-4 flex justify-center">
              <div className="space-x-2">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-0"></span>
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></span>
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} NutriPro. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
