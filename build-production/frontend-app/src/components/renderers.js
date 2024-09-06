import { materialRenderers } from "@jsonforms/material-renderers"

// custom component
import RatingControl, {ratingTester} from "./mui/components/Rating"
import ActionButton, {actionButtonTester} from "./mui/components/ActionButton"
import TypographyControl, {typographyTester} from "./mui/components/Typography"
import AccordionLayout, {accordionLayoutTester} from "./mui/layouts/AccordionLayout";
import GridLayout, { gridLayoutTester } from "./mui/layouts/GridLayout";
import TableData, { tableDataTester } from "./mui/components/TableData";

export const renderers = [
    ...materialRenderers,
    { tester: ratingTester, renderer: RatingControl },
    { tester: actionButtonTester, renderer: ActionButton },
    { tester: typographyTester, renderer: TypographyControl },
    { tester: accordionLayoutTester, renderer: AccordionLayout },
    { tester: gridLayoutTester, renderer: GridLayout },
    { tester: tableDataTester, renderer: TableData },
  ];


