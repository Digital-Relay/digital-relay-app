/* tslint:disable */
import {PushSubscriptionKeys} from './push-subscription-keys';

export interface PushSubscription {
  endpoint: string;
  expiration_time?: number;
  keys?: PushSubscriptionKeys;
}
