// import { createSelector } from '@reduxjs/toolkit';

export const selectLoading = (state) => state.nannies.isLoading;

export const selectError = (state) => state.nannies.error;

export const selectNannies = (state) => state.nannies.nannies;

export const selectFilter = (state) => state.nannies.filter;

export const selectFav = (state) => state.nannies.favorites;

export const selectUser = (state) => state.user;

// export const selectVisible = createSelector(
//   [selectNannies, selectFilter],
//   (nannies, filter) => {
//     return nannies
//       .filter(one =>
//         brand !== '' ? one.make.toLowerCase().includes(brand.toLowerCase()) : one
//       )
//       .filter(one => {
//         const formattedPrice = Number(
//           one.rentalPrice.slice(1, one.rentalPrice.length)
//         );
//         return price ? formattedPrice <= Number(price) : one;
//       })
//       .filter(one =>
//         Number(mileageFrom) ? one.mileage >= Number(mileageFrom) : one
//       )
//       .filter(one =>
//         Number(mileageTo) ? one.mileage <= Number(mileageTo) : one
//       );
//   }
// );
