export const resetRecipe = () => {
  const itemsToRemove = [
    "recipeData",
    "recipeName",
    "nutrientData",
    "selectedGpl",
    "yanContribution",
    "otherNutrientName",
    "primaryNotes",
    "secondaryNotes",
    "addingStabilizers",
  ];

  itemsToRemove.forEach((item) => localStorage.removeItem(item));
};
