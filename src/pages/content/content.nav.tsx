import {
  IconArticle,
  IconCategory2,
  IconCheckupList,
  IconMessage,
  IconMessageReport,
  IconTags,
  IconTrash
} from '@tabler/icons-react';
import React from 'react';

import { Sidebar } from '@/layout/page/sidebar';

const mainLinksMockdata = [
  {
    path: '/content/taxonomy',
    icon: IconCategory2,
    label: 'content:nav.taxonomy'
  },
  {
    path: '/content/tag',
    icon: IconTags,
    label: 'content:nav.tag'
  },
  {
    path: '/content/post',
    icon: IconArticle,
    label: 'content:nav.post'
  },
  {
    path: '/content/comment',
    icon: IconMessage,
    label: 'content:nav.comment'
  },
  {
    path: '/content/approve',
    icon: IconCheckupList,
    label: 'content:nav.approve'
  },
  {
    path: '/content/report',
    icon: IconMessageReport,
    label: 'content:nav.report'
  },
  {
    path: '/content/trash',
    icon: IconTrash,
    label: 'content:nav.trash'
  }
];

export default <Sidebar links={mainLinksMockdata} activeLabel='Releases' />;
