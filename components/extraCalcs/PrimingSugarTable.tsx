import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useTranslation } from "react-i18next";
import lodash from "lodash";
import { Text } from "../ui/text";
import { ScrollView, useWindowDimensions } from "react-native";

type PrimingSugar =
  | {
      amount: number;
      perBottle: {
        label: string;
        amount: number;
      }[];
      label: string;
    }[]
  | undefined;

const MIN_COLUMN_WIDTHS = new Array(7).fill(100);

function PrimingSugarTable({ primingSugar }: { primingSugar: PrimingSugar }) {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage;

  const { width } = useWindowDimensions();
  const columnWidths = React.useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator>
      <Table className="mt-4 mb-16">
        <TableHeader>
          <TableRow>
            <TableHead style={{ width: columnWidths[0] }}>
              <Text>{t("primingTable.sugarHeading")}</Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[1] }}>
              <Text>{t("primingTable.perBatchHeading")}</Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[2] }}>
              <Text>
                {t("primingTable.perBottleHeading", {
                  bottleSize: "12oz",
                })}
              </Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[3] }}>
              <Text>
                {t("primingTable.perBottleHeading", {
                  bottleSize: "22oz",
                })}
              </Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[4] }}>
              <Text>
                {t("primingTable.perBottleHeading", {
                  bottleSize: "330ml",
                })}
              </Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[5] }}>
              <Text>
                {t("primingTable.perBottleHeading", {
                  bottleSize: "500ml",
                })}
              </Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[6] }}>
              <Text>
                {t("primingTable.perBottleHeading", {
                  bottleSize: "750ml",
                })}
              </Text>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {primingSugar?.map((sugar) => (
            <TableRow key={sugar.label}>
              <TableCell
                className="font-bold"
                style={{ width: columnWidths[0] }}
              >
                <Text>{t(lodash.camelCase(sugar.label))}</Text>
              </TableCell>
              <TableCell style={{ width: columnWidths[1] }}>
                <Text>{`${sugar.amount.toLocaleString(currentLocale, {
                  maximumFractionDigits: 3,
                })}g`}</Text>
              </TableCell>
              {sugar.perBottle.map((bottle, i) => (
                <TableCell
                  key={bottle.label}
                  style={{ width: columnWidths[i + 2] }}
                >
                  <Text>
                    {`${bottle.amount.toLocaleString(currentLocale, {
                      maximumFractionDigits: 3,
                    })}g`}
                  </Text>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollView>
  );
}

export default PrimingSugarTable;
