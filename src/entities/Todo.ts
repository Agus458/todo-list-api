import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Todo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column()
    done: boolean;
    
    @ManyToOne(() => User, user => user.todos)
    user: User;
}