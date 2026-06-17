'use client';
import { useState } from 'react';

interface FormData {
  // Step 1: Basic Info
  age: number;
  job: string;
  jobCategory: string;
  customJob: string;
  activityLevel: string;
  
  // Step 2: Goals & Preferences
  healthGoals: string[];
  dietaryPreferences: string[];
  constraints: string;
  
  // Step 3: Work Context
  workScheduleType: string;
  workHours: string;
  customWorkHours: string;
  mealLocations: string[];
  breakDurationOption: string;
  mealBreakDuration: string;
  customBreakDuration: string;
  equipmentAccess: string[];
  
  // Step 4: Location & Cuisine
  country: string;
  cuisinePreferences: string[];
}

interface NutritionFormImprovedProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}

const STEPS = [
  { id: 1, title: 'Profil', description: 'Informations de base' },
  { id: 2, title: 'Objectifs', description: 'Vos préférences' },
  { id: 3, title: 'Travail', description: 'Contexte professionnel' },
  { id: 4, title: 'Localisation', description: 'Pays et cuisine' }
];

export default function NutritionFormImproved({ onSubmit, loading }: NutritionFormImprovedProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    age: 35,
    job: '',
    jobCategory: '',
    customJob: '',
    activityLevel: '',
    healthGoals: [],
    dietaryPreferences: [],
    constraints: '',
    workScheduleType: '',
    workHours: '',
    customWorkHours: '',
    mealLocations: [],
    breakDurationOption: '',
    mealBreakDuration: '',
    customBreakDuration: '',
    equipmentAccess: [],
    country: 'FR',
    cuisinePreferences: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Data options (simplified for demo)
  const jobCategories = [
    { value: '', label: 'Sélectionnez une catégorie' },
    { value: 'office', label: 'Travail de bureau' },
    { value: 'health', label: 'Santé' },
    { value: 'education', label: 'Éducation' },
    { value: 'construction', label: 'Construction et BTP' },
    { value: 'retail', label: 'Commerce et vente' },
    { value: 'services', label: 'Services et hôtellerie' },
    { value: 'transport', label: 'Transport et logistique' },
    { value: 'other', label: 'Autre' }
  ];

  const activityLevels = [
    { value: 'sedentary', label: 'Très sédentaire', description: 'Assis > 80% du temps', icon: '💻' },
    { value: 'active', label: 'Actif', description: 'Marche fréquente, escaliers', icon: '🚶' },
    { value: 'physical', label: 'Physique', description: 'Port de charges, mouvements', icon: '📦' },
    { value: 'very_physical', label: 'Très physique', description: 'Effort intense continu', icon: '🏋️' }
  ];

  const healthGoals = [
    { value: 'energy', label: 'Augmenter l\'énergie', icon: '⚡' },
    { value: 'recovery', label: 'Récupération musculaire', icon: '💪' },
    { value: 'concentration', label: 'Améliorer concentration', icon: '🎯' },
    { value: 'stress', label: 'Gérer le stress', icon: '🧘' },
    { value: 'weight_loss', label: 'Perdre du poids', icon: '📉' },
    { value: 'weight_gain', label: 'Prendre du poids', icon: '📈' },
    { value: 'sleep', label: 'Améliorer le sommeil', icon: '😴' }
  ];

  const dietaryPreferences = [
    { value: 'vegetarian', label: 'Végétarien' },
    { value: 'vegan', label: 'Végétalien/Vegan' },
    { value: 'gluten_free', label: 'Sans gluten' },
    { value: 'lactose_free', label: 'Sans lactose' },
    { value: 'paleo', label: 'Paléo' },
    { value: 'keto', label: 'Cétogène' }
  ];

  // Progress calculation
  const getProgress = () => (currentStep / STEPS.length) * 100;

  // Validation for each step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.jobCategory) newErrors.jobCategory = 'Sélectionnez une catégorie professionnelle';
        if (!formData.job && !formData.customJob) newErrors.job = 'Spécifiez votre métier';
        if (!formData.activityLevel) newErrors.activityLevel = 'Sélectionnez votre niveau d\'activité';
        break;
      case 2:
        if (formData.healthGoals.length === 0) newErrors.healthGoals = 'Sélectionnez au moins un objectif';
        break;
      case 3:
        if (formData.mealLocations.length === 0) newErrors.mealLocations = 'Sélectionnez au moins un lieu de repas';
        if (formData.equipmentAccess.length === 0) newErrors.equipmentAccess = 'Sélectionnez vos équipements disponibles';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation functions
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  // Handle form changes
  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Multi-select handler
  const handleMultiSelect = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(value)) {
      handleChange(field, currentArray.filter(item => item !== value));
    } else {
      handleChange(field, [...currentArray, value]);
    }
  };

  // Progress Bar Component
  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
              ${currentStep > step.id ? 'bg-green-500 text-white' : 
                currentStep === step.id ? 'bg-blue-500 text-white' : 
                'bg-gray-200 text-gray-600'}
            `}>
              {currentStep > step.id ? '✓' : step.id}
            </div>
            {index < STEPS.length - 1 && (
              <div className={`
                flex-1 h-1 mx-4
                ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}
              `} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">{STEPS[currentStep - 1].title}</h2>
        <p className="text-gray-600">{STEPS[currentStep - 1].description}</p>
      </div>
    </div>
  );

  // Step 1: Basic Profile
  const Step1 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Commençons par votre profil professionnel</h3>
        <p className="text-blue-700 text-sm">Ces informations nous aident à comprendre vos contraintes physiques et mentales.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Catégorie professionnelle <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.jobCategory}
            onChange={(e) => handleChange('jobCategory', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.jobCategory ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {jobCategories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          {errors.jobCategory && <p className="text-red-500 text-sm mt-1">{errors.jobCategory}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Métier spécifique <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.customJob}
            onChange={(e) => handleChange('customJob', e.target.value)}
            placeholder="Ex: Développeur web, Infirmière, Chef de projet..."
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.job ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.job && <p className="text-red-500 text-sm mt-1">{errors.job}</p>}
        </div>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-3">
          Âge: <span className="text-blue-600 font-semibold">{formData.age} ans</span>
        </label>
        <input
          type="range"
          min="18"
          max="80"
          value={formData.age}
          onChange={(e) => handleChange('age', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>18</span>
          <span>40</span>
          <span>60</span>
          <span>80</span>
        </div>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-3">
          Niveau d'activité physique au travail <span className="text-red-500">*</span>
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          {activityLevels.map(level => (
            <div
              key={level.value}
              onClick={() => handleChange('activityLevel', level.value)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.activityLevel === level.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{level.icon}</span>
                <div>
                  <div className="font-medium text-gray-800">{level.label}</div>
                  <div className="text-sm text-gray-600">{level.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {errors.activityLevel && <p className="text-red-500 text-sm mt-1">{errors.activityLevel}</p>}
      </div>
    </div>
  );

  // Step 2: Goals & Preferences
  const Step2 = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">Vos objectifs et préférences</h3>
        <p className="text-green-700 text-sm">Définissez vos priorités pour un plan sur mesure.</p>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-3">
          Objectifs santé prioritaires <span className="text-red-500">*</span>
          <span className="text-sm font-normal text-gray-500 ml-2">(1-3 choix)</span>
        </label>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {healthGoals.map(goal => (
            <div
              key={goal.value}
              onClick={() => formData.healthGoals.length < 3 || formData.healthGoals.includes(goal.value) 
                ? handleMultiSelect('healthGoals', goal.value) : null}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.healthGoals.includes(goal.value)
                  ? 'border-green-500 bg-green-50'
                  : formData.healthGoals.length >= 3
                  ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                  : 'border-gray-200 hover:border-green-200'
              }`}
            >
              <div className="flex items-center">
                <span className="text-xl mr-2">{goal.icon}</span>
                <span className="text-sm font-medium">{goal.label}</span>
              </div>
            </div>
          ))}
        </div>
        {errors.healthGoals && <p className="text-red-500 text-sm mt-1">{errors.healthGoals}</p>}
        <p className="text-sm text-gray-500 mt-2">
          Sélectionnés: {formData.healthGoals.length}/3
        </p>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-3">
          Préférences alimentaires
        </label>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dietaryPreferences.map(pref => (
            <div
              key={pref.value}
              onClick={() => handleMultiSelect('dietaryPreferences', pref.value)}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.dietaryPreferences.includes(pref.value)
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <span className="text-sm font-medium">{pref.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Autres contraintes ou préférences
        </label>
        <textarea
          value={formData.constraints}
          onChange={(e) => handleChange('constraints', e.target.value)}
          placeholder="Ex: Allergie aux arachides, budget limité, préfère cuisiner le week-end..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        />
      </div>
    </div>
  );

  // Step 3: Work Context (simplified)
  const Step3 = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-2">Votre contexte de travail</h3>
        <p className="text-purple-700 text-sm">Nous adaptons vos repas à votre environnement professionnel.</p>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-3">
          Où prenez-vous vos repas ? <span className="text-red-500">*</span>
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { value: 'office', label: 'Bureau', icon: '🏢' },
            { value: 'home', label: 'Domicile (télétravail)', icon: '🏠' },
            { value: 'canteen', label: 'Cantine d\'entreprise', icon: '🍽️' },
            { value: 'restaurant', label: 'Restaurant', icon: '🍴' },
            { value: 'mobile', label: 'En déplacement', icon: '🚗' },
            { value: 'other', label: 'Autre', icon: '📍' }
          ].map(location => (
            <div
              key={location.value}
              onClick={() => handleMultiSelect('mealLocations', location.value)}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.mealLocations.includes(location.value)
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">{location.icon}</span>
                <span className="font-medium">{location.label}</span>
              </div>
            </div>
          ))}
        </div>
        {errors.mealLocations && <p className="text-red-500 text-sm mt-1">{errors.mealLocations}</p>}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-3">
          Équipements disponibles <span className="text-red-500">*</span>
        </label>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { value: 'full_kitchen', label: 'Cuisine complète', icon: '👨‍🍳' },
            { value: 'microwave', label: 'Micro-ondes', icon: '♨️' },
            { value: 'fridge', label: 'Réfrigérateur', icon: '❄️' },
            { value: 'kettle', label: 'Bouilloire/Cafetière', icon: '☕' },
            { value: 'none', label: 'Aucun équipement', icon: '❌' }
          ].map(equipment => (
            <div
              key={equipment.value}
              onClick={() => handleMultiSelect('equipmentAccess', equipment.value)}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.equipmentAccess.includes(equipment.value)
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-200'
              }`}
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">{equipment.icon}</span>
                <span className="text-sm font-medium">{equipment.label}</span>
              </div>
            </div>
          ))}
        </div>
        {errors.equipmentAccess && <p className="text-red-500 text-sm mt-1">{errors.equipmentAccess}</p>}
      </div>
    </div>
  );

  // Step 4: Location
  const Step4 = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">Localisation et préférences culinaires</h3>
        <p className="text-yellow-700 text-sm">Adaptons vos suggestions aux produits locaux et à vos goûts.</p>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Pays de résidence <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.country}
          onChange={(e) => handleChange('country', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="FR">France</option>
          <option value="CA">Canada</option>
          <option value="BE">Belgique</option>
          <option value="CH">Suisse</option>
          <option value="other">Autre</option>
        </select>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-3">
          Types de cuisine préférés
        </label>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { value: 'french', label: 'Française', icon: '🥖' },
            { value: 'mediterranean', label: 'Méditerranéenne', icon: '🍅' },
            { value: 'asian', label: 'Asiatique', icon: '🍜' },
            { value: 'american', label: 'Américaine', icon: '🍔' },
            { value: 'vegetarian', label: 'Végétarienne', icon: '🥗' },
            { value: 'fusion', label: 'Fusion', icon: '🍣' }
          ].map(cuisine => (
            <div
              key={cuisine.value}
              onClick={() => handleMultiSelect('cuisinePreferences', cuisine.value)}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.cuisinePreferences.includes(cuisine.value)
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-red-200'
              }`}
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">{cuisine.icon}</span>
                <span className="text-sm font-medium">{cuisine.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">🎉 Prêt à générer votre plan !</h3>
        <p className="text-green-700 text-sm">
          Vous avez rempli toutes les informations. Nous allons créer un plan nutritionnel 
          personnalisé adapté à votre profil de <strong>{formData.customJob || 'professionnel'}</strong>.
        </p>
      </div>
    </div>
  );

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 />;
      case 2: return <Step2 />;
      case 3: return <Step3 />;
      case 4: return <Step4 />;
      default: return <Step1 />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressBar />
      
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        {renderStep()}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Précédent
          </button>
          
          {currentStep < STEPS.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Suivant →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Génération...
                </>
              ) : (
                <>
                  ✨ Générer mon plan
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}