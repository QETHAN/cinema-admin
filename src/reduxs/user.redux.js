import axios from 'axios'
const LOGIN_SUCESS = 'LOGIN_SUCESS'
const ERROR_MSG = 'ERROR_MSG'
const initState = {
  username: '',
  password: ''
}
// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCESS:
      return {
        ...state,
        msg: ''
      }
    case ERROR_MSG:
      return { ...state, msg: action.msg }
    default:
      return state
  }
}

// actions
function loginSuccess(data) {
  return { type: LOGIN_SUCESS, payload: data }
}
function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function regisger({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
