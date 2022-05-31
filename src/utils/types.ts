export interface CostUpgrade {
  metal: { metal: number; crystal: number; deuterium: number }
  crystal: { metal: number; crystal: number; deuterium: number }
  deuterium: { metal: number; crystal: number; deuterium: number }
  solarPlant: { metal: number; crystal: number; deuterium: number }
  robotFactory: { metal: number; crystal: number; deuterium: number }
}

export interface ResourceLevels {
  metal: number
  crystal: number
  deuterium: number
  solarPlant: number
  robotFactory: number
}

export interface Points {
  metal: number
  crystal: number
  deuterium: number
  energy: number
}

export interface EndTimeCompletion {
  resourceId: number
  timeEnd: number
}
