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

// `uuid`        VARCHAR(100)     NOT NULL    COMMENT '유저UID', 
// `email`        VARCHAR(100)     NOT NULL    COMMENT '유저이메일',
// `name`        VARCHAR(10)     NOT NULL    COMMENT '유저이름',  
// `profileURL`  VARCHAR(1000)    NULL        COMMENT '유저 프로필 사진',
// `lastlogindate` DATETIME    NOT NULL    COMMENT '마지막 로그인날짜';
// `registerdate` DATETIME    NOT NULL    COMMENT '가입 날짜';