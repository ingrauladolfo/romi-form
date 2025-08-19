import type { homeText } from "../../../assets/data/pages";

 interface User {
  id: number;
  name: string;
}
type HomeTextKeys = keyof typeof homeText['en'];

export type {User, HomeTextKeys}