import React from 'react';

import PageControl from './PageControl';

export default {
  title: 'MovieApp/PageControl',
  component: PageControl,
  parameters: { actions: { argTypesRegex: '^handle.*' } },
};

const Template = (args) => <PageControl {...args} />;

export const Base = Template.bind({});
Base.args = {
  currentPage: 2,
  itemPerPage: 10,
  totalItemCount: 115,
};
