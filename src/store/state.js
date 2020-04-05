import {
    getItem
} from './../plugins/storage'

export default {
    admin: getItem('admin') || {
        _id: ''
    },
    lists: [],
    snack: {
        message: '',
        show: false,
        type: ''
    },
    history: getItem('history') || [],
    login: false
}