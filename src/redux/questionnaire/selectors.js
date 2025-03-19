export const selectQuestionnaires = state =>
  state.questionnaires.questionnaires;
export const selectTotalQuestionnaires = state => state.questionnaires.total;
export const selectIsLoading = state => state.questionnairess.isLoading;
export const selectIsError = state => state.questionnaires.error;
export const selectPage = state => state.questionnaires.page;
export const selectParams = state => state.questionnaires.params;
export const selectOneoneQuestionnairer = state =>
  state.questionnaires.oneQuestionnaire;
