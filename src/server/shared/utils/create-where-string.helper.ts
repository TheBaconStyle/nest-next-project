// import { FindConditions } from 'typeorm';
export function createWhereConditionString(entity: string, key: string) {
  return `${entity}.${key} = :${key}`
}
