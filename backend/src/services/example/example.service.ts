import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Example } from 'src/domain';

import { BaseService } from '../base.service';

@Injectable()
export class ExampleService extends BaseService<Example> {
  constructor(
    @InjectRepository(Example)
    exampleRepository: Repository<Example>,
  ) {
    super(exampleRepository);
  }
}
