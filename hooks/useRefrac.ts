import { toBrix, toSG } from "~/lib/utils/unitConverter";
import { isValidNumber, parseNumber } from "~/lib/utils/validateInput";
import { useState } from "react";
import { Option } from "~/components/ui/select";

const useRefrac = () => {
  const [correctionFactor, setCorrectionFactor] = useState("1");
  const [og, setOg] = useState("1.1");
  const [ogUnits, setOgUnits] = useState<"SG" | "Brix">("SG");
  const [fg, setFg] = useState("8.5");

  const ogBrix = ogUnits === "Brix" ? parseNumber(og) : toBrix(parseNumber(og));
  const fgBrix = parseNumber(fg);

  const correctedFg = refracCalc(ogBrix, fgBrix, parseNumber(correctionFactor));

  const changeOgUnits = () => {
    if (ogUnits === "SG") {
      setOg(toBrix(parseNumber(og)).toFixed(2));
    } else {
      setOg(toSG(parseNumber(og)).toFixed(3));
    }
  };

  return {
    correctionFactorProps: {
      value: correctionFactor,
      onChangeText: (value: string) => {
        if (isValidNumber(value)) {
          setCorrectionFactor(value);
        }
      },
    },
    ogProps: {
      value: og,
      onChangeText: (value: string) => {
        if (isValidNumber(value)) {
          setOg(value);
        }
      },
    },
    ogUnitProps: {
      value: { value: ogUnits, label: ogUnits.toUpperCase() },
      onValueChange: (val: Option) => {
        if (val) setOgUnits(val.value as "SG" | "Brix");
        changeOgUnits();
      },
    },
    fgProps: {
      value: fg,
      onChangeText: (value: string) => {
        if (isValidNumber(value)) {
          setFg(value);
        }
      },
    },
    correctedFg,
    correctedBrix: toBrix(correctedFg),
  };
};

export default useRefrac;

function refracCalc(ogBr: number, fgBr: number, corFac: number) {
  return -0.002349 * (ogBr / corFac) + 0.006276 * (fgBr / corFac) + 1;
}
