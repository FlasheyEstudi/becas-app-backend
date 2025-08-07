// src/ms/Requisito/dto/update-requisito.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateRequisitoDto } from './create-Requisito.dto';

export class UpdateRequisitoDto extends PartialType(CreateRequisitoDto) {}