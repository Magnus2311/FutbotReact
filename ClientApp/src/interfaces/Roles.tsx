export const Roles: Roles = {
  Roles: ["read", "add", "change"],
  Exceptions: ["read", "clear"],
};

export interface Roles {
  [key: string]: string[];
}
