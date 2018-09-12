import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from "typeorm";
import { verificationTarget } from "../types/types";

const PHONE = "PHONE";
const EMAIL = "EMAIL";

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", enum: [PHONE, EMAIL] }) // enum까지 하면 에러를 완벽하게 막을 수 있음
  target: verificationTarget; // string으로 안한 건 어차피 email, phone 두 개밖에 없어서

  @Column({ type: "text" })
  payload: string;

  @Column({ type: "text" })
  key: string;

  @Column({ type: "boolean", default: false })
  verified: boolean;

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;

  @BeforeInsert()
  createKey(): void {
    // PHONE으로 로그인했는지 EMAIL로 로그인했는지에 따라서 key를 알아서 생성해줌
    if (this.target === PHONE) {
      this.key = Math.floor(Math.random() * 100000).toString(); // 4자리 숫자
    } else if (this.target === EMAIL) {
      this.key = Math.random()
        .toString(36)
        .substr(2); // 긴 문자열
    }
  }
}

export default Verification;
