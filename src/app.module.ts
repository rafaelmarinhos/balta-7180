import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { StoreModule } from './modules/store/store.module';
import { AgendaModule } from './modules/agenda/agenda.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root:jh13ce08ro56@cluster0.qvxrh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'am2vzz8jcaR@',
      database: '7180',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BackofficeModule,
    StoreModule,
    AgendaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
