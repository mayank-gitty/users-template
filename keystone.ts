import { config } from '@keystone-6/core';
import { lists } from './src/keystone/schema';
import { seedDemoData } from './src/keystone/seed';
import type { Context } from '.keystone/types';
import { withAuth, session } from './auth';

export default config(
  withAuth({
    db: {
      provider: 'postgresql',
      url: "postgres://postgres:welcome@localhost:5432/newnext1", // next.js requires an absolute path for sqlite
      onConnect: async (context: Context) => {
        await seedDemoData(context);

      },
  
      // WARNING: this is only needed for our monorepo examples, dont do this
      prismaClientPath: 'node_modules/.myprisma/client',
    },
    storage: {
      my_local_images: {
        kind: 'local',
        type: 'image',
        generateUrl: path => `/images${path}`,
        serverRoute: {
          path: '/images',
        },
        storagePath: 'public/images',
      },
      my_local_files: {
        kind: 'local',
        type: 'file',
        generateUrl: path => `/files${path}`,
        serverRoute: {
          path: '/files',
        },
        storagePath: 'public/files',
      },
    },
    lists,
    session, // Use the session configuration from the "auth" module
    ui: {
      isAccessAllowed: (context: any) => !!context.session?.data,
    },
  })
 
);