
"use strict";

let RemoveLabel = require('./RemoveLabel.js')
let ListLabels = require('./ListLabels.js')
let GetNodesInRadius = require('./GetNodesInRadius.js')
let PublishMap = require('./PublishMap.js')
let GlobalBundleAdjustment = require('./GlobalBundleAdjustment.js')
let SetGoal = require('./SetGoal.js')
let GetNodeData = require('./GetNodeData.js')
let SetLabel = require('./SetLabel.js')
let AddLink = require('./AddLink.js')
let GetMap2 = require('./GetMap2.js')
let GetPlan = require('./GetPlan.js')
let CleanupLocalGrids = require('./CleanupLocalGrids.js')
let GetMap = require('./GetMap.js')
let ResetPose = require('./ResetPose.js')
let LoadDatabase = require('./LoadDatabase.js')
let DetectMoreLoopClosures = require('./DetectMoreLoopClosures.js')

module.exports = {
  RemoveLabel: RemoveLabel,
  ListLabels: ListLabels,
  GetNodesInRadius: GetNodesInRadius,
  PublishMap: PublishMap,
  GlobalBundleAdjustment: GlobalBundleAdjustment,
  SetGoal: SetGoal,
  GetNodeData: GetNodeData,
  SetLabel: SetLabel,
  AddLink: AddLink,
  GetMap2: GetMap2,
  GetPlan: GetPlan,
  CleanupLocalGrids: CleanupLocalGrids,
  GetMap: GetMap,
  ResetPose: ResetPose,
  LoadDatabase: LoadDatabase,
  DetectMoreLoopClosures: DetectMoreLoopClosures,
};
