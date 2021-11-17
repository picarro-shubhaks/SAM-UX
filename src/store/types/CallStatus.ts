// API SAGA call statuses
// IDLE=>IN PROGRESS=>IDLE (When no notification required. usually when loading)
// IDLE=>IN PROGRESS=>SUCCESS=>IDLE (When notification required. Usually when modifying. Like "Save successful")
// IDLE=>IN PROGRESS=>FAILED=>IDLE (When notification required. Usually when modifying. Like "Save failed")
export enum CALL_STATUS {
  IDLE = 'IDLE',
  IN_PROGRESS = 'IN PROGRESS',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}
