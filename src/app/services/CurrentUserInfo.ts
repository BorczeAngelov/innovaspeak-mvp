export interface CurrentUserSubscriptionPlan {
  id: string;
  name: string;
}

export interface CurrentUserSubscription {
  active: boolean;
  expiresAt: number; // Assuming this is a Unix timestamp
  plan: CurrentUserSubscriptionPlan;
}

export interface CurrentUserInfo {
  email: string;
  fullName: string;
  id: string;
  unrestrictedAccess: boolean;
  subscriptions: CurrentUserSubscription[];
}
