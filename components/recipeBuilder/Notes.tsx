import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { Recipe } from "~/types/recipeDataTypes";
import { ScrollView, View } from "react-native";
import { useRecipe } from "../providers/RecipeProvider";
import SectionCard from "./SectionCard";
import { Text } from "../ui/text";

type TextAreaProps = {
  value: string;
  onChangeText: (val: string) => void;
};

const Notes = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ScrollView>
      <NotesCard useRecipe={useRecipe} />
      {children}
    </ScrollView>
  );
};

export default Notes;

function NotesCard({ useRecipe }: { useRecipe: () => Recipe }) {
  const { t } = useTranslation();
  const {
    notes,
    editPrimaryNote,
    editSecondaryNote,
    removePrimaryNote,
    removeSecondaryNote,
    addPrimaryNote,
    addSecondaryNote,
    setPrimaryNotes,
    setSecondaryNotes,
  } = useRecipe();
  return (
    <SectionCard>
      <View className="py-6">
        <Text>{t("notes.subtitleOne")}</Text>

        {notes.primary.length > 0 ? (
          notes.primary.map((note) => {
            return (
              <Note
                key={note.id}
                remove={() => removePrimaryNote(note.id)}
                noteProps={{
                  value: note.content[0],
                  onChangeText: (value) => editPrimaryNote.text(note.id, value),
                }}
                detailProps={{
                  value: note.content[1],
                  onChangeText: (value) =>
                    editPrimaryNote.details(note.id, value),
                }}
              />
            );
          })
        ) : (
          <Text className="py-6">Press the button below to add a Note.</Text>
        )}
        <Button
          onPress={addPrimaryNote}
          disabled={notes.primary.length >= 10}
          variant="secondary"
        >
          <Text>New Note</Text>
        </Button>
      </View>
      <View className="py-6">
        <Text>{t("notes.subtitleTwo")}</Text>
        {notes.secondary.length > 0 ? (
          notes.secondary.map((note) => {
            return (
              <Note
                key={note.id}
                remove={() => removeSecondaryNote(note.id)}
                noteProps={{
                  value: note.content[0],
                  onChangeText: (value) =>
                    editSecondaryNote.text(note.id, value),
                }}
                detailProps={{
                  value: note.content[1],
                  onChangeText: (value) =>
                    editSecondaryNote.details(note.id, value),
                }}
              />
            );
          })
        ) : (
          <Text className="py-6">Press the button below to add a Note.</Text>
        )}
        <Button
          onPress={addSecondaryNote}
          disabled={notes.secondary.length >= 10}
          variant="secondary"
        >
          <Text>New Note</Text>
        </Button>
      </View>
    </SectionCard>
  );
}

const Note = ({
  noteProps,
  detailProps,

  remove,
}: {
  noteProps: TextAreaProps;
  detailProps: TextAreaProps;
  remove: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <View className="flex gap-2">
      <View>
        <Text>Note</Text>
        <Textarea {...noteProps} placeholder={t("notes.placeholder")} />
      </View>
      <View>
        <Text>Details</Text>
        <Textarea {...detailProps} placeholder={t("notes.placeholder")} />
      </View>
      <Button onPress={remove} variant="destructive" className="my-2">
        <Text>Remove</Text>
      </Button>
    </View>
  );
};
