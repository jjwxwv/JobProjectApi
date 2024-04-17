import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Common } from './utils/Common';

@Entity('company')
export class Company extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_ts: string;

  @Column()
  address: string;

  @Column()
  tel: string;

  @Column()
  email: string;

  @Column()
  image_url: string;
}
