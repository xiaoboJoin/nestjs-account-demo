import { Column, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'



export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;
}