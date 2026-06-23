import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tenant } from '../database/entities/tenant.entity';
import { User } from '../database/entities/user.entity';
import { Book } from '../database/entities/book.entity';
import { Chapter } from '../database/entities/chapter.entity';
import { BookChunk } from '../database/entities/book-chunk.entity';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_DATABASE ?? 'yugsoft_tech',
    entities: [Tenant, User, Book, Chapter, BookChunk],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
    autoLoadEntities: true,
  }),
);
