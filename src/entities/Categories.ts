import { Entity } from 'typeorm';
import { Common } from './utils/Common';

@Entity('categories')
export class Categories extends Common {}
