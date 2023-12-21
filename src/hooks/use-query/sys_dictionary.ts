// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
//
// import { apis } from '@/helpers/api';
// import { request } from '@/helpers/request';
//
// const queryClient = useQueryClient();
//
// export const useSysDictionary = {
//   fetchAllData: () => {
//     return useQuery('dictionaries', async () => {
//       const response = await request.get(apis.endpoint);
//       return response.data;
//     });
//   },
//   get: (id: string) => {
//     return useQuery(['dictionary', id], async () => {
//       const response = await request.get(`/api/data/${id}`);
//       return response.data;
//     });
//   },
//   create: () => {
//     return useMutation((newData: any) => request.post('/api/data', newData), {
//       onSuccess: () => {
//         queryClient.invalidateQueries();
//       }
//     });
//   },
//   update: () => {
//     return useMutation(
//       (updatedData: any) => request.put(`/api/data/${updatedData.id}`, updatedData),
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries();
//         }
//       }
//     );
//   },
//   delete: () => {
//     return useMutation((id: number) => request.delete(`/api/data/${id}`), {
//       onSuccess: () => {
//         queryClient.invalidateQueries();
//       }
//     });
//   }
// };
