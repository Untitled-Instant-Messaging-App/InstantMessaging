export interface BasicUser {
  displayName: string;
  image: string;
  keyBundle?: {
    identityKey: Key;
    signedPreKey: Key;
    oneTimePerKeys: Key[];
  };
}

interface Key {
  value: string;
  createDate: Date;
  expirationDate: Date;
}
