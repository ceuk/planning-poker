import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export type MapReducerPayloads<State, ReducerPayloadMap> = {
  [K in keyof ReducerPayloadMap]: CaseReducer<State, PayloadAction<ReducerPayloadMap[K]>>
}
