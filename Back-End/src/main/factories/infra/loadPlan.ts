import { LoadPlan } from "@/src/infra/jsons"
import { makeFileSystem } from "@/src/main/factories/gateways/fileSystem-factory"

export const makeLoadPlan = (): LoadPlan => {
  return new LoadPlan(makeFileSystem())
}