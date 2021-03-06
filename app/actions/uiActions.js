import { createAction } from 'redux-actions';

import types from 'constants/ActionTypes';
import ModalTypes from 'constants/ModalTypes';

const cancelReservationEdit = createAction(types.UI.CANCEL_RESERVATION_EDIT);

const cancelReservationEditInInfoModal = createAction(
  types.UI.CANCEL_RESERVATION_EDIT_IN_INFO_MODAL
);

const changeAdminReservationFilters = createAction(types.UI.CHANGE_ADMIN_RESERVATIONS_FILTERS);

const changeAdminResourcesPageDate = createAction(types.UI.CHANGE_ADMIN_RESOURCES_PAGE_DATE);

const changeSearchFilters = createAction(types.UI.CHANGE_SEARCH_FILTERS);

const clearReservations = createAction(types.UI.CLEAR_RESERVATIONS);

const closeConfirmReservationModal = createAction(
  types.UI.CLOSE_MODAL,
  () => ModalTypes.RESERVATION_CONFIRM
);

const closeReservationCancelModal = createAction(
  types.UI.CLOSE_MODAL,
  () => ModalTypes.RESERVATION_CANCEL
);

const closeReservationCommentModal = createAction(
  types.UI.CLOSE_MODAL,
  () => ModalTypes.RESERVATION_COMMENT
);

const closeReservationSuccessModal = createAction(
  types.UI.CLOSE_MODAL,
  () => ModalTypes.RESERVATION_SUCCESS
);

const filterAdminResourceType = createAction(types.UI.FILTER_ADMIN_RESOURCE_TYPE);

const hideReservationInfoModal = createAction(types.UI.HIDE_RESERVATION_INFO_MODAL);

const openConfirmReservationModal = createAction(
  types.UI.OPEN_MODAL,
  () => ModalTypes.RESERVATION_CONFIRM
);

const openReservationCancelModal = createAction(
  types.UI.OPEN_MODAL,
  () => ModalTypes.RESERVATION_CANCEL
);

const openReservationCommentModal = createAction(
  types.UI.OPEN_MODAL,
  () => ModalTypes.RESERVATION_COMMENT
);

const selectReservationToCancel = createAction(
  types.UI.SELECT_RESERVATION_TO_CANCEL
);

const selectReservationToEdit = createAction(
  types.UI.SELECT_RESERVATION_TO_EDIT
);

const selectReservationToShow = createAction(
  types.UI.SELECT_RESERVATION_TO_SHOW
);

const showReservationInfoModal = createAction(types.UI.SHOW_RESERVATION_INFO_MODAL);

const startReservationEditInInfoModal = createAction(types.UI.START_RESERVATION_EDIT_IN_INFO_MODAL);

const toggleTimeSlot = createAction(types.UI.TOGGLE_TIME_SLOT);

const unfilterAdminResourceType = createAction(types.UI.UNFILTER_ADMIN_RESOURCE_TYPE);

export {
  cancelReservationEdit,
  cancelReservationEditInInfoModal,
  changeAdminReservationFilters,
  changeAdminResourcesPageDate,
  changeSearchFilters,
  clearReservations,
  closeConfirmReservationModal,
  closeReservationCancelModal,
  closeReservationCommentModal,
  closeReservationSuccessModal,
  filterAdminResourceType,
  hideReservationInfoModal,
  openConfirmReservationModal,
  openReservationCancelModal,
  openReservationCommentModal,
  selectReservationToCancel,
  selectReservationToEdit,
  selectReservationToShow,
  showReservationInfoModal,
  startReservationEditInInfoModal,
  toggleTimeSlot,
  unfilterAdminResourceType,
};
