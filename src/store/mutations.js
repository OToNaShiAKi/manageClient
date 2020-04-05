import {
    setItem
} from './../plugins/storage'

const addKey = item => {
    item.time = item.startTime + ' - ' + item.endTime;
    if (item.repeat.length) {
        item.date = "每周" + item.repeat.join('、');
        item.date.replace(/0/, '7');
    } else if (item.day.length) item.date = item.day.join('、');
    return item
}

export default {
    InitList: (state, lists) => {
        for (let item of lists)
            item = addKey(item);
        state.lists = lists;
    },
    InitAdmin: (state, admin) => {
        state.admin = admin;
        state.login = admin._id;
        setItem('admin', admin);
    },
    EditList: (state, list) => {
        let lists = [...state.lists];
        lists = lists.map(item => {
            if (item._id == list._id)
                item = addKey(list);
            return item;
        })
        state.lists = lists;
    },
    MoveList: (state, listId) => {
        let lists = [...state.lists];
        let history = [...state.history];
        lists = lists.filter(item => {
            if (listId.includes(item._id) && item.adminId == state.admin._id)
                history.push(item)
            else return true;
        })
        state.lists = lists;
        state.history = history;
        setItem('history', history);
    },
    AccountInfo: (state, info) => {
        state.admin = {
            name: info.name || state.admin.name,
            phone: info.phone || state.admin.phone,
            _id: info._id || state.admin._id,
            password: info.password || state.admin.password
        }
        setItem('admin', state.admin)
    },
    Notify: (state, snack) => {
        snack.show = true;
        if (!snack.type) snack.type = 'warning'
        state.snack = snack;
    },
    HistoryList: (state, history) => {
        for (let item of history)
            item = addKey(item);
        state.history = history;
        setItem('history', history);
    },
    StartList: (state, listId) => {
        let lists = [...state.lists];
        let history = [...state.history];
        history = history.filter(item => {
            if (listId.includes(item._id))
                lists.push(item)
            else return true;
        })
        state.lists = lists;
        state.history = history;
        setItem('history', history);
    }
}