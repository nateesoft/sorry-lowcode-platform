import { materialRenderers } from "@jsonforms/material-renderers"

// custom component
import GridLayout, { gridLayoutTester } from "./mui/layouts/GridLayout";
import AccordionLayout, {accordionLayoutTester} from "./mui/layouts/AccordionLayout";
import TableData, { tableDataTester } from "./mui/components/TableData";
import ActionButton, {actionButtonTester} from "./mui/components/ActionButton"
import RatingControl, {ratingTester} from "./mui/components/Rating"
import TypographyControl, {typographyTester} from "./mui/components/Typography"

export const renderers = [
    ...materialRenderers,
    { tester: gridLayoutTester, renderer: GridLayout },
    { tester: accordionLayoutTester, renderer: AccordionLayout },
    { tester: tableDataTester, renderer: TableData },
    { tester: actionButtonTester, renderer: ActionButton },
    { tester: ratingTester, renderer: RatingControl },
    { tester: typographyTester, renderer: TypographyControl }
  ];


