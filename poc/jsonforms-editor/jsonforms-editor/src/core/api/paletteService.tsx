/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */

import React from 'react';

import {
  CategorizationIcon,
  GroupIcon,
  HorizontalIcon,
  LabelIcon,
  VerticalIcon,
} from '../icons';
import { EditorUISchemaElement } from '../model/uischema';
import {
  createCategorization,
  createLabel,
  createCustomLabel,
  createLayout,
} from '../util/generators/uiSchema';

export interface PaletteService {
  getPaletteElements(): PaletteElement[];
}

export interface PaletteElement {
  type: string;
  label: string;
  icon: React.ReactNode;
  uiSchemaElementProvider: () => EditorUISchemaElement;
}

const paletteElements: PaletteElement[] = [
  {
    type: 'HorizontalLayout',
    label: 'Horizontal Layout',
    icon: <HorizontalIcon />,
    uiSchemaElementProvider: () => createLayout('HorizontalLayout'),
  } as PaletteElement,
  {
    type: 'VerticalLayout',
    label: 'Vertical Layout',
    icon: <VerticalIcon />,
    uiSchemaElementProvider: () => createLayout('VerticalLayout'),
  },
  {
    type: 'CustomHorizontalLayout',
    label: 'Custom HLayout',
    icon: <HorizontalIcon />,
    uiSchemaElementProvider: () => createLayout('CustomHorizontalLayout'),
  } as PaletteElement,
  {
    type: 'CustomVerticalLayout',
    label: 'Custom VLayout',
    icon: <VerticalIcon />,
    uiSchemaElementProvider: () => createLayout('CustomVerticalLayout'),
  },
  {
    type: 'Group',
    label: 'Group',
    icon: <GroupIcon />,
    uiSchemaElementProvider: () => createLayout('Group'),
  },
  {
    type: 'Label',
    label: 'Label',
    icon: <LabelIcon />,
    uiSchemaElementProvider: () => createLabel(),
  },
  {
    type: 'Categorization',
    label: 'Categorization',
    icon: <CategorizationIcon />,
    uiSchemaElementProvider: () => createCategorization(),
  },
  {
    type: 'CustomLabel',
    label: 'Custom Label',
    icon: <LabelIcon />,
    uiSchemaElementProvider: () => createCustomLabel(),
  },
];

export class DefaultPaletteService implements PaletteService {
  getPaletteElements = () => paletteElements;
}
