import { withKnobs, text } from '@storybook/addon-knobs';
import React from 'react';

import Checkbox from './Checkbox';

export default {
  title: 'MovieApp/Checkbox',
  component: Checkbox,
  parameters: { actions: { argTypesRegex: '^handle.*' } },
  decorators: [withKnobs],
};

const Template = (args) => <Checkbox {...args} />;

export const Checked = Template.bind({});
Checked.args = {
  label: 'Checkbox Label',
  initialState: true,
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  label: 'Checkbox Label',
  initialState: false,
};

export const CustomClassName = Template.bind({});
CustomClassName.args = {
  initialState: true,
  label: 'Checkbox Label',
  className: 'custom',
};

export const CustomLabel = () => <Checkbox label={text('Checkbox Label', 'label')} initialState="true" />;
