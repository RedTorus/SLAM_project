
"use strict";

let GetNodesInRadius = require('./GetNodesInRadius.js')
let AddLink = require('./AddLink.js')
let GlobalBundleAdjustment = require('./GlobalBundleAdjustment.js')
let GetPlan = require('./GetPlan.js')
let ResetPose = require('./ResetPose.js')
let CleanupLocalGrids = require('./CleanupLocalGrids.js')
let PublishMap = require('./PublishMap.js')
let GetMap2 = require('./GetMap2.js')
let ListLabels = require('./ListLabels.js')
let RemoveLabel = require('./RemoveLabel.js')
let GetMap = require('./GetMap.js')
let GetNodeData = require('./GetNodeData.js')
let SetLabel = require('./SetLabel.js')
let LoadDatabase = require('./LoadDatabase.js')
let SetGoal = require('./SetGoal.js')
let DetectMoreLoopClosures = require('./DetectMoreLoopClosures.js')

module.exports = {
  GetNodesInRadius: GetNodesInRadius,
  AddLink: AddLink,
  GlobalBundleAdjustment: GlobalBundleAdjustment,
  GetPlan: GetPlan,
  ResetPose: ResetPose,
  CleanupLocalGrids: CleanupLocalGrids,
  PublishMap: PublishMap,
  GetMap2: GetMap2,
  ListLabels: ListLabels,
  RemoveLabel: RemoveLabel,
  GetMap: GetMap,
  GetNodeData: GetNodeData,
  SetLabel: SetLabel,
  LoadDatabase: LoadDatabase,
  SetGoal: SetGoal,
  DetectMoreLoopClosures: DetectMoreLoopClosures,
};
