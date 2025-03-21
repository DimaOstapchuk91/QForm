export const selectQuestionnaires = state =>
  state.questionnaires.questionnaires;
export const selectTotalQuestionnaires = state => state.questionnaires.total;
export const selectIsPagination = state => state.questionnaires.pagination;
export const selectIsLoading = state => state.questionnaires.isLoading;
export const selectIsError = state => state.questionnaires.error;
export const selectOneoneQuestionnaire = state =>
  state.questionnaires.oneQuestionnaire;
