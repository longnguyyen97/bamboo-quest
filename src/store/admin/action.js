import { AdminService } from '../../services/admin'
import { EVENT, ADMIN_TYPE } from './types'

export const getAllUsers = (page) => {
  return async (dispatch) => {
    try {
      resetResult()
      page = (page - 1) * 5
      let count = await AdminService.getUsers('count', page, 5)
      count = count.data.count
      let find = await AdminService.getUsers('find', page, 5)
      find = find.data
      return dispatch({
        type: ADMIN_TYPE.GET,
        payload: { user: find, count },
      })
    } catch (error) {
      return dispatch({
        type: ADMIN_TYPE.GET,
        payload: {
          result: false,
          user: [],
        },
      })
    }
  }
}

export const getCount = (collection) => {
  return async (dispatch) => {
    try {
      let count = await AdminService.getCount(collection)
      var payloadInfo = {}
      switch (collection) {
        case 'user':
          payloadInfo = {
            type: ADMIN_TYPE.GET_COUNT_USER,
            payload: { countUser: count.data.count },
          }
          break
        case 'quest':
          payloadInfo = {
            type: ADMIN_TYPE.GET_COUNT_QUIZ,
            payload: { countQuiz: count.data.count },
          }
          break
        default:
          break
      }
      return dispatch(payloadInfo)
    } catch (error) {
      const payloadInfo =
        collection === 'user'
          ? {
              type: ADMIN_TYPE.GET_COUNT_USER,
              payload: { countUser: -2 },
            }
          : { type: ADMIN_TYPE.GET_COUNT_QUIZ, payload: { countQuiz: -2 } }
      return dispatch(payloadInfo)
    }
  }
}

export const resetResult = () => {
  return (dispatch) => {
    dispatch({
      type: EVENT.RESULT,
      payload: {
        result: false,
      },
    })
  }
}

export const setPage = (page) => {
  return (dispatch) => {
    dispatch({
      type: ADMIN_TYPE.SET_PAGE,
      payload: {
        page,
      },
    })
  }
}

export const setItem = (item) => {
  return (dispatch) => {
    dispatch({
      type: ADMIN_TYPE.ITEM,
      payload: {
        item,
      },
    })
  }
}

export const changeStatusRunning = (result) => {
  return (dispatch) => {
    dispatch({
      type: EVENT.RUNNING,
      payload: {
        running: result,
      },
    })
  }
}
