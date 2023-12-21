// import React from 'react';
//
// import {
//   useCreateData,
//   useDeleteData,
//   useGetAllData,
//   useUpdateData
// } from '@/hooks/use-query/use-query.example';
//
// const ExampleComponent: React.FC = () => {
//   const { data: allData, isLoading, isError } = useGetAllData(); // 使用 useGetAllData 获取所有数据
//   const createDataMutation = useCreateData(); // 使用 useCreateData 创建数据的 mutation
//   const updateDataMutation = useUpdateData(); // 使用 useUpdateData 更新数据的 mutation
//   const deleteDataMutation = useDeleteData(); // 使用 useDeleteData 删除数据的 mutation
//
//   const handleCreate = async () => {
//     try {
//       await createDataMutation.mutateAsync({
//         /* 新数据 */
//       }); // 调用 createDataMutation.mutateAsync 来创建新数据
//     } catch (error) {
//       // 处理创建数据失败的情况
//     }
//   };
//
//   const handleUpdate = async (id: number, updatedData: any) => {
//     try {
//       await updateDataMutation.mutateAsync(updatedData); // 调用 updateDataMutation.mutateAsync 来更新数据
//     } catch (error) {
//       // 处理更新数据失败的情况
//     }
//   };
//
//   const handleDelete = async (id: number) => {
//     try {
//       await deleteDataMutation.mutateAsync(id); // 调用 deleteDataMutation.mutateAsync 来删除数据
//     } catch (error) {
//       // 处理删除数据失败的情况
//     }
//   };
//
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//
//   if (isError) {
//     return <div>Error fetching data</div>;
//   }
//
//   return (
//     <div>
//       {/* 显示所有数据 */}
//       {allData &&
//         allData.map(data => (
//           <div key={data.id}>
//             <span>{data.name}</span>
//             <button
//               onClick={() =>
//                 handleUpdate(data.id, {
//                   /* 更新的数据 */
//                 })
//               }
//             >
//               Update
//             </button>
//             <button onClick={() => handleDelete(data.id)}>Delete</button>
//           </div>
//         ))}
//       {/* 创建新数据的按钮 */}
//       <button onClick={handleCreate}>Create New Data</button>
//     </div>
//   );
// };
//
// export default ExampleComponent;
