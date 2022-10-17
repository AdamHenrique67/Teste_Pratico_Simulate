import { SimulatePlan } from "@/src/domain/useCases"
import { makeLoadPlan } from "../infra/loadPlan"

export const makeSimulatePlan = (): SimulatePlan => {
  return new SimulatePlan(makeLoadPlan())
}

