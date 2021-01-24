/**执行任务类 */
module.exports = class Task{
    constructor(fn, callBack, ...args){
        this.fn = fn // 需要执行的任务函数
        this.callBack = callBack // 需要执行的回调函数
        this.args = args // 执行的参数
    }
    /**运行任务 */
    runTask(){
        setTimeout(this.fn, 0, ...this.args)
    }
}