import axios from '../index'


/**
 * 获取到特定状态的多人咨询活动数量 
 * @param {*} state 活动状态（0 = 未过期、可报名 | 1 = 未过期、不可报名 | 2 = 已开始 | 3 = 已结束）
 */
function getPublicConsultListSize(state) {
    return axios({
        method: 'get',
        url: `/consult/public/admin/get/${state}/size`,
    })
}

/**
 * 
 * @param {*} state 活动状态（0 = 未过期、可报名 | 1 = 未过期、不可报名 | 2 = 已开始 | 3 = 已结束）
 * @param {*} page 页数
 * @param {*} pageSize 每页数量
 */
function getPublicConsultList(state, page, pageSize) {
    return axios({
        method: 'post',
        url: `/consult/public/admin/get/${state}`,
        data: {
            page,
            pageSize
        }
    })
}


/**
 * 
 * @param {*} timeInf 时间信息 => 日期date+开始时间startTime+结束时间endTime
 * @param {*} allNumber 参与学生总数 
 * @param {*} position 咨询活动地点
 */
function addPublicConsult(timeInf, allNumber, position) {
    return axios({
        method: 'post',
        url: '/consult/public/admin/add',
        data: {
            timeInf,
            allNumber,
            position
        }
    })
}

/**
 * 
 * @param {*} id 集体活动id 
 */
function removePublicConsult(consultId) {
    return axios({
        method: 'get',
        url: '/consult/public/admin/remove',
        params: {
            consultId
        }
    })
}

function getPublicConsultTeacherList(consultId) {
    return axios({
        method: 'get',
        url: '/consult/public/admin/get-teacherInfList',
        params: {
            consultId
        }
    })
}

/**
 * 
 * @param {number} id 集体活动id
 * @param {number} tid 老师id
 * @param {string} action 操作类型（add = 添加 | remove = 删除）
 */
function changeTeacherAttend(id, tid, action) {
    return axios({
        method: 'post',
        url: '/consult/public/admin/change-teacher',
        data: {
            id,
            tid,
            action
        }
    })
}
function getTeacherInfAuthOKSize() {
    return axios({
        method: 'get',
        url: '/consult/teacher/search/auth-ok/size',
    })
}

function getTeacherInfAuthOKList(page, pageSize) {
    return axios({
        method: 'post',
        url: '/consult/teacher/search/auth-ok',
        data: {
            page,
            pageSize
        }
    })
}

export {
    getPublicConsultListSize, getPublicConsultList, addPublicConsult, removePublicConsult, getPublicConsultTeacherList, changeTeacherAttend,
    getTeacherInfAuthOKSize,
    getTeacherInfAuthOKList,
}