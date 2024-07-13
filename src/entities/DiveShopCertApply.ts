import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import DiveShop from './DiveShop';

@Entity('dive_shop_cert_apply')
class DiveShopCertApply {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DiveShop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shopId' })
  diveShop: DiveShop;

  @Column()
  shopId: number;

  /**
   승인 일자
   */
  @Column({ nullable: true, default: null })
  approvedDate: Date;

  /**
   거부 일자
   */
  @Column({ nullable: true, default: null })
  rejectedDate: Date;

  /**
   거부 사유
   */
  @Column({ nullable: true, default: null })
  rejectedReason: string;
  // 또 뭐가 필요할까요...?

  // 심사를 담당한 사람 - 어드민 계정
}

export default DiveShopCertApply;
