import { CurrentAdmin } from 'adminjs';
import { Beacon } from 'src/beacons/entities/beacon.entity';
import { Entrance } from 'src/entrances/entities/entrance.entity';
import { Place } from 'src/places/entities/place.entity';
import { Department } from 'src/users/entities/department.entity';
import { Permission } from 'src/users/entities/permission.entity';
import { User } from 'src/users/entities/user.entity';
import { adminConstants } from './constants';

export const createAdminFactory = {
  adminJsOptions: {
    rootPath: adminConstants.rootPath,
    resources: [User, Department, Permission, Place, Entrance, Beacon],
  },
  auth: {
    authenticate: async (email: string, password: string) => {
      const user = await User.findOne({ where: { email } });
      const signedInAdmin: CurrentAdmin = {
        id: user.id.toString(),
        email: user.email,
      };

      if (!user || user.password !== password) {
        // Just returning null notifies the user that the credentials are invalid
        return null;
      }

      return signedInAdmin;
    },
    cookieName: adminConstants.cookieName,
    cookiePassword: adminConstants.cookiePassword,
  },
};
