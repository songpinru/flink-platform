import { type RouteRecordName } from 'vue-router';

export interface Router {
  [index: RouteRecordName]: string;
}
