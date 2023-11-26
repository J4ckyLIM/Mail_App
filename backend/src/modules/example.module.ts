import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExampleController } from '../controllers/example/example.controller';
import { Example } from '../domain';
import { ExampleService } from '../services/example/example.service';

@Module({
  imports: [TypeOrmModule.forFeature([Example])],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
