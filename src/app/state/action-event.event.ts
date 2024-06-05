import {EventType} from "./event-type.enum";

export interface ActionEvent{

  eventType : EventType,
  payload? : any
}
