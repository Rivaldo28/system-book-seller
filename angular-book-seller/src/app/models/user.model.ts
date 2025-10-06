import { Role } from "../enum/role.enum";

export class User {
  id!: number;
  username!: string;
  password!: string;
  name!: string;
  token!: string;

  // CORREÇÃO DEFINITIVA:
  // A propriedade 'role' agora é do tipo 'Role', permitindo que ela seja
  // tanto ADMIN quanto USER, sem um valor padrão que restrinja o tipo.
  role!: Role;
}
