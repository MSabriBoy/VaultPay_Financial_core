import { ROLES } from "../constants/roles";

const getRoleLabel = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return "Administrator";

    case ROLES.CLIENT:
      return "Client";

    default:
      return "User";
  }
};

export { getRoleLabel };