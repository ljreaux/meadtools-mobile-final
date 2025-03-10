import { View } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecipe } from "../providers/RecipeProvider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { isValidNumber, parseNumber } from "~/lib/utils/validateInput";
import { Text } from "../ui/text";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDown } from "~/lib/icons/ChevronDown";
import { ChevronUp } from "~/lib/icons/ChevronUp";
import { Input } from "../ui/input";
import SectionCard from "./SectionCard";

const DesiredBatchDetails = () => {
  const { t } = useTranslation();
  const { setIngredientsToTarget } = useRecipe();
  const [{ og, volume }, setOgAndVolume] = useState({
    og: "",
    volume: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [open, isOpen] = useState(false);

  const handleSubmit = () => {
    setIngredientsToTarget(parseNumber(og), parseNumber(volume));
    setIsDialogOpen(false);
    setOgAndVolume({ og: "", volume: "" });
  };
  return (
    <SectionCard>
      <Collapsible open={open} onOpenChange={isOpen}>
        <CollapsibleTrigger>
          <View className="flex flex-row items-center gap-2">
            <Text>{t("initialDetails.title")}</Text>
            {open ? (
              <ChevronUp size={14} className="text-foreground" />
            ) : (
              <ChevronDown size={14} className="text-foreground" />
            )}
          </View>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <View className="flex gap-4 mt-2">
            <Input
              value={og}
              placeholder="Enter OG"
              onChangeText={(value) => {
                if (isValidNumber(value)) setOgAndVolume({ volume, og: value });
              }}
            />

            <Input
              value={volume}
              placeholder="Enter Volume"
              onChangeText={(value) => {
                if (isValidNumber(value)) setOgAndVolume({ og, volume: value });
              }}
            />

            <Button className="max-w-24" onPress={() => setIsDialogOpen(true)}>
              <Text>{t("SUBMIT")}</Text>
            </Button>
          </View>
        </CollapsibleContent>
      </Collapsible>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("desktop.confirm")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("calculateDetailsDialog")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                onPress={() => setIsDialogOpen(false)}
                variant={"destructive"}
              >
                <Text>{t("cancel")}</Text>
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onPress={handleSubmit}>
                <Text>{t("SUBMIT")}</Text>
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SectionCard>
  );
};

export default DesiredBatchDetails;
