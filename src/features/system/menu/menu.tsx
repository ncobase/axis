import { Box } from '@/components/box/box';
import { useListMenus } from '@/features/system/menu/service';
import { Page } from '@/layout';

export const Menu = () => {
  const { menus } = useListMenus();

  return (
    <Page sidebar>
      <Box>
        <div className='overflow-x-auto'>
          <table className='border-collapse table-auto w-full text-sm'>
            <thead>
              <th className='border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left'></th>
              <th className='border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                Name
              </th>
              <th className='border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                Path
              </th>
            </thead>
            <tbody className='bg-white dark:bg-slate-800'>
              {menus?.map(menu => (
                <tr key={menu.id}>
                  <td className='border border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                    {menu.id}
                  </td>
                  <td className='border border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                    {menu.name}
                  </td>
                  <td className='border border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                    {menu.path}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </Page>
  );
};
