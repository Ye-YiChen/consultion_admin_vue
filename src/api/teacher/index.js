import axios from '../index'


/**
 * 获取到无认证资格的教师信息数量
 */
function getTeacherInfAuthNotSize(){
    return axios({
        method:'get',
        url: '/consult/teacher/search/auth-not/size',
    })
}

/**
 * 获取到无认证资格的教师信息
 * @param {*} page 页数
 * @param {*} pageSize 每页数量
 */
function getTeacherInfAuthNotList(page,pageSize){
    return axios({
        method:'post',
        url: '/consult/teacher/search/auth-not',
        data:{
            page,
            pageSize
        }
    })
}


/**
 * 通过教师认证
 * @param {*} teacherId 教师id
 */
function passTeacherAuth(teacherId){
    return axios({
        method:'post',
        url: '/consult/teacher/change',
        data: {
            teacherId,
            state:1,
        }
    })
}

export {getTeacherInfAuthNotSize,getTeacherInfAuthNotList,passTeacherAuth}