import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconSettings,
  IconUser
} from '@tabler/icons-react';
import React from 'react';

import { Page } from '@/layout';
import Sidebar from '@/layout/page/sidebar';

const mainLinksMockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconCalendarStats, label: 'Releases' },
  { icon: IconUser, label: 'Account' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' }
];

const nav = <Sidebar links={mainLinksMockdata} activeLabel='Releases' />;

export const Dashboard = () => {
  return (
    <Page title='Dashboard' useLayout nav={nav}>
      Dashboard Page
    </Page>
  );
};

export default Dashboard;
