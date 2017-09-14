// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import Client from '../Client';

export default class QueueEvents extends Client {
  constructor(options = {}) {
    super({
      baseUrl: '',
      exchangePrefix: 'exchange/taskcluster-queue/v1/',
      ...options
    });
    
  }

  // When a task is created or just defined a message is posted to this
  // exchange.
  // This message exchange is mainly useful when tasks are scheduled by a
  // scheduler that uses `defineTask` as this does not make the task
  // `pending`. Thus, no `taskPending` message is published.
  // Please, note that messages are also published on this exchange if defined
  // using `createTask`.
  taskDefined(pattern) {
    const entry = {type:'topic-exchange',exchange:'task-defined',name:'taskDefined',routingKey:[{name:'routingKeyKind',constant:'primary',multipleWords:false,required:true},{name:'taskId',multipleWords:false,required:true},{name:'runId',multipleWords:false,required:false},{name:'workerGroup',multipleWords:false,required:false},{name:'workerId',multipleWords:false,required:false},{name:'provisionerId',multipleWords:false,required:true},{name:'workerType',multipleWords:false,required:true},{name:'schedulerId',multipleWords:false,required:true},{name:'taskGroupId',multipleWords:false,required:true},{name:'reserved',multipleWords:true,required:false}],schema:'http://schemas.taskcluster.net/queue/v1/task-defined-message.json#'};

    return this.normalizePattern(entry, pattern);
  }

  // When a task becomes `pending` a message is posted to this exchange.
  // This is useful for workers who doesn't want to constantly poll the queue
  // for new tasks. The queue will also be authority for task states and
  // claims. But using this exchange workers should be able to distribute work
  // efficiently and they would be able to reduce their polling interval
  // significantly without affecting general responsiveness.
  taskPending(pattern) {
    const entry = {type:'topic-exchange',exchange:'task-pending',name:'taskPending',routingKey:[{name:'routingKeyKind',constant:'primary',multipleWords:false,required:true},{name:'taskId',multipleWords:false,required:true},{name:'runId',multipleWords:false,required:true},{name:'workerGroup',multipleWords:false,required:false},{name:'workerId',multipleWords:false,required:false},{name:'provisionerId',multipleWords:false,required:true},{name:'workerType',multipleWords:false,required:true},{name:'schedulerId',multipleWords:false,required:true},{name:'taskGroupId',multipleWords:false,required:true},{name:'reserved',multipleWords:true,required:false}],schema:'http://schemas.taskcluster.net/queue/v1/task-pending-message.json#'};

    return this.normalizePattern(entry, pattern);
  }

  // Whenever a task is claimed by a worker, a run is started on the worker,
  // and a message is posted on this exchange.
  taskRunning(pattern) {
    const entry = {type:'topic-exchange',exchange:'task-running',name:'taskRunning',routingKey:[{name:'routingKeyKind',constant:'primary',multipleWords:false,required:true},{name:'taskId',multipleWords:false,required:true},{name:'runId',multipleWords:false,required:true},{name:'workerGroup',multipleWords:false,required:true},{name:'workerId',multipleWords:false,required:true},{name:'provisionerId',multipleWords:false,required:true},{name:'workerType',multipleWords:false,required:true},{name:'schedulerId',multipleWords:false,required:true},{name:'taskGroupId',multipleWords:false,required:true},{name:'reserved',multipleWords:true,required:false}],schema:'http://schemas.taskcluster.net/queue/v1/task-running-message.json#'};

    return this.normalizePattern(entry, pattern);
  }

  // Whenever the `createArtifact` end-point is called, the queue will create
  // a record of the artifact and post a message on this exchange. All of this
  // happens before the queue returns a signed URL for the caller to upload
  // the actual artifact with (pending on `storageType`).
  // This means that the actual artifact is rarely available when this message
  // is posted. But it is not unreasonable to assume that the artifact will
  // will become available at some point later. Most signatures will expire in
  // 30 minutes or so, forcing the uploader to call `createArtifact` with
  // the same payload again in-order to continue uploading the artifact.
  // However, in most cases (especially for small artifacts) it's very
  // reasonable assume the artifact will be available within a few minutes.
  // This property means that this exchange is mostly useful for tools
  // monitoring task evaluation. One could also use it count number of
  // artifacts per task, or _index_ artifacts though in most cases it'll be
  // smarter to index artifacts after the task in question have completed
  // successfully.
  artifactCreated(pattern) {
    const entry = {type:'topic-exchange',exchange:'artifact-created',name:'artifactCreated',routingKey:[{name:'routingKeyKind',constant:'primary',multipleWords:false,required:true},{name:'taskId',multipleWords:false,required:true},{name:'runId',multipleWords:false,required:true},{name:'workerGroup',multipleWords:false,required:true},{name:'workerId',multipleWords:false,required:true},{name:'provisionerId',multipleWords:false,required:true},{name:'workerType',multipleWords:false,required:true},{name:'schedulerId',multipleWords:false,required:true},{name:'taskGroupId',multipleWords:false,required:true},{name:'reserved',multipleWords:true,required:false}],schema:'http://schemas.taskcluster.net/queue/v1/artifact-created-message.json#'};

    return this.normalizePattern(entry, pattern);
  }

  // When a task is successfully completed by a worker a message is posted
  // this exchange.
  // This message is routed using the `runId`, `workerGroup` and `workerId`
  // that completed the task. But information about additional runs is also
  // available from the task status structure.
  taskCompleted(pattern) {
    const entry = {type:'topic-exchange',exchange:'task-completed',name:'taskCompleted',routingKey:[{name:'routingKeyKind',constant:'primary',multipleWords:false,required:true},{name:'taskId',multipleWords:false,required:true},{name:'runId',multipleWords:false,required:true},{name:'workerGroup',multipleWords:false,required:true},{name:'workerId',multipleWords:false,required:true},{name:'provisionerId',multipleWords:false,required:true},{name:'workerType',multipleWords:false,required:true},{name:'schedulerId',multipleWords:false,required:true},{name:'taskGroupId',multipleWords:false,required:true},{name:'reserved',multipleWords:true,required:false}],schema:'http://schemas.taskcluster.net/queue/v1/task-completed-message.json#'};

    return this.normalizePattern(entry, pattern);
  }

  // When a task ran, but failed to complete successfully a message is posted
  // to this exchange. This is same as worker ran task-specific code, but the
  // task specific code exited non-zero.
  taskFailed(pattern) {
    const entry = {type:'topic-exchange',exchange:'task-failed',name:'taskFailed',routingKey:[{name:'routingKeyKind',constant:'primary',multipleWords:false,required:true},{name:'taskId',multipleWords:false,required:true},{name:'runId',multipleWords:false,required:false},{name:'workerGroup',multipleWords:false,required:false},{name:'workerId',multipleWords:false,required:false},{name:'provisionerId',multipleWords:false,required:true},{name:'workerType',multipleWords:false,required:true},{name:'schedulerId',multipleWords:false,required:true},{name:'taskGroupId',multipleWords:false,required:true},{name:'reserved',multipleWords:true,required:false}],schema:'http://schemas.taskcluster.net/queue/v1/task-failed-message.json#'};

    return this.normalizePattern(entry, pattern);
  }

  // Whenever Taskcluster fails to run a message is posted to this exchange.
  // This happens if the task isn't completed before its `deadlìne`,
  // all retries failed (i.e. workers stopped responding), the task was
  // canceled by another entity, or the task carried a malformed payload.
  // The specific _reason_ is evident from that task status structure, refer
  // to the `reasonResolved` property for the last run.
  taskException(pattern) {
    const entry = {type:'topic-exchange',exchange:'task-exception',name:'taskException',routingKey:[{name:'routingKeyKind',constant:'primary',multipleWords:false,required:true},{name:'taskId',multipleWords:false,required:true},{name:'runId',multipleWords:false,required:false},{name:'workerGroup',multipleWords:false,required:false},{name:'workerId',multipleWords:false,required:false},{name:'provisionerId',multipleWords:false,required:true},{name:'workerType',multipleWords:false,required:true},{name:'schedulerId',multipleWords:false,required:true},{name:'taskGroupId',multipleWords:false,required:true},{name:'reserved',multipleWords:true,required:false}],schema:'http://schemas.taskcluster.net/queue/v1/task-exception-message.json#'};

    return this.normalizePattern(entry, pattern);
  }

  // A message is published on task-group-resolved whenever all submitted
  // tasks (whether scheduled or unscheduled) for a given task group have
  // been resolved, regardless of whether they resolved as successful or
  // not. A task group may be resolved multiple times, since new tasks may
  // be submitted against an already resolved task group.
  taskGroupResolved(pattern) {
    const entry = {type:'topic-exchange',exchange:'task-group-resolved',name:'taskGroupResolved',routingKey:[{name:'routingKeyKind',constant:'primary',multipleWords:false,required:true},{name:'taskGroupId',multipleWords:false,required:true},{name:'schedulerId',multipleWords:false,required:true},{name:'reserved',multipleWords:true,required:false}],schema:'http://schemas.taskcluster.net/queue/v1/task-group-resolved.json#'};

    return this.normalizePattern(entry, pattern);
  }
}
