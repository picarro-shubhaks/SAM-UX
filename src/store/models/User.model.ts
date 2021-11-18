export type Access = { edit: boolean; delete: boolean };
export type Roles = {
  clientId: string;
  clientName: string;
  roles: {
    id: string;
    name: string;
    description: string | null;
  }[];
};
export type Groups = { id: string; name: string; subGroups: string | null; access: string | null; roles: Roles[] };

export type User = {
  id: string;
  username: string;
  email: string | null;
  enabled: boolean;
  firstName: string | null;
  lastName: string | null;
  access: Access;
  groups: Groups[];
};

export type CurrentUser = {
  id: string;
  username: string;
  emailVerified: boolean;
  fullName: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  roles: { [k: string]: string[] };
};
