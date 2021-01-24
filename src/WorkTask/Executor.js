const { EventEmitter } = require("events");

const SIZE = Symbol('size')
const EXECPOOL = Symbol('execPool')
const TASKPOOL = Symbol('taskPool')
const WORKING = Symbol('working')
const RUNNING = Symbol('running')

const START = Symbol('start')
const GETONETASK = Symbol('getOneTask')
const ADDEXECTASK = Symbol('addExecTask')
const GETONEEXECTASK = Symbol('getExecTask')
const EXEC = Symbol('exec')

module.exports = class Executor extends EventEmitter{
	constructor(size) {
		super()
		this[SIZE] = size,
		this[EXECPOOL] = [], // 执行队列，队列大小有size决定
		this[TASKPOOL] = [], // 任务队列，所有任务都会放进该队列
		this[WORKING] = 0, // 当前执行中的任务数量，用该值保证执行任务数量的原子性
		this[RUNNING] = false, // 是否已经启动过任务，该值保证只有一个父任务
		this[EXEC](), // 启动任务执行, 不断检查"执行队列" 是否有需要执行的任务
		this.on('start', this[START]) // 定义任务处理事件
		}
  /**添加任务, 每次添加任务唤醒任务处理 */
	addTask(task){
		setTimeout(() => {
			this.taskPool.push(task);
			this.emit('start')
		}, 0)
		
	}
	/**启动任务处理，检查"任务队列"，当有任务时不断尝试放进"执行队列"内 */
	async [START](){
		if (this.running) return
		this.running = true
		console.log('开始')
		const intervalId = setInterval(() => { // 不断循环检查是否有需要执行的task
			if(this.working < this.size && this.taskPool[0]){
				this[ADDEXECTASK](this[GETONETASK]()) // 从"任务队列"添加到"执行队列"
			}

			if(this.taskPool.length === 0){ //
				console.log('所有任务都已经执行完成，挂起')
				this.running = false
				clearInterval(intervalId)
			}
		}, 0)
	}
	/**执行"执行任务"中的任务，不断循环检查 */
	async [EXEC](){
		setInterval(() => {
			if (this.working > 0){
				const task = this[GETONEEXECTASK]()
				this.working--
				task.runTask()
			}
		}, 0)
	}
	/**从"任务队列"中获取一个任务 */
	[GETONETASK](){
		return this.taskPool.shift()
	}
	/**添加任务进"执行任务" */
	[ADDEXECTASK](task){
		if(!task) return
		this.execPool.push(task)
		this.working++
	}
	/**从"执行任务"中获取一个任务 */
	[GETONEEXECTASK](){
		return this.execPool.shift()
	}

	set size(size){
		this[SIZE] = size
	}

	get size(){
		return this[SIZE]
	}

	set execPool(execPool){
		this[EXECPOOL] = execPool
	}

	get execPool(){
		return this[EXECPOOL]
	}

	set taskPool(taskPool){
		this[TASKPOOL] = taskPool
	}

	get taskPool(){
		return this[TASKPOOL]
	}

	set working(working){
		this[WORKING] = working
	}

	get working(){
		return this[WORKING]
	}

	set running(running){
		this[RUNNING] = running
	}

	get running(){
		return this[RUNNING]
	}
}