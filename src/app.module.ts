import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import * as Joi from 'joi'
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(process.cwd(), '/.env'),
      isGlobal: true,
      validate(config: Record<string, any>) {
        const schema = Joi.object({
          PORT: Joi.number().default(3000),
          DB_NAME: Joi.string().required(),
          DB_HOST: Joi.string().required(),
          DB_PORT: Joi.number().required(),
          DB_USERNAME: Joi.string().required(),
          DB_PASSWORD: Joi.string().optional()
        }).unknown(true);

        const { error, value } = schema.validate(config);

        if (error) {
          console.error(`Env config validation error: ${error.message}`);
          process.exit(1);
        }

        return value;
      }
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
