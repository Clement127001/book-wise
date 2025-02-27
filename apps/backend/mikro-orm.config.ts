import { Logger, NotFoundException } from '@nestjs/common';
import 'dotenv/config';
import {
  LoadStrategy,
  Platform,
  TextType,
  Type,
  defineConfig,
} from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';

const logger = new Logger('MikroORM');

export default defineConfig({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  driver: PostgreSqlDriver,
  clientUrl: process.env['DATABASE_URL'],
  loadStrategy: LoadStrategy.JOINED,
  highlighter: new SqlHighlighter(),
  discovery: {
    getMappedType(type: string, platform: Platform) {
      // override the mapping for string properties only
      if (type === 'string') {
        return Type.getType(TextType);
      }
      return platform.getDefaultMappedType(type);
    },
  },

  driverOptions: {
    //TODO: temporarily disabled the ssl connection for local usage
    // connection: {
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // },
  },
  allowGlobalContext: true,
  debug: true,
  logger: logger.log.bind(logger),
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    emit: 'ts',
  },
  extensions: [Migrator, SeedManager],
  findOneOrFailHandler: (entityName) => {
    throw new NotFoundException(`${entityName} not found`);
  },
});
