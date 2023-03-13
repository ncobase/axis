import { Content, Page } from '@/layout';
import { useAccount } from '@/pages/account/account.service';

export const Home = () => {
  // TDO: add account menu
  const { user, profile } = useAccount();
  return (
    <Page title='Home'>
      <Content>
        <div className='text-xs text-center'>
          Current User: {profile?.display_name || user?.username}
        </div>
      </Content>
    </Page>
  );
};
