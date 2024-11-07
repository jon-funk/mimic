class ActJob {
    constructor(event={}) {
        this.stdout = ""
        this.stderr = ""
        this.exitCode = 0
        this.event = event
        this.maxCPU = 0
        this.maxMemory = 0
        this.runTime = 0
    }
    ran() {
        return this.runTime > 0
    }
    ok() {
        return this.exitCode == 0
    }
}

class ActJobQueue {
    constructor() {
        this.queue = []
    }
    add(job) {
        this.queue.push(job)
    }
    async run() {
        for (let job of this.queue) {
            await job.run()
        }
    }
}