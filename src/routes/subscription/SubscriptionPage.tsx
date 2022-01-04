import React from 'react';

import { AsideLayoutRight } from 'routes/_layouts/AsideLayoutRight/AsideLayoutRight';

import { SubscriptionAside } from './SubscriptionAside/SubscriptionAside';
import { SubscriptionMain } from './SubscriptionMain/SubscriptionMain';

export interface SubscriptionPageProps {}

export const SubscriptionPage: React.FC<SubscriptionPageProps> = () => {
  return <AsideLayoutRight mainCmp={<SubscriptionMain />} asideCmp={<SubscriptionAside />} />;
};
