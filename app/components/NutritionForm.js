// 'use client';
// // components/NutritionForm.js
// import { useState } from 'react';

// export default function NutritionForm({ onSubmit, loading }) {
//   // Form data state
//   const [formData, setFormData] = useState({
//     job: '',
//     age: '',
//     healthGoals: [],
//     constraints: '',
//     workHours: '',
//     mealLocations: '',
//     mealBreakDuration: '',
//     equipmentAccess: '',
//     activityLevel: ''
//   });

//   // Predefined options for select fields
//   const healthGoalOptions = [
//     'Augmenter l\'énergie durable',
//     'Optimiser la récupération musculaire',
//     'Améliorer la concentration',
//     'Mieux gérer le stress',
//     'Perdre du poids',
//     'Prendre du poids',
//     'Améliorer le sommeil',
//     'Réduire les troubles digestifs'
//   ];
  
//   const activityLevelOptions = [
//     'Très sédentaire (assis > 80% du temps)',
//     'Actif (marche fréquente, escaliers)',
//     'Physique (port de charges, mouvements amples)',
//     'Très physique (effort intense continu)'
//   ];

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   // Handle health goals selection (multiple selection)
//   const handleHealthGoalChange = (e) => {
//     const value = e.target.value;
//     if (formData.healthGoals.includes(value)) {
//       // Remove the goal if already selected
//       setFormData({
//         ...formData,
//         healthGoals: formData.healthGoals.filter(goal => goal !== value)
//       });
//     } else if (formData.healthGoals.length < 3) {
//       // Add the goal if not already selected (max 3)
//       setFormData({
//         ...formData,
//         healthGoals: [...formData.healthGoals, value]
//       });
//     }
//   };

//   // Form submission handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   // Function to reset the form
//   const handleReset = () => {
//     setFormData({
//       job: '',
//       age: '',
//       healthGoals: [],
//       constraints: '',
//       workHours: '',
//       mealLocations: '',
//       mealBreakDuration: '',
//       equipmentAccess: '',
//       activityLevel: ''
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="bg-blue-50 p-4 rounded-md mb-6">
//         <div className="flex items-start">
//           <div className="flex-shrink-0">
//             <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
//             </svg>
//           </div>
//           <div className="ml-3">
//             <p className="text-sm text-blue-800">
//               Complétez ce formulaire pour recevoir un plan alimentaire personnalisé sur 3 jours, adapté à votre métier et à vos besoins spécifiques. Notre IA nutritionniste prendra en compte les particularités de votre profession pour optimiser votre alimentation.
//             </p>
//           </div>
//         </div>
//       </div>
      
//       <div className="space-y-6">
//         <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations Professionnelles</h2>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Métier Cible <span className="text-red-500">*</span></label>
//               <input
//                 type="text"
//                 name="job"
//                 value={formData.job}
//                 onChange={handleChange}
//                 placeholder="Ex: Infirmier·ère de nuit, Développeur·euse web, Ouvrier·ère du BTP"
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Âge <span className="text-red-500">*</span></label>
//               <input
//                 type="number"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 placeholder="Ex: 42"
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 required
//                 min="18"
//                 max="100"
//               />
//             </div>
            
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Niveau d'Activité Physique au Travail <span className="text-red-500">*</span></label>
//               <select
//                 name="activityLevel"
//                 value={formData.activityLevel}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 required
//               >
//                 <option value="">Sélectionnez votre niveau d'activité</option>
//                 {activityLevelOptions.map(option => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Objectifs & Contraintes</h2>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Objectifs Santé Clés (1-3 choix) <span className="text-red-500">*</span></label>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 {healthGoalOptions.map(goal => (
//                   <div key={goal} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={goal}
//                       value={goal}
//                       checked={formData.healthGoals.includes(goal)}
//                       onChange={handleHealthGoalChange}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                       disabled={!formData.healthGoals.includes(goal) && formData.healthGoals.length >= 3}
//                     />
//                     <label htmlFor={goal} className="ml-2 text-sm text-gray-700">{goal}</label>
//                   </div>
//                 ))}
//               </div>
//               {formData.healthGoals.length === 0 && (
//                 <p className="text-sm text-red-500 mt-1">Sélectionnez au moins un objectif</p>
//               )}
//             </div>
            
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Contraintes & Préférences</label>
//               <textarea
//                 name="constraints"
//                 value={formData.constraints}
//                 onChange={handleChange}
//                 placeholder="Ex: Allergie aux noix, végétarien, intolérance au lactose, budget limité..."
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 rows="3"
//               />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Contexte Professionnel</h2>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Horaires de Travail Typiques <span className="text-red-500">*</span></label>
//               <input
//                 type="text"
//                 name="workHours"
//                 value={formData.workHours}
//                 onChange={handleChange}
//                 placeholder="Ex: 8h-18h avec coupure, 21h-7h en roulement, travail posté 3x8"
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Lieu(x) de Prise des Repas <span className="text-red-500">*</span></label>
//               <input
//                 type="text"
//                 name="mealLocations"
//                 value={formData.mealLocations}
//                 onChange={handleChange}
//                 placeholder="Ex: Bureau sans cuisine, chantier avec micro-ondes, véhicule..."
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Temps de Pause Repas Effectif <span className="text-red-500">*</span></label>
//               <input
//                 type="text"
//                 name="mealBreakDuration"
//                 value={formData.mealBreakDuration}
//                 onChange={handleChange}
//                 placeholder="Ex: Déjeuner 30 min max, pauses courtes de 10 min"
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">Accès Équipement <span className="text-red-500">*</span></label>
//               <input
//                 type="text"
//                 name="equipmentAccess"
//                 value={formData.equipmentAccess}
//                 onChange={handleChange}
//                 placeholder="Ex: Réfrigérateur, micro-ondes, bouilloire uniquement, accès cuisine complète"
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="flex justify-center space-x-4 pt-4">
//         <button
//           type="button"
//           onClick={handleReset}
//           className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors duration-200"
//         >
//           Réinitialiser
//         </button>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
//           disabled={loading || formData.healthGoals.length === 0}
//         >
//           {loading ? (
//             <>
//               <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Génération en cours...
//             </>
//           ) : (
//             'Générer mon plan nutritionnel'
//           )}
//         </button>
//       </div>
//     </form>
//   );
// }















// 'use client';
// // components/NutritionForm.js
// import { useState } from 'react';

// export default function NutritionForm({ onSubmit, loading }) {
//   // Form data state
//   const [formData, setFormData] = useState({
//     job: '',
//     age: '',
//     healthGoals: [],
//     constraints: '',
//     workHours: '',
//     mealLocations: '',
//     mealBreakDuration: '',
//     equipmentAccess: '',
//     activityLevel: ''
//   });

//   // Validation errors state
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   // Predefined options for select fields
//   const healthGoalOptions = [
//     { value: 'Augmenter l\'énergie durable', icon: '⚡', description: 'Maintenir un niveau d\'énergie stable toute la journée' },
//     { value: 'Optimiser la récupération musculaire', icon: '💪', description: 'Accélérer la récupération après l\'effort physique' },
//     { value: 'Améliorer la concentration', icon: '🎯', description: 'Renforcer les capacités cognitives et la focus' },
//     { value: 'Mieux gérer le stress', icon: '🧘', description: 'Réduire l\'impact du stress sur votre corps' },
//     { value: 'Perdre du poids', icon: '📉', description: 'Atteindre un poids santé progressivement' },
//     { value: 'Prendre du poids', icon: '📈', description: 'Gagner du poids de façon saine' },
//     { value: 'Améliorer le sommeil', icon: '😴', description: 'Optimiser la qualité de votre sommeil' },
//     { value: 'Réduire les troubles digestifs', icon: '🌿', description: 'Améliorer votre confort digestif' }
//   ];
  
//   const activityLevelOptions = [
//     { value: 'Très sédentaire (assis > 80% du temps)', icon: '💻', color: 'bg-red-100 text-red-800' },
//     { value: 'Actif (marche fréquente, escaliers)', icon: '🚶', color: 'bg-yellow-100 text-yellow-800' },
//     { value: 'Physique (port de charges, mouvements amples)', icon: '📦', color: 'bg-green-100 text-green-800' },
//     { value: 'Très physique (effort intense continu)', icon: '🏋️', color: 'bg-blue-100 text-blue-800' }
//   ];

//   // Field validation function
//   const validateField = (name, value) => {
//     let error = '';
//     switch (name) {
//       case 'job':
//         if (!value.trim()) error = 'Le métier est requis';
//         else if (value.length < 3) error = 'Le métier doit contenir au moins 3 caractères';
//         break;
//       case 'age':
//         if (!value) error = 'L\'âge est requis';
//         else if (value < 18) error = 'Vous devez avoir au moins 18 ans';
//         else if (value > 100) error = 'Veuillez entrer un âge valide';
//         break;
//       case 'workHours':
//         if (!value.trim()) error = 'Les horaires de travail sont requis';
//         break;
//       case 'mealLocations':
//         if (!value.trim()) error = 'Les lieux de repas sont requis';
//         break;
//       case 'mealBreakDuration':
//         if (!value.trim()) error = 'La durée des pauses repas est requise';
//         break;
//       case 'equipmentAccess':
//         if (!value.trim()) error = 'L\'accès à l\'équipement est requis';
//         break;
//       case 'activityLevel':
//         if (!value) error = 'Le niveau d\'activité est requis';
//         break;
//       default:
//         break;
//     }
//     return error;
//   };

//   // Handle form field changes with validation
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });

//     // Validate field on change if it has been touched
//     if (touched[name]) {
//       setErrors({
//         ...errors,
//         [name]: validateField(name, value)
//       });
//     }
//   };

//   // Handle blur events for showing validation errors
//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched({
//       ...touched,
//       [name]: true
//     });
//     setErrors({
//       ...errors,
//       [name]: validateField(name, value)
//     });
//   };

//   // Handle health goals selection (multiple selection)
//   const handleHealthGoalChange = (value) => {
//     if (formData.healthGoals.includes(value)) {
//       // Remove the goal if already selected
//       setFormData({
//         ...formData,
//         healthGoals: formData.healthGoals.filter(goal => goal !== value)
//       });
//     } else if (formData.healthGoals.length < 3) {
//       // Add the goal if not already selected (max 3)
//       setFormData({
//         ...formData,
//         healthGoals: [...formData.healthGoals, value]
//       });
//     }
//   };

//   // Form submission handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validate all fields
//     const newErrors = {};
//     Object.keys(formData).forEach(key => {
//       if (key !== 'healthGoals' && key !== 'constraints') {
//         const error = validateField(key, formData[key]);
//         if (error) newErrors[key] = error;
//       }
//     });

//     // Check if health goals are selected
//     if (formData.healthGoals.length === 0) {
//       newErrors.healthGoals = 'Veuillez sélectionner au moins un objectif';
//     }

//     if (Object.keys(newErrors).length === 0) {
//       onSubmit(formData);
//     } else {
//       setErrors(newErrors);
//     }
//   };

//   // Function to reset the form
//   const handleReset = () => {
//     setFormData({
//       job: '',
//       age: '',
//       healthGoals: [],
//       constraints: '',
//       workHours: '',
//       mealLocations: '',
//       mealBreakDuration: '',
//       equipmentAccess: '',
//       activityLevel: ''
//     });
//     setErrors({});
//     setTouched({});
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8">
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8 relative overflow-hidden">
//         <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-blue-100 rounded-full p-6 transform rotate-12">
//           <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//           </svg>
//         </div>
//         <div className="relative">
//           <h2 className="text-xl font-bold text-blue-900 mb-2">Bienvenue dans votre espace nutrition personnalisé</h2>
//           <p className="text-blue-800">
//             Prenez quelques minutes pour remplir ce formulaire. Notre IA nutritionniste analysera vos besoins spécifiques pour créer un plan alimentaire adapté à votre métier et à vos objectifs de santé.
//           </p>
//         </div>
//       </div>
      
//       <div className="space-y-8">
//         {/* Informations professionnelles */}
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//           <div className="flex items-center mb-4">
//             <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
//               <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <h2 className="text-xl font-semibold text-gray-800 ml-3">Informations Professionnelles</h2>
//           </div>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">
//                 Métier Cible <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="job"
//                 value={formData.job}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 placeholder="Ex: Infirmier·ère de nuit, Développeur·euse web, Ouvrier·ère du BTP"
//                 className={`w-full p-3 border ${errors.job && touched.job ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400`}
//                 required
//               />
//               {errors.job && touched.job && (
//                 <p className="mt-1 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.job}
//                 </p>
//               )}
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   Âge <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="age"
//                   value={formData.age}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="Ex: 42"
//                   className={`w-full p-3 border ${errors.age && touched.age ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400`}
//                   required
//                   min="18"
//                   max="100"
//                 />
//                 {errors.age && touched.age && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     {errors.age}
//                   </p>
//                 )}
//               </div>
              
//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   Niveau d'Activité Physique au Travail <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <select
//                     name="activityLevel"
//                     value={formData.activityLevel}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={`w-full p-3 border ${errors.activityLevel && touched.activityLevel ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 appearance-none`}
//                     required
//                   >
//                     <option value="">Sélectionnez votre niveau d'activité</option>
//                     {activityLevelOptions.map(option => (
//                       <option key={option.value} value={option.value}>
//                         {option.icon} {option.value}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                 </div>
//                 {errors.activityLevel && touched.activityLevel && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     {errors.activityLevel}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Objectifs et contraintes */}
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//           <div className="flex items-center mb-4">
//             <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
//               <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <h2 className="text-xl font-semibold text-gray-800 ml-3">Objectifs & Contraintes</h2>
//           </div>
          
//           <div className="space-y-6">
//             <div>
//               <label className="block font-medium text-gray-700 mb-3">
//                 Objectifs Santé Clés <span className="text-red-500">*</span>
//                 <span className="text-sm font-normal text-gray-500 ml-2">(1-3 choix)</span>
//               </label>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {healthGoalOptions.map(goal => (
//                   <div
//                     key={goal.value}
//                     className={`relative flex items-start p-3 rounded-lg border ${
//                       formData.healthGoals.includes(goal.value)
//                         ? 'border-blue-500 bg-blue-50'
//                         : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50'
//                     } cursor-pointer transition-colors duration-200`}
//                     onClick={() => !(!formData.healthGoals.includes(goal.value) && formData.healthGoals.length >= 3) && handleHealthGoalChange(goal.value)}
//                   >
//                     <div className="flex h-5 items-center">
//                       <input
//                         type="checkbox"
//                         id={goal.value}
//                         value={goal.value}
//                         checked={formData.healthGoals.includes(goal.value)}
//                         onChange={() => handleHealthGoalChange(goal.value)}
//                         className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                         disabled={!formData.healthGoals.includes(goal.value) && formData.healthGoals.length >= 3}
//                       />
//                     </div>
//                     <div className="ml-3">
//                       <label htmlFor={goal.value} className="text-sm font-medium text-gray-700 flex items-center">
//                         <span className="text-xl mr-2">{goal.icon}</span>
//                         {goal.value}
//                       </label>
//                       <p className="text-xs text-gray-500 mt-1">{goal.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {errors.healthGoals && (
//                 <p className="mt-1 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.healthGoals}
//                 </p>
//               )}
//             </div>
            
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">
//                 Contraintes & Préférences
//                 <span className="text-sm font-normal text-gray-500 ml-2">(optionnel)</span>
//               </label>
//               <textarea
//                 name="constraints"
//                 value={formData.constraints}
//                 onChange={handleChange}
//                 placeholder="Ex: Allergie aux noix, végétarien, intolérance au lactose, budget limité..."
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
//                 rows="3"
//               />
//             </div>
//           </div>
//         </div>
        
//         {/* Contexte professionnel */}
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//           <div className="flex items-center mb-4">
//             <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
//               <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <h2 className="text-xl font-semibold text-gray-800 ml-3">Contexte Professionnel</h2>
//           </div>
          
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   Horaires de Travail Typiques <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="workHours"
//                   value={formData.workHours}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="Ex: 8h-18h avec coupure, 21h-7h en roulement"
//                   className={`w-full p-3 border ${errors.workHours && touched.workHours ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400`}
//                   required
//                 />
//                 {errors.workHours && touched.workHours && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     {errors.workHours}
//                   </p>
//                 )}
//               </div>
              
//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   Temps de Pause Repas Effectif <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="mealBreakDuration"
//                   value={formData.mealBreakDuration}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="Ex: Déjeuner 30 min max, pauses courtes de 10 min"
//                   className={`w-full p-3 border ${errors.mealBreakDuration && touched.mealBreakDuration ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400`}
//                   required
//                 />
//                 {errors.mealBreakDuration && touched.mealBreakDuration && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     {errors.mealBreakDuration}
//                   </p>
//                 )}
//               </div>
//             </div>
            
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">
//                 Lieu(x) de Prise des Repas <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="mealLocations"
//                 value={formData.mealLocations}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 placeholder="Ex: Bureau sans cuisine, chantier avec micro-ondes, véhicule..."
//                 className={`w-full p-3 border ${errors.mealLocations && touched.mealLocations ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400`}
//                 required
//               />
//               {errors.mealLocations && touched.mealLocations && (
//                 <p className="mt-1 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.mealLocations}
//                 </p>
//               )}
//             </div>
            
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">
//                 Accès Équipement <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="equipmentAccess"
//                 value={formData.equipmentAccess}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 placeholder="Ex: Réfrigérateur, micro-ondes, bouilloire uniquement, accès cuisine complète"
//                 className={`w-full p-3 border ${errors.equipmentAccess && touched.equipmentAccess ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400`}
//                 required
//               />
//               {errors.equipmentAccess && touched.equipmentAccess && (
//                 <p className="mt-1 text-sm text-red-600 flex items-center">
//                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errors.equipmentAccess}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="flex justify-center space-x-4 pt-4">
//         <button
//           type="button"
//           onClick={handleReset}
//           className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//         >
//           <div className="flex items-center">
//             <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//             </svg>
//             Réinitialiser
//           </div>
//         </button>
//         <button
//           type="submit"
//           className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center ${
//             loading || formData.healthGoals.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//           disabled={loading || formData.healthGoals.length === 0}
//         >
//           {loading ? (
//             <>
//               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Génération en cours...
//             </>
//           ) : (
//             <>
//               <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//               Générer mon plan nutritionnel
//             </>
//           )}
//         </button>
//       </div>
//     </form>
//   );
// }









































































'use client';
// components/NutritionForm.js
import { useState } from 'react';

export default function NutritionForm({ onSubmit, loading }) {
  // Form data state
  const [formData, setFormData] = useState({
    job: '',
    jobCategory: '',
    customJob: '',
    age: 35,
    healthGoals: [],
    dietaryPreferences: [],
    constraints: '',
    workHours: '',
    workScheduleType: '',
    customWorkHours: '',
    mealLocations: [],
    mealBreakDuration: '',
    breakDurationOption: '',
    customBreakDuration: '',
    equipmentAccess: [],
    activityLevel: ''
  });

  // Données prédéfinies pour les sélections
  const jobCategories = [
    { value: '', label: 'Sélectionnez une catégorie' },
    { value: 'office', label: 'Travail de bureau' },
    { value: 'health', label: 'Santé' },
    { value: 'education', label: 'Éducation' },
    { value: 'construction', label: 'Construction et BTP' },
    { value: 'retail', label: 'Commerce et vente' },
    { value: 'services', label: 'Services et hôtellerie' },
    { value: 'transport', label: 'Transport et logistique' },
    { value: 'manufacturing', label: 'Industrie et production' },
    { value: 'creative', label: 'Arts et création' },
    { value: 'technology', label: 'Technologie' },
    { value: 'other', label: 'Autre' }
  ];

  const commonJobs = {
    office: [
      { value: 'Développeur·euse web sédentaire', label: 'Développeur·euse web' },
      { value: 'Comptable', label: 'Comptable' },
      { value: 'Commercial·e sédentaire', label: 'Commercial·e sédentaire' },
      { value: 'Assistant·e administratif·ve', label: 'Assistant·e administratif·ve' },
      { value: 'Gestionnaire RH', label: 'Gestionnaire RH' }
    ],
    health: [
      { value: 'Infirmier·ère de jour', label: 'Infirmier·ère de jour' },
      { value: 'Infirmier·ère de nuit', label: 'Infirmier·ère de nuit' },
      { value: 'Médecin hospitalier', label: 'Médecin hospitalier' },
      { value: 'Aide-soignant·e', label: 'Aide-soignant·e' },
      { value: 'Kinésithérapeute', label: 'Kinésithérapeute' }
    ],
    education: [
      { value: 'Enseignant·e primaire', label: 'Enseignant·e primaire' },
      { value: 'Professeur·e collège/lycée', label: 'Professeur·e collège/lycée' },
      { value: 'Formateur·rice adultes', label: 'Formateur·rice adultes' }
    ],
    construction: [
      { value: 'Ouvrier·ère BTP', label: 'Ouvrier·ère BTP' },
      { value: 'Électricien·ne', label: 'Électricien·ne' },
      { value: 'Plombier·ère', label: 'Plombier·ère' },
      { value: 'Chef·fe de chantier', label: 'Chef·fe de chantier' }
    ],
    retail: [
      { value: 'Vendeur·euse', label: 'Vendeur·euse' },
      { value: 'Caissier·ère', label: 'Caissier·ère' },
      { value: 'Responsable de magasin', label: 'Responsable de magasin' }
    ],
    services: [
      { value: 'Serveur·euse', label: 'Serveur·euse' },
      { value: 'Cuisinier·ère', label: 'Cuisinier·ère' },
      { value: 'Réceptionniste hôtel', label: 'Réceptionniste hôtel' }
    ],
    transport: [
      { value: 'Chauffeur livreur·euse', label: 'Chauffeur livreur·euse' },
      { value: 'Conducteur·rice de bus', label: 'Conducteur·rice de bus' },
      { value: 'Routier·ère', label: 'Routier·ère' }
    ],
    manufacturing: [
      { value: 'Opérateur·rice de production', label: 'Opérateur·rice de production' },
      { value: 'Agent·e de maintenance', label: 'Agent·e de maintenance' },
      { value: 'Technicien·ne qualité', label: 'Technicien·ne qualité' }
    ],
    creative: [
      { value: 'Designer graphique', label: 'Designer graphique' },
      { value: 'Photographe', label: 'Photographe' },
      { value: 'Journaliste', label: 'Journaliste' }
    ],
    technology: [
      { value: 'Développeur·euse web sédentaire', label: 'Développeur·euse web' },
      { value: 'Ingénieur·e logiciel', label: 'Ingénieur·e logiciel' },
      { value: 'Administrateur·rice système', label: 'Administrateur·rice système' },
      { value: 'Data scientist', label: 'Data scientist' }
    ],
    other: []
  };

  const healthGoalOptions = [
    { value: 'Augmenter l\'énergie durable', icon: '⚡', label: 'Augmenter l\'énergie durable' },
    { value: 'Optimiser la récupération musculaire', icon: '💪', label: 'Optimiser la récupération musculaire' },
    { value: 'Améliorer la concentration', icon: '🎯', label: 'Améliorer la concentration' },
    { value: 'Mieux gérer le stress', icon: '🧘', label: 'Mieux gérer le stress' },
    { value: 'Perdre du poids', icon: '📉', label: 'Perdre du poids' },
    { value: 'Prendre du poids', icon: '📈', label: 'Prendre du poids' },
    { value: 'Améliorer le sommeil', icon: '😴', label: 'Améliorer le sommeil' },
    { value: 'Réduire les troubles digestifs', icon: '🌿', label: 'Réduire les troubles digestifs' }
  ];
  
  const activityLevelOptions = [
    { value: 'Très sédentaire (assis > 80% du temps)', icon: '💻', color: 'bg-red-100 text-red-800', label: 'Très sédentaire' },
    { value: 'Actif (marche fréquente, escaliers)', icon: '🚶', color: 'bg-yellow-100 text-yellow-800', label: 'Actif' },
    { value: 'Physique (port de charges, mouvements amples)', icon: '📦', color: 'bg-green-100 text-green-800', label: 'Physique' },
    { value: 'Très physique (effort intense continu)', icon: '🏋️', color: 'bg-blue-100 text-blue-800', label: 'Très physique' }
  ];

  const dietaryPreferencesOptions = [
    { value: 'vegetarien', label: 'Végétarien', description: 'Pas de viande ni poisson' },
    { value: 'vegan', label: 'Végétalien/Vegan', description: 'Aucun produit animal' },
    { value: 'pescetarien', label: 'Pescetarien', description: 'Poisson mais pas de viande' },
    { value: 'sans_gluten', label: 'Sans gluten', description: 'Pas de blé, orge, seigle' },
    { value: 'sans_lactose', label: 'Sans lactose', description: 'Pas de produits laitiers' },
    { value: 'paleo', label: 'Paléo', description: 'Inspiré de l\'alimentation préhistorique' },
    { value: 'cetogene', label: 'Cétogène', description: 'Très peu de glucides, beaucoup de lipides' },
    { value: 'mediterraneen', label: 'Méditerranéen', description: 'Huile d\'olive, poisson, légumes' }
  ];

  const workScheduleTypes = [
    { value: 'fixed', label: 'Horaires fixes', description: 'Même horaire tous les jours' },
    { value: 'shifts', label: 'Travail posté', description: 'Rotation d\'horaires (2x8, 3x8)' },
    { value: 'night', label: 'Travail de nuit', description: 'Principalement la nuit' },
    { value: 'flexible', label: 'Horaires flexibles', description: 'Horaires variables selon les jours' },
    { value: 'long', label: 'Journées longues', description: 'Plus de 10h de travail par jour' }
  ];

  const commonWorkHours = {
    fixed: [
      { value: '9h-17h', label: '9h-17h (Standard bureau)' },
      { value: '8h-16h', label: '8h-16h' },
      { value: '8h30-16h30', label: '8h30-16h30' },
      { value: '9h-18h', label: '9h-18h' }
    ],
    shifts: [
      { value: '6h-14h / 14h-22h', label: '6h-14h / 14h-22h (2x8)' },
      { value: '6h-14h / 14h-22h / 22h-6h', label: '6h-14h / 14h-22h / 22h-6h (3x8)' },
      { value: '7h-19h / 19h-7h', label: '7h-19h / 19h-7h (2x12)' }
    ],
    night: [
      { value: '20h-4h', label: '20h-4h' },
      { value: '21h-5h', label: '21h-5h' },
      { value: '22h-6h', label: '22h-6h (Nuit standard)' },
      { value: '23h-7h', label: '23h-7h' }
    ],
    flexible: [
      { value: 'Variable 35-40h/semaine', label: 'Variable 35-40h/semaine' },
      { value: 'Télétravail flexible', label: 'Télétravail flexible' }
    ],
    long: [
      { value: '7h-19h', label: '7h-19h (12h)' },
      { value: '8h-20h', label: '8h-20h (12h)' },
      { value: 'Garde 24h', label: 'Garde 24h (médical/secours)' }
    ]
  };

  const mealLocationsOptions = [
    { value: 'bureau_cuisine', label: 'Bureau avec cuisine', icon: '🍽️' },
    { value: 'bureau_sans_cuisine', label: 'Bureau sans cuisine', icon: '💼' },
    { value: 'cantine', label: 'Cantine/Restaurant d\'entreprise', icon: '🍲' },
    { value: 'domicile', label: 'Domicile (télétravail)', icon: '🏠' },
    { value: 'chantier', label: 'Chantier/Extérieur', icon: '🏗️' },
    { value: 'vehicule', label: 'Dans un véhicule', icon: '🚗' },
    { value: 'restaurant', label: 'Restaurant commercial', icon: '🍴' },
    { value: 'surlepouce', label: 'Sur le pouce (sandwich, etc.)', icon: '🥪' }
  ];

  const breakDurationOptions = [
    { value: 'tres_court', label: 'Très court (< 15 min)', description: 'Pause repas très rapide' },
    { value: 'court', label: 'Court (15-30 min)', description: 'Pause repas rapide' },
    { value: 'standard', label: 'Standard (30-45 min)', description: 'Pause repas normale' },
    { value: 'long', label: 'Long (45-60 min)', description: 'Pause repas confortable' },
    { value: 'tres_long', label: 'Très long (> 60 min)', description: 'Longue pause repas' },
    { value: 'variable', label: 'Variable', description: 'Change selon les jours' }
  ];

  const equipmentAccessOptions = [
    { value: 'cuisine_complete', label: 'Cuisine complète', icon: '👨‍🍳' },
    { value: 'micro_ondes', label: 'Micro-ondes', icon: '♨️' },
    { value: 'refrigerateur', label: 'Réfrigérateur', icon: '❄️' },
    { value: 'bouilloire', label: 'Bouilloire/Cafetière', icon: '☕' },
    { value: 'rien', label: 'Aucun équipement', icon: '❌' }
  ];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Logique spécifique pour certains champs
    if (name === 'jobCategory') {
      setFormData({
        ...formData,
        jobCategory: value,
        job: value === 'other' ? formData.customJob : '', // Réinitialiser le métier si on change de catégorie
      });
    } else if (name === 'workScheduleType') {
      setFormData({
        ...formData,
        workScheduleType: value,
        workHours: '',
      });
    } else if (name === 'breakDurationOption') {
      setFormData({
        ...formData,
        breakDurationOption: value,
        mealBreakDuration: value === 'custom' ? formData.customBreakDuration : getBreakDurationText(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }

    // Mise à jour du job quand on sélectionne un job prédéfini
    if (name === 'job') {
      setFormData({
        ...formData,
        job: value,
        customJob: value, // Garder une trace pour personnalisation
      });
    }
  };

  // Handle specific job selection
  const handleJobSelection = (selectedJob) => {
    setFormData({
      ...formData,
      job: selectedJob,
      customJob: selectedJob,
    });
  };

  // Obtenir le texte de durée de pause en fonction de l'option
  const getBreakDurationText = (option) => {
    switch (option) {
      case 'tres_court': return 'Moins de 15 minutes';
      case 'court': return 'Entre 15 et 30 minutes';
      case 'standard': return 'Entre 30 et 45 minutes';
      case 'long': return 'Entre 45 et 60 minutes';
      case 'tres_long': return 'Plus de 60 minutes';
      case 'variable': return 'Variable selon les jours';
      default: return '';
    }
  };

  // Handle health goals selection (multiple selection)
  const handleHealthGoalChange = (value) => {
    if (formData.healthGoals.includes(value)) {
      // Remove the goal if already selected
      setFormData({
        ...formData,
        healthGoals: formData.healthGoals.filter(goal => goal !== value)
      });
    } else if (formData.healthGoals.length < 3) {
      // Add the goal if not already selected (max 3)
      setFormData({
        ...formData,
        healthGoals: [...formData.healthGoals, value]
      });
    }
  };

  // Handle multi-select options like meal locations
  const handleMultiSelectChange = (e, name) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    if (isChecked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter(item => item !== value)
      });
    }
  };

  // Handle dietary preferences selection
  const handleDietaryPrefChange = (value) => {
    if (formData.dietaryPreferences.includes(value)) {
      setFormData({
        ...formData,
        dietaryPreferences: formData.dietaryPreferences.filter(pref => pref !== value)
      });
    } else {
      setFormData({
        ...formData,
        dietaryPreferences: [...formData.dietaryPreferences, value]
      });
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Préparation des données finales
    const finalFormData = {
      job: formData.job || formData.customJob,
      age: formData.age,
      healthGoals: formData.healthGoals,
      constraints: formatConstraints(),
      workHours: formData.workHours || formData.customWorkHours,
      mealLocations: formatMealLocations(),
      mealBreakDuration: formData.mealBreakDuration || formData.customBreakDuration,
      equipmentAccess: formatEquipmentAccess(),
      activityLevel: formData.activityLevel
    };

    onSubmit(finalFormData);
  };

  // Formater les contraintes en combinant les préférences alimentaires et le texte libre
  const formatConstraints = () => {
    const dietaryPrefs = formData.dietaryPreferences.map(pref => {
      const option = dietaryPreferencesOptions.find(opt => opt.value === pref);
      return option ? option.label : pref;
    }).join(', ');
    
    if (dietaryPrefs && formData.constraints) {
      return `${dietaryPrefs}. ${formData.constraints}`;
    } else if (dietaryPrefs) {
      return dietaryPrefs;
    } else {
      return formData.constraints;
    }
  };

  // Formater les lieux de repas
  const formatMealLocations = () => {
    return formData.mealLocations.map(loc => {
      const option = mealLocationsOptions.find(opt => opt.value === loc);
      return option ? option.label : loc;
    }).join(', ');
  };

  // Formater l'accès aux équipements
  const formatEquipmentAccess = () => {
    return formData.equipmentAccess.map(eq => {
      const option = equipmentAccessOptions.find(opt => opt.value === eq);
      return option ? option.label : eq;
    }).join(', ');
  };

  // Function to reset the form
  const handleReset = () => {
    setFormData({
      job: '',
      jobCategory: '',
      customJob: '',
      age: 35,
      healthGoals: [],
      dietaryPreferences: [],
      constraints: '',
      workHours: '',
      workScheduleType: '',
      customWorkHours: '',
      mealLocations: [],
      mealBreakDuration: '',
      breakDurationOption: '',
      customBreakDuration: '',
      equipmentAccess: [],
      activityLevel: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-blue-100 rounded-full p-6 transform rotate-12">
          <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <div className="relative">
          <h2 className="text-xl font-bold text-blue-900 mb-2">Bienvenue dans votre espace nutrition personnalisé</h2>
          <p className="text-blue-800">
            Prenez quelques minutes pour remplir ce formulaire. Notre IA nutritionniste analysera vos besoins spécifiques pour créer un plan alimentaire adapté à votre métier et à vos objectifs de santé.
          </p>
        </div>
      </div>
      
      <div className="space-y-8">
        {/* Informations professionnelles */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 ml-3">Informations Professionnelles</h2>
          </div>
          
          <div className="space-y-6">
            {/* Sélection du métier */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Métier Cible <span className="text-red-500">*</span>
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Catégorie professionnelle</label>
                  <select 
                    name="jobCategory"
                    value={formData.jobCategory}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  >
                    {jobCategories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {formData.jobCategory && formData.jobCategory !== 'other' && (
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Métier spécifique</label>
                    <select 
                      name="job"
                      value={formData.job}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                    >
                      <option value="">Sélectionnez un métier</option>
                      {commonJobs[formData.jobCategory]?.map(job => (
                        <option key={job.value} value={job.value}>
                          {job.label}
                        </option>
                      ))}
                      <option value="custom">Autre (préciser)</option>
                    </select>
                  </div>
                )}
              </div>
              
              {(formData.jobCategory === 'other' || formData.job === 'custom') && (
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Précisez votre métier</label>
                  <input
                    type="text"
                    name="customJob"
                    value={formData.customJob}
                    onChange={handleChange}
                    placeholder="Ex: Chef·fe de projet digital, Assistant·e vétérinaire..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Âge <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    name="age"
                    min="18"
                    max="80"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>18</span>
                    <span>40</span>
                    <span>60</span>
                    <span>80</span>
                  </div>
                  <div className="text-center text-lg font-semibold text-blue-600">
                    {formData.age} ans
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Niveau d'Activité Physique au Travail <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {activityLevelOptions.map(option => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`activity-${option.value}`}
                        name="activityLevel"
                        value={option.value}
                        checked={formData.activityLevel === option.value}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor={`activity-${option.value}`} className="ml-2 flex items-center">
                        <span className="text-lg mr-2">{option.icon}</span>
                        <div>
                          <span className="text-sm font-medium text-gray-700">{option.label}</span>
                          <span className="text-xs text-gray-500 block">{option.value.split('(')[1]?.replace(')', '') || ''}</span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Objectifs et contraintes */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 ml-3">Objectifs & Contraintes</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-3">
                Objectifs Santé Clés <span className="text-red-500">*</span>
                <span className="text-sm font-normal text-gray-500 ml-2">(1-3 choix)</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {healthGoalOptions.map(goal => (
                  <div
                    key={goal.value}
                    className={`relative flex items-start p-3 rounded-lg border ${
                      formData.healthGoals.includes(goal.value)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50'
                    } cursor-pointer transition-colors duration-200`}
                    onClick={() => !(!formData.healthGoals.includes(goal.value) && formData.healthGoals.length >= 3) && handleHealthGoalChange(goal.value)}
                  >
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        id={goal.value}
                        value={goal.value}
                        checked={formData.healthGoals.includes(goal.value)}
                        onChange={() => handleHealthGoalChange(goal.value)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        disabled={!formData.healthGoals.includes(goal.value) && formData.healthGoals.length >= 3}
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor={goal.value} className="text-sm font-medium text-gray-700 flex items-center">
                        <span className="text-xl mr-2">{goal.icon}</span>
                        {goal.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              {formData.healthGoals.length === 0 && (
                <p className="text-sm text-red-500 mt-1">Sélectionnez au moins un objectif</p>
              )}
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Préférences alimentaires
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {dietaryPreferencesOptions.map(pref => (
                  <div
                    key={pref.value}
                    className={`relative flex items-start p-2 rounded-lg border ${
                      formData.dietaryPreferences.includes(pref.value)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-green-200 hover:bg-gray-50'
                    } cursor-pointer transition-colors duration-200`}
                    onClick={() => handleDietaryPrefChange(pref.value)}
                  >
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        id={`diet-${pref.value}`}
                        value={pref.value}
                        checked={formData.dietaryPreferences.includes(pref.value)}
                        onChange={() => handleDietaryPrefChange(pref.value)}
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor={`diet-${pref.value}`} className="text-sm font-medium text-gray-700">
                        {pref.label}
                      </label>
                      <p className="text-xs text-gray-500">{pref.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Autres contraintes & préférences <span className="text-sm font-normal text-gray-500">(optionnel)</span>
              </label>
              <textarea
                name="constraints"
                value={formData.constraints}
                onChange={handleChange}
                placeholder="Ex: Allergie aux arachides, budget limité, préfère cuisiner en grande quantité le week-end..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                rows="2"
              />
            </div>
          </div>
        </div>
        
        {/* Contexte professionnel */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 ml-3">Contexte Professionnel</h2>
          </div>
          
          <div className="space-y-6">
            {/* Horaires de travail */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Horaires de Travail Typiques <span className="text-red-500">*</span>
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Type d'horaires</label>
                  <select 
                    name="workScheduleType"
                    value={formData.workScheduleType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  >
                    <option value="">Sélectionnez un type d'horaires</option>
                    {workScheduleTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {formData.workScheduleType && (
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Détail des horaires</label>
                    <select 
                      name="workHours"
                      value={formData.workHours}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                    >
                      <option value="">Sélectionnez vos horaires</option>
                      {commonWorkHours[formData.workScheduleType]?.map(hours => (
                        <option key={hours.value} value={hours.value}>
                          {hours.label}
                        </option>
                      ))}
                      <option value="custom">Horaires personnalisés</option>
                    </select>
                  </div>
                )}
              </div>
              
              {formData.workHours === 'custom' && (
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Précisez vos horaires</label>
                  <input
                    type="text"
                    name="customWorkHours"
                    value={formData.customWorkHours}
                    onChange={handleChange}
                    placeholder="Ex: 10h-19h avec 1h de pause, horaires variables..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  />
                </div>
              )}
            </div>
            
            {/* Lieu de repas */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Lieu(x) de Prise des Repas <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {mealLocationsOptions.map(location => (
                  <div 
                    key={location.value}
                    className={`p-3 border rounded-lg flex items-center space-x-2 cursor-pointer text-gray-700 ${
                      formData.mealLocations.includes(location.value) 
                        ? 'bg-indigo-50 border-indigo-300' 
                        : 'bg-white border-gray-200 hover:border-indigo-200'
                    }`}
                    onClick={() => {
                      const isSelected = formData.mealLocations.includes(location.value);
                      const updatedLocations = isSelected
                        ? formData.mealLocations.filter(loc => loc !== location.value)
                        : [...formData.mealLocations, location.value];
                      
                      setFormData({
                        ...formData,
                        mealLocations: updatedLocations
                      });
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`location-${location.value}`}
                      value={location.value}
                      checked={formData.mealLocations.includes(location.value)}
                      onChange={(e) => handleMultiSelectChange(e, 'mealLocations')}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`location-${location.value}`} className="flex-1 flex items-center cursor-pointer">
                      <span className="text-xl mr-2">{location.icon}</span>
                      <span className="text-sm">{location.label}</span>
                    </label>
                  </div>
                ))}
              </div>
              {formData.mealLocations.length === 0 && (
                <p className="text-sm text-red-500 mt-1">Sélectionnez au moins un lieu de repas</p>
              )}
            </div>
            
            {/* Temps de pause */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Temps de Pause Repas Effectif <span className="text-red-500">*</span>
              </label>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {breakDurationOptions.map(option => (
                    <div 
                      key={option.value}
                      className={`p-3 border rounded-md text-center cursor-pointer text-gray-700 ${
                        formData.breakDurationOption === option.value 
                          ? 'bg-indigo-50 border-indigo-300' 
                          : 'bg-white border-gray-200 hover:border-indigo-200'
                      }`}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          breakDurationOption: option.value,
                          mealBreakDuration: getBreakDurationText(option.value)
                        });
                      }}
                    >
                      <div className="text-sm font-medium">{option.label}</div>
                    </div>
                  ))}
                </div>
                
                <div 
                  className={`p-3 border rounded-md ${
                    formData.breakDurationOption === 'custom' 
                      ? 'bg-indigo-50 border-indigo-300' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id="custom-break"
                      name="breakDurationOption"
                      value="custom"
                      checked={formData.breakDurationOption === 'custom'}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="custom-break" className="ml-2 text-sm font-medium text-gray-700">
                      Personnalisé
                    </label>
                  </div>
                  
                  {formData.breakDurationOption === 'custom' && (
                    <input
                      type="text"
                      name="customBreakDuration"
                      value={formData.customBreakDuration}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          customBreakDuration: e.target.value,
                          mealBreakDuration: e.target.value
                        });
                      }}
                      placeholder="Ex: Variable selon les jours, 20 min max..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                    />
                  )}
                </div>
              </div>
            </div>
            
            {/* Équipement */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Accès Équipement <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {equipmentAccessOptions.map(equipment => (
                  <div 
                    key={equipment.value}
                    className={`p-3 border rounded-lg flex flex-col items-center justify-center space-y-2 cursor-pointer text-gray-700 ${
                      formData.equipmentAccess.includes(equipment.value) 
                        ? 'bg-indigo-50 border-indigo-300' 
                        : 'bg-white border-gray-200 hover:border-indigo-200'
                    }`}
                    onClick={() => {
                      const isSelected = formData.equipmentAccess.includes(equipment.value);
                      const updatedEquipment = isSelected
                        ? formData.equipmentAccess.filter(eq => eq !== equipment.value)
                        : [...formData.equipmentAccess, equipment.value];
                      
                      setFormData({
                        ...formData,
                        equipmentAccess: updatedEquipment
                      });
                    }}
                  >
                    <span className="text-2xl">{equipment.icon}</span>
                    <div className="text-center">
                      <input
                        type="checkbox"
                        id={`equipment-${equipment.value}`}
                        value={equipment.value}
                        checked={formData.equipmentAccess.includes(equipment.value)}
                        onChange={(e) => handleMultiSelectChange(e, 'equipmentAccess')}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`equipment-${equipment.value}`} className="ml-2 text-sm">
                        {equipment.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              {formData.equipmentAccess.length === 0 && (
                <p className="text-sm text-red-500 mt-1">Sélectionnez au moins un équipement</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4 pt-4">
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Réinitialiser
          </div>
        </button>
        <button
          type="submit"
          className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center ${
            loading || formData.healthGoals.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading || formData.healthGoals.length === 0 || formData.mealLocations.length === 0 || formData.equipmentAccess.length === 0}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Génération en cours...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Générer mon plan nutritionnel
            </>
          )}
        </button>
      </div>
    </form>
  );
}