import AbvCalculator from "~/components/extraCalcs/AbvCalculator";
import BenchTrials from "~/components/extraCalcs/BenchTrials";
import Blending from "~/components/extraCalcs/Blending";
import Brix from "~/components/extraCalcs/Brix";
import EstimatedOG from "~/components/extraCalcs/EstimatedOg";
import PrimingSugar from "~/components/extraCalcs/PrimingSugar";
import RefractometerCorrection from "~/components/extraCalcs/RefractometerCorrection";
import Sorbate from "~/components/extraCalcs/Sorbate";
import Sulfite from "~/components/extraCalcs/Sulfite";
import TempCorrection from "~/components/extraCalcs/TemperatureCorrection";

export const extraCalcTabs = [
  {
    component: <AbvCalculator />,
    label: "calculators.extraCalcs.abv",
  },
  {
    component: <Brix />,
    label: "calculators.extraCalcs.brix",
  },
  {
    component: <EstimatedOG />,
    label: "calculators.extraCalcs.estOG",
  },
  {
    component: <BenchTrials />,
    label: "calculators.extraCalcs.benchTrials",
  },
  {
    component: <Sulfite />,
    label: "sulfiteHeading",
  },
  {
    component: <Sorbate />,
    label: "sorbateHeading",
  },
  {
    component: <RefractometerCorrection />,
    label: "calculators.extraCalcs.refractometer",
  },
  {
    component: <TempCorrection />,
    label: "calculators.extraCalcs.tempCorrection",
  },
  {
    component: <Blending />,
    label: "calculators.extraCalcs.blending",
  },
  {
    component: <PrimingSugar />,
    label: "primingSugarHeading",
  },
];
