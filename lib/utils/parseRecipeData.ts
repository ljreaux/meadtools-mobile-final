export const parseRecipeData = (recipe: {
  recipeData: string;
  nutrientData: string;
  yanContribution: string;
}) => {
  const recipeData = JSON.parse(recipe.recipeData);
  const nutrientData = JSON.parse(recipe.nutrientData);
  const yanContribution = JSON.parse(recipe.yanContribution);
  const getSelectedSchedule = (schedule: string) => {
    switch (schedule) {
      case "tbe":
        return ["Fermaid O", "Fermaid K", "DAP"]; // Fermaid O, K, and DAP
      case "oAndk":
        return ["Fermaid O", "Fermaid K"]; // Fermaid O & K
      case "oAndDap":
        return ["Fermaid O", "DAP"]; // Fermaid O & DAP
      case "kAndDap":
        return ["Fermaid K", "DAP"]; // Fermaid K & DAP
      case "tosna":
        return ["Fermaid O"]; // Fermaid O Only
      case "justK":
        return ["Fermaid K"]; // Fermaid K Only
      case "dap":
        return ["DAP"]; // DAP Only
      case "other":
      default:
        return ["Other"]; // Default case is "Other"
    }
  };

  return {
    recipeData,
    nutrientData,
    yanContribution,
    getSelectedSchedule,
  };
};
