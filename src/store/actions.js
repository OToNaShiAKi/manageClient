import axios from 'axios'

const base = process.env.NODE_ENV === 'development' ? 'manage/' : 'http://118.31.58.18:3000/'

axios.defaults.withCredentials = true

const error = (err, commit) => {
    console.warn(err);
    commit('Notify', {
        message: err.message || '请求失败，请检查网络',
        type: 'error'
    })
}
import router from './../router'

export default {
    AdminLogin: ({
        commit
    }, login) => {
        axios.post(base + 'admin/login', login).then(res => {
            if (res.data.status == 200) {
                commit('Notify', {
                    message: res.data.message,
                    type: 'success'
                })
                commit('InitAdmin', {
                    ...res.data.admin,
                    password: login.password
                });
                if (!router.currentRoute.path.includes('admin'))
                    router.push('/admin');
            } else {
                if (!router.currentRoute.path.includes('login'))
                    router.replace('/login');
                throw res.data;
            }
        }).catch(err => error(err, commit))
        axios.get(base + 'list/api/history', {
            params: {
                adminId: login.adminId
            }
        }).then(res => {
            if (res.data.status == 200)
                commit('HistoryList', res.data.history);
        })
    },
    AdminRegister: ({
        commit
    }, register) => {
        axios.post(base + 'admin/register', register).then(res => {
            if (res.data.status == 200) {
                commit('Notify', {
                    message: res.data.message,
                    type: 'success'
                })
                register._id = res.data._id;
                commit('InitAdmin', register);
                router.push('/admin');
            } else throw res.data;
        }).catch(err => error(err, commit))
    },
    AdminLogout: ({
        commit
    }, adminId) => {
        axios.get(base + 'admin/api/logout', adminId).then(res => {
            if (res.data.status == 200) {
                commit('Notify', {
                    message: res.data.message,
                    type: 'success'
                })
                commit('InitAdmin', {
                    _id: ''
                })
                router.replace('/login');
            } else throw res.data;
        }).catch(err => error(err, commit))
    },
    GetList: ({
        commit
    }) => {
        axios.get(base + 'list/get').then(res => {
            if (res.data.status == 200)
                commit('InitList', res.data.lists)
            else throw res.data;
        })
    },
    EditList: ({
        commit
    }, list) => {
        axios.post(base + 'list/api/edit', list).then(res => {
            if (res.data.status == 200) {
                commit('Notify', {
                    message: res.data.message,
                    type: 'success'
                })
                list._id = res.data._id
                commit('EditList', list);
                router.push('/admin');
            } else throw res.data;
        }).catch(err => error(err, commit))
    },
    MoveList: ({
        commit
    }, listId) => {
        axios.post(base + 'list/api/move', {
            listId
        }).then(res => {
            if (res.data.status == 200) {
                commit('Notify', {
                    message: res.data.message,
                    type: 'success'
                })
                commit('MoveList', listId);
            } else throw res.data;
        }).catch(err => error(err, commit))
    },
    AccountInfo: ({
        commit
    }, info) => {
        axios.post(base + 'admin/api/info', info).then(res => {
            if (res.data.status == 200) {
                if (info.password) {
                    router.replace('/login');
                    commit('InitAdmin', {
                        _id: ''
                    })
                } else commit('AccountInfo', info);
                commit('Notify', {
                    message: res.data.message,
                    type: 'success'
                })
            } else throw res.data;
        }).catch(err => error(err, commit))
    },
    StartList: ({
        commit
    }, listId) => {
        axios.post(base + 'list/api/start', {
            listId
        }).then(res => {
            if (res.data.status == 200) {
                commit('Notify', {
                    message: res.data.message,
                    type: 'success'
                })
                commit('StartList', listId)
            } else throw res.data;
        }).catch(err => error(err, commit))
    }
}