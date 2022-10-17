import { SimulateController } from "@/src/application/controllers/simulateController"
import { makeSimulatePlan } from "../useCases/simulatePlan-factory"

export const makeSimulateController = (): SimulateController => {
  return new SimulateController(makeSimulatePlan())
}