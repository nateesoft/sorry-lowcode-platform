import {materialRenderers} from '@jsonforms/material-renderers'

// custom component
// import CustomHorizontalLayout, { customHorizontalLayoutTester } from "./CustomHorizontalLayout";
import CustomVerticalLayout, { customVerticalLayoutTester } from "./CustomVerticalLayout";

export const renderes: any = [
    ...materialRenderers,
    // { tester: customHorizontalLayoutTester, renderes: CustomHorizontalLayout },
    { tester: customVerticalLayoutTester, renderes: CustomVerticalLayout }
]