import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('USER')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'NAME' })
  name: string;

  @Column({ type: 'int', name: 'AGE' })
  age: number;
}
