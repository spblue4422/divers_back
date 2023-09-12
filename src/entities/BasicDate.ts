import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BasicDate {
  /**
   생성일자
  */
  @Column()
  @CreateDateColumn()
  createdAt: Timestamp;

  /**
   마지막 수정일자
  */
  @Column()
  @UpdateDateColumn()
  updatedAt: Timestamp;

  /**
   삭제일자
  */
  @Column()
  @DeleteDateColumn()
  deletedAt: Timestamp;
}
