import { ISession } from "./ISession";
import { ITags } from "./ITags";

export interface ISession_tags {
  id: String;
  session_id: ISession;
  //maybe also string?
  tag_id: ITags;
}