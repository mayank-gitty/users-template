import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';

// Create authentication configuration using createAuth
const { withAuth } = createAuth({
  listKey: 'User',// The key of the User list in your Keystone app
  identityField: 'email',// The field used for identifying the user (e.g., email)
  sessionData: 'role',// The session data to include (e.g., the user's role)
  secretField: 'password',// The field used for verifying the user's password
  initFirstItem: {
    // Initial item to create when no users exist
    fields: ['name', 'email', 'password'],// Fields required for creating the initial user
  },
});
let sessionSecret = 'vbsdkblasmnc;jkcpk;,m;k[edjdjnndnleee';// Secret used for session encryption
let sessionMaxAge = 60 * 60 * 24 * 30;  // Maximum age of the session (30 days)

const session = statelessSessions({
  maxAge: sessionMaxAge,// Set the maximum age of the session
  secret: sessionSecret,// Set the session secret for encryption
});

export { withAuth ,session};